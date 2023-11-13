package com.abrahms.ShoppingListApp.repository;

import com.abrahms.ShoppingListApp.model.ShoppingListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public interface ShoppingListItemRepository extends JpaRepository<ShoppingListItem, UUID> {

    @Modifying
    @Query(
            value = "DELETE FROM ShoppingListItem " +
                    "WHERE ShoppingListID = :listId",
            nativeQuery = true)
    public void dropAllForList(@Param("listId") UUID listId);
}
