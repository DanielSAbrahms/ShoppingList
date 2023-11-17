package com.abrahms.ShoppingListApp.service;

import com.abrahms.ShoppingListApp.dto.ShoppingListDTO;
import com.abrahms.ShoppingListApp.dto.StoreProductDTO;
import com.abrahms.ShoppingListApp.model.ShoppingList;
import com.abrahms.ShoppingListApp.model.ShoppingListItem;
import com.abrahms.ShoppingListApp.repository.ShoppingListItemRepository;
import com.abrahms.ShoppingListApp.repository.ShoppingListRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ShoppingListService {

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @Autowired
    private ShoppingListItemRepository shoppingListItemRepository;

    @Autowired
    private StoreService storeService;

    public Collection<ShoppingListDTO> getAllShoppingLists() {
        Collection<ShoppingList> shoppingLists = shoppingListRepository.findAll();
        return shoppingLists.isEmpty() ? Collections.emptyList(): convertShoppingListsToDTOCollection(shoppingLists, true, false);
    }

    public ShoppingListDTO getShoppingListByID(UUID id) {
        ShoppingList shoppingList = shoppingListRepository.findById(id).orElse(null);
        return shoppingList == null ? null : convertShoppingListToDTO(shoppingList, false, true);
    }

    public UUID addShoppingList(ShoppingListDTO shoppingListDTO) {
        ShoppingList shoppingList = convertShoppingListFromDTO(null, shoppingListDTO);
        shoppingListRepository.save(shoppingList);

        Collection<StoreProductDTO> newProducts = shoppingListDTO.getProducts();

        if (newProducts != null) {
            // Create new ShoppingListItem entries for product list
            for (StoreProductDTO newProduct : newProducts) {
                ShoppingListItem newAssocItem = new ShoppingListItem(shoppingList.getId(), newProduct.getId());
                shoppingListItemRepository.save(newAssocItem);
            }
        }

        return shoppingList.getId();
    }

    // Should  automatically drop and rebuild related ShoppingListItem assoc table entries
    @Transactional
    public void updateShoppingListById(UUID id, ShoppingListDTO newDataForShoppingListDTO) {
        // Updates list meta data (not products)
        ShoppingList shoppingList = convertShoppingListFromDTO(id, newDataForShoppingListDTO);
        shoppingListRepository.save(shoppingList);

        Collection<StoreProductDTO> newProducts = newDataForShoppingListDTO.getProducts();

        if (newProducts != null) { // If New Products is null, just  ignore update
            // Start by removing existing assoc entries
            shoppingListItemRepository.dropAllForList(id);

            // Create new ShoppingListItem entries for product list
            for (StoreProductDTO newProduct : newProducts) {
                ShoppingListItem newAssocItem = new ShoppingListItem(id, newProduct.getId());
                shoppingListItemRepository.save(newAssocItem);
            }
        }
    }

    public void deleteShoppingListById(UUID id) {
        shoppingListRepository.deleteById(id);
    }


    // ---------- Private Methods ----------

    // For adding to DB from DTO
    // Parses List of Products to make updates to ShoppingListItem Table
    private ShoppingList convertShoppingListFromDTO(UUID id, ShoppingListDTO shoppingListDTO) {
        return new ShoppingList(
                id,
                shoppingListDTO.getName(),
                shoppingListDTO.getDate()
        );
    }

    // Converts DB Table into FE DTO
    // Ignores ID but includes a list of products
    private ShoppingListDTO convertShoppingListToDTO(ShoppingList shoppingList, boolean includeId, boolean includeProducts) {
        return new ShoppingListDTO(
                includeId ? shoppingList.getId() : null,
                shoppingList.getName(),
                shoppingList.getDate(),
                includeProducts ? storeService.getStoreProductsByShoppingListId(shoppingList.getId()) : null
        );
    }

//    private Collection<ShoppingList> convertShoppingListsFromDTOCollection(Collection<ShoppingListDTO> shoppingListDTOS) {
//        return shoppingListDTOS.stream().map(
//                (ShoppingListDTO shoppingListDTO) -> convertShoppingListFromDTO(shoppingListDTO)).collect(Collectors.toList());
//    }

    // Convert Shopping Lists to DTO for FE Consumption
    // Does not include ID, but does include a list of Products that needs to come from the StoreProduct table
    private Collection<ShoppingListDTO> convertShoppingListsToDTOCollection(Collection<ShoppingList> shoppingLists, boolean includeId, boolean includeProducts) {
        return shoppingLists.stream().map(
                (ShoppingList shoppingList) -> convertShoppingListToDTO(shoppingList, includeId, includeProducts)).collect(Collectors.toList());
    }
}
