package com.abrahms.ShoppingListApp.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Optional;
import java.util.UUID;


public class StoreProductDTO {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;

    private String productName;

    private String brandName;

    private Double price;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }


    public StoreProductDTO(UUID id, String productName, String brandName, Double price) {
        this.id = id;
        this.productName = productName;
        this.brandName = brandName;
        this.price = price;
    }

    public StoreProductDTO() {
    }
}
