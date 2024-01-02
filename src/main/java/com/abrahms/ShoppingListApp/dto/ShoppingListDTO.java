package com.abrahms.ShoppingListApp.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;


public class ShoppingListDTO {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    private String name;

    private LocalDate date;

    private Collection<UUID> products;

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public ShoppingListDTO() {
    }

    public Collection<UUID> getProducts() {
        return products;
    }

    public void setProducts(Collection<UUID> products) {
        this.products = products;
    }

    public ShoppingListDTO(UUID id, String name, LocalDate date, Collection<UUID> products) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.products = products;
    }
}
