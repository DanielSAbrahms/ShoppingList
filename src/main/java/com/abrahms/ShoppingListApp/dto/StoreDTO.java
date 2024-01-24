package com.abrahms.ShoppingListApp.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.UUID;

public class StoreDTO {

    public StoreDTO(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;

    private String name;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public StoreDTO() {}
}
