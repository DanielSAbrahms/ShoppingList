package com.abrahms.ShoppingListApp.controller;

import com.abrahms.ShoppingListApp.dto.ShoppingListDTO;
import com.abrahms.ShoppingListApp.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ShoppingListController {

    @Autowired
    private ShoppingListService shoppingListService;


    @GetMapping("/shopping-lists")
    public ResponseEntity<Collection<ShoppingListDTO>> getAllLists() {
        return new ResponseEntity<>(shoppingListService.getAllShoppingLists(), HttpStatus.OK);
    }

    // Get One Store (GET)
    // Param: ID (URL)
    @GetMapping("/shopping-lists/{id}")
    public ResponseEntity<ShoppingListDTO> getListById(@PathVariable UUID id) {
        if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        ShoppingListDTO shoppingListDTO = shoppingListService.getShoppingListByID(id);

        if (shoppingListDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else  {
            return new ResponseEntity<>(shoppingListDTO, HttpStatus.OK);
        }
    }

    // Add Store (POST)
    // Param: newStoreDTO (Body)
    @PostMapping("/shopping-lists")
    public ResponseEntity<UUID> addList(@RequestBody ShoppingListDTO newShoppingListDTO) {
        try {
            UUID newListId = shoppingListService.addShoppingList(newShoppingListDTO);
            return new ResponseEntity<UUID>(newListId, HttpStatus.CREATED);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Update Store (PUT)
    // Param: ID (URL)
    // Param: newDataForStoreDTO (Body)
    // Updates ShoppingListItem assoc table
    @PutMapping("/shopping-lists/{id}")
    public ResponseEntity<Void> updateListById(@PathVariable UUID id, @RequestBody ShoppingListDTO newDataForShoppingListDTO) {
        try {
            if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            shoppingListService.updateShoppingListById(id, newDataForShoppingListDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Delete Store By ID (DELETE)
    // Param: ID (URL)
    @DeleteMapping("/shopping-lists/{id}")
    public ResponseEntity<Void> deleteListById(@PathVariable UUID id) {
        try {
            if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            shoppingListService.deleteShoppingListById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}