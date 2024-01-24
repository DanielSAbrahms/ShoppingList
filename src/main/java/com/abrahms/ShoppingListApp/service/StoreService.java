package com.abrahms.ShoppingListApp.service;

import com.abrahms.ShoppingListApp.dto.StoreDTO;
import com.abrahms.ShoppingListApp.dto.StoreProductDTO;
import com.abrahms.ShoppingListApp.model.Store;
import com.abrahms.ShoppingListApp.model.StoreProduct;
import com.abrahms.ShoppingListApp.repository.StoreProductRepository;
import com.abrahms.ShoppingListApp.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private StoreProductRepository storeProductRepository;

    // Methods for Store Table
    public Collection<StoreDTO> getAllStores() {
        Collection<Store> storeCollection = storeRepository.findAll();
        return storeCollection.isEmpty()
                ? Collections.emptyList() : convertStoresToDTOCollection(storeCollection);
    }

    public StoreDTO getStoreByID(UUID id) {
        Store store = storeRepository.findById(id).orElse(null);
        return store == null ? null : convertStoreToDTO(store);
    }

    public UUID addStore(StoreDTO newStoreDTO) {
        Store newStore = convertStoreFromDTO(null, newStoreDTO);
        storeRepository.save(newStore);
        return newStore.getId();
    }

    public void updateStoreById(UUID id, StoreDTO newDataForStoreDTO) {
        Store store = convertStoreFromDTO(id, newDataForStoreDTO);
        storeRepository.save(store);
    }

    public void deleteStoreById(UUID id) {
        storeRepository.deleteById(id);
    }

    // Methods for StoreProduct Table
    public Collection<StoreProductDTO> getAllStoreProducts() {
        Collection<StoreProduct> productCollection = storeProductRepository.findAll();
        return productCollection.isEmpty() ? Collections.emptyList(): convertStoreProductsToDTOCollection(productCollection, true);
    }

    public StoreProductDTO getStoreProductById(UUID id) {
        StoreProduct product = storeProductRepository.findById(id).orElse(null);
        return product == null ? null : convertStoreProductToDTO(product);

    }

    public Collection<StoreProductDTO> getStoreProductsByShoppingListId(UUID shoppingListId) {
        Collection<StoreProduct> productCollection = storeProductRepository.findByListID(shoppingListId);
        return productCollection.isEmpty() ? Collections.emptyList(): convertStoreProductsToDTOCollection(productCollection, true);
    }

    public Collection<StoreProductDTO> getStoreProductsByStoreId(UUID storeId) {
        Collection<StoreProduct> productCollection = storeProductRepository.findByStoreID(storeId);
        return productCollection.isEmpty() ? Collections.emptyList(): convertStoreProductsToDTOCollection(productCollection, true);
    }

    public StoreProductDTO getStoreProductsByStoreIDAndProductID(UUID storeId, UUID productId) {
        StoreProduct product = storeProductRepository.findByStoreIDAndProductID(storeId, productId).orElse(null);
        return product == null ? null : convertStoreProductToDTO(product);
    }

    public UUID addStoreProduct(UUID storeId, StoreProductDTO newStoreProductDTO) {
        StoreProduct newStoreProduct = convertStoreProductFromDTO(null, storeId, newStoreProductDTO);
        storeProductRepository.save(newStoreProduct);
        return newStoreProduct.getId();
    }

    public void updateStoreProductById(UUID id, StoreProductDTO newDataForStoreProductDTO) {
        StoreProductDTO existingProduct = getStoreProductById(id);

        StoreProduct newStoreProduct = convertStoreProductFromDTO(id, existingProduct.getStoreId(), newDataForStoreProductDTO);
        storeProductRepository.save(newStoreProduct);
    }

    public void deleteStoreProductById(UUID id) {
        storeProductRepository.deleteById(id);
    }

    // ---------- Private Methods ----------

    // For adding to DB from DTO
    private Store convertStoreFromDTO(UUID id, StoreDTO storeDTO) {
        return new Store(
                id,
                storeDTO.getName()
        );
    }

    // For pulling from DB into DTO
    private StoreDTO convertStoreToDTO(Store store) {
        return new StoreDTO(
                store.getId(),
                store.getName()
        );
    }

    private Collection<StoreDTO> convertStoresToDTOCollection(Collection<Store> storeDTOCollection) {
        return storeDTOCollection.stream().map(
                this::convertStoreToDTO).collect(Collectors.toList());
    }

    // For adding to DB from DTO
    private StoreProduct convertStoreProductFromDTO(UUID id, UUID storeId, StoreProductDTO storeProductDTO) {
        return new StoreProduct(
                id,
                storeProductDTO.getProductName(),
                storeProductDTO.getBrandName(),
                storeProductDTO.getPrice(),
                storeId
        );
    }

    // For pulling from DB into DTO
    private StoreProductDTO convertStoreProductToDTO(StoreProduct storeProduct) {
        return new StoreProductDTO(
                storeProduct.getId(),
                storeProduct.getProductName(),
                storeProduct.getBrandName(),
                storeProduct.getPrice(),
                storeProduct.getStoreId()
        );
    }

    private Collection<StoreProduct> convertStoreProductsFromDTOCollection(UUID id, UUID storeId, Collection<StoreProductDTO> storeProductDTOCollection) {
        return storeProductDTOCollection.stream().map(
                (StoreProductDTO storeProductDTO) -> convertStoreProductFromDTO(id, storeId, storeProductDTO)).collect(Collectors.toList());
    }

    private Collection<StoreProductDTO> convertStoreProductsToDTOCollection(Collection<StoreProduct> storeProductCollection, boolean includeId) {
        return storeProductCollection.stream().map((StoreProduct storeProduct) -> convertStoreProductToDTO(storeProduct)).collect(Collectors.toList());

    }
}
