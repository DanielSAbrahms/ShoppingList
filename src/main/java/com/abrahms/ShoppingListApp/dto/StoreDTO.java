package com.abrahms.ShoppingListApp.dto;

public class StoreDTO {

    private String name;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public StoreDTO(String name) {
        this.name = name;
    }

    public StoreDTO() {}
}
