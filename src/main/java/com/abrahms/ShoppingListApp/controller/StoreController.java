package com.abrahms.ShoppingListApp.controller;

import com.abrahms.ShoppingListApp.dto.StoreDTO;
import com.abrahms.ShoppingListApp.dto.StoreProductDTO;
import com.abrahms.ShoppingListApp.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StoreController {

    @Autowired
    private StoreService storeService;

    // Get All Stores (GET)
    @GetMapping("/stores")
    public ResponseEntity<Collection<StoreDTO>> getAllStores() {
        return new ResponseEntity<>(storeService.getAllStores(), HttpStatus.OK);
    }

    // Get One Store (GET)
    // Param: ID (URL)
    @GetMapping("/stores/{id}")
    public ResponseEntity<StoreDTO> getStoreById(@PathVariable UUID id) {
        if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        StoreDTO storeDTO = storeService.getStoreByID(id);

        if (storeDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else  {
            return new ResponseEntity<>(storeDTO, HttpStatus.OK);
        }
    }

    // Add Store (POST)
    // Param: newStoreDTO (Body)
    @PostMapping("/stores")
    public ResponseEntity<UUID> addStore(@RequestBody StoreDTO newStoreDTO) {
        try {
            UUID newStoreId = storeService.addStore(newStoreDTO);
            return new ResponseEntity<UUID>(newStoreId, HttpStatus.CREATED);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Update Store (PUT)
    // Param: ID (URL)
    // Param: newDataForStoreDTO (Body) - If ID is present in Body, must be same to URL
    @PutMapping("/stores/{storeID}")
    public ResponseEntity<Void> updateStoreById(@PathVariable UUID storeID, @RequestBody StoreDTO newDataForStoreDTO) {
        try {
            if (storeID == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            storeService.updateStoreById(storeID, newDataForStoreDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Delete Store By ID (DELETE)
    // Param: ID (URL)
    @DeleteMapping("/stores/{id}")
    public ResponseEntity<Void> deleteStoreById(@PathVariable UUID id) {
        try {
            if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            storeService.deleteStoreById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/stores/products")
    public ResponseEntity<Collection<StoreProductDTO>> getAllProducts() {
        return new ResponseEntity<>(storeService.getAllStoreProducts(), HttpStatus.OK);
    }

    @GetMapping("/stores/{storeId}/products")
    public ResponseEntity<Collection<StoreProductDTO>> getProductsByStoreID(@PathVariable UUID storeId) {
        if (storeId == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        Collection<StoreProductDTO> products = storeService.getStoreProductsByStoreId(storeId);

        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else  {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }


    @GetMapping("/stores/{storeId}/products/{id}")
    public ResponseEntity<StoreProductDTO> getProductsByStoreIDAndProductID(@PathVariable UUID storeId, @PathVariable UUID id) {

        if (storeId == null || id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        StoreProductDTO product = storeService.getStoreProductsByStoreIDAndProductID(storeId, id);

        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else  {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
    }

    // Add Product to Store (POST)
    // Param: storeId (URL)
    // Param: newStoreDTO (Body) -- overwrites storeId with URL Param
    @PostMapping("/stores/{storeId}/products")
    public ResponseEntity<UUID> addProductToStore(@PathVariable UUID storeId, @RequestBody StoreProductDTO newStoreProductDTO) {
        try {
            if (storeId == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            UUID newId = storeService.addStoreProduct(storeId, newStoreProductDTO);
            return new ResponseEntity<>(newId, HttpStatus.CREATED);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Update StoreProduct (PUT)
    // Param: ID (URL)
    // Param: newDataForStoreProductDTO (Body) - overwrites storeId with URL Param
    @PutMapping("/stores/products/{id}")
    public ResponseEntity<Void> updateProductForStoreById(@PathVariable UUID id, @RequestBody StoreProductDTO newDataForStoreProductDTO) {
        try {
            if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            storeService.updateStoreProductById(id, newDataForStoreProductDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    // Delete StoreProduct By ID (DELETE)
    // Param: ID (URL)
    @DeleteMapping("/stores/products/{id}")
    public ResponseEntity<Void> deleteStoreProductById(@PathVariable UUID id) {
        try {
            if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            storeService.deleteStoreProductById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}