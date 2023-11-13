package com.abrahms.ShoppingListApp.repository;

import com.abrahms.ShoppingListApp.model.StoreProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Component
public interface StoreProductRepository extends JpaRepository<StoreProduct, UUID> {

    @Query(
            value = "SELECT * FROM StoreProduct " +
                    "WHERE Price >= :lowerPriceLimit AND Price <= :upperPriceLimit",
            nativeQuery = true)
    public Collection<StoreProduct> findWithinPriceRange(
            @Param("lowerPriceLimit") double lowerPriceLimit, @Param("upperPriceLimit") double upperPriceLimit
    );

    @Query(
            value = "SELECT p.* FROM StoreProduct AS p " +
                    "INNER JOIN Store AS s ON s.ID = p.StoreID " +
                    "WHERE s.ID = :storeID",
            nativeQuery = true)
    public Collection<StoreProduct> findByStoreID(@Param("storeID") UUID storeID);

    @Query(
            value = "SELECT p.* FROM StoreProduct AS p " +
                    "INNER JOIN Store AS s ON s.ID = p.StoreID " +
                    "WHERE s.ID = :storeID AND p.ID = :productID",
            nativeQuery = true)
    public Optional<StoreProduct> findByStoreIDAndProductID(@Param("storeID") UUID storeID, @Param("productID") UUID productID);

    @Query(
            value = "SELECT p.* FROM StoreProduct AS p " +
                    "INNER JOIN ShoppingListItem AS i ON p.ID = i.StoreProductID " +
                    "WHERE i.ShoppingListID = :listID",
            nativeQuery = true)
    public Collection<StoreProduct> findByListID(@Param("listID") UUID listID);

}
