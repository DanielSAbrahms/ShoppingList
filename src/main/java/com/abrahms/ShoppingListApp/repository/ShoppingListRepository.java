package com.abrahms.ShoppingListApp.repository;

import com.abrahms.ShoppingListApp.model.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.UUID;

@Component
public interface ShoppingListRepository extends JpaRepository<ShoppingList, UUID> {

}
