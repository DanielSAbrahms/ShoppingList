package com.abrahms.ShoppingListApp.repository;

import com.abrahms.ShoppingListApp.dto.StoreDTO;
import com.abrahms.ShoppingListApp.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.UUID;

@Component
public interface StoreRepository extends JpaRepository<Store, UUID> {


}
