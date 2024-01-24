package com.abrahms.ShoppingListApp.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.*;


public class ShoppingListDTO {


//    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    private String name;

    private Date date;

    private Collection<StoreProductDTO> products;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public ShoppingListDTO() {
    }

    public Collection<StoreProductDTO> getProducts() {
        return products;
    }

    public void setProducts(Collection<StoreProductDTO> products) {
        this.products = products;
    }

    public ShoppingListDTO(UUID id, String name, Date date, Collection<StoreProductDTO> products) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.products = products;
    }
}
