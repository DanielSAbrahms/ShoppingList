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
        Store newStore = convertStoreFromDTO(newStoreDTO);
        storeRepository.save(newStore);
        return newStore.getId();
    }

    public void updateStoreById(UUID id, StoreDTO newDataForStoreDTO) {
        Store store = convertStoreFromDTO(newDataForStoreDTO);
        storeRepository.save(store);
    }

    public void deleteStoreById(UUID id) {
        storeRepository.deleteById(id);
    }

    // Methods for StoreProduct Table
    public Collection<StoreProductDTO> getAllStoreProducts() {
        Collection<StoreProduct> productCollection = storeProductRepository.findAll();
        return productCollection.isEmpty() ? Collections.emptyList(): convertStoreProductsToDTOCollection(productCollection);
    }

    public Collection<UUID> getStoreProductIDsByShoppingListId(UUID shoppingListId) {
        Collection<StoreProduct> productCollection = storeProductRepository.findByListID(shoppingListId);
        return productCollection.isEmpty() ?
                Collections.emptyList():
                productCollection.stream().map(product -> product.getId()).toList();
    }

    public Collection<StoreProductDTO> getStoreProductsByShoppingListId(UUID shoppingListId) {
        Collection<StoreProduct> productCollection = storeProductRepository.findByListID(shoppingListId);
        return productCollection.isEmpty() ?
                Collections.emptyList():
                productCollection.stream().map(product -> convertStoreProductToDTO(product)).toList();
    }

    public Collection<StoreProductDTO> getStoreProductsByStoreId(UUID storeId) {
        Collection<StoreProduct> productCollection = storeProductRepository.findByStoreID(storeId);
        return productCollection.isEmpty() ? Collections.emptyList(): convertStoreProductsToDTOCollection(productCollection);
    }

    public StoreProductDTO getStoreProductByStoreIDAndProductID(UUID storeId, UUID productId) {
        StoreProduct product = storeProductRepository.findByStoreIDAndProductID(storeId, productId).orElse(null);
        return product == null ? null : convertStoreProductToDTO(product);
    }

    public StoreProductDTO getStoreProductByID(UUID productId) {
        StoreProduct product = storeProductRepository.findById(productId).orElse(null);
        return product == null ? null : convertStoreProductToDTO(product);
    }

    public UUID addStoreProduct(UUID storeId, StoreProductDTO newStoreProductDTO) {
        StoreProduct newStoreProduct = convertStoreProductFromDTO(null, storeId, newStoreProductDTO);
        storeProductRepository.save(newStoreProduct);
        return newStoreProduct.getId();
    }

    public void updateStoreProductById(UUID storeId, UUID id, StoreProductDTO newDataForStoreProductDTO) {
        StoreProduct newStoreProduct = convertStoreProductFromDTO(storeId, id, newDataForStoreProductDTO);
        storeProductRepository.save(newStoreProduct);
    }

    public void deleteStoreProductById(UUID id) {
        storeProductRepository.deleteById(id);
    }

    // ---------- Private Methods ----------

    // For adding to DB from DTO
    // Fetch ID from DTO, if exists, else generate new one
    private Store convertStoreFromDTO(StoreDTO storeDTO) {
        return new Store(
                null,
                storeDTO.getName()
        );
    }

    // For pulling from DB into DTO
    private StoreDTO convertStoreToDTO(Store store) {
        return new StoreDTO(
                store.getName()
        );
    }

    private Collection<Store> convertStoresFromDTOCollection(Collection<StoreDTO> storeDTOCollection) {
        return storeDTOCollection.stream().map(
                this::convertStoreFromDTO).collect(Collectors.toList());
    }

    private Collection<StoreDTO> convertStoresToDTOCollection(Collection<Store> storeDTOCollection) {
        return storeDTOCollection.stream().map(
                this::convertStoreToDTO).collect(Collectors.toList());
    }

    // For adding to DB from DTO
    // Fetch ID from DTO, if exists, else generate new one
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
                storeProduct.getPrice()
        );
    }

    private Collection<StoreProduct> convertStoreProductsFromDTOCollection(UUID id, UUID storeId, Collection<StoreProductDTO> storeProductDTOCollection) {
        return storeProductDTOCollection.stream().map(
                (StoreProductDTO storeProductDTO) -> convertStoreProductFromDTO(id, storeId, storeProductDTO)).collect(Collectors.toList());
    }

    private Collection<StoreProductDTO> convertStoreProductsToDTOCollection(Collection<StoreProduct> storeProductCollection) {
        return storeProductCollection.stream().map((StoreProduct storeProduct) -> convertStoreProductToDTO(storeProduct)).collect(Collectors.toList());

    }
}
