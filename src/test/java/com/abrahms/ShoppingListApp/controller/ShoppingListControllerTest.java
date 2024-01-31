package com.abrahms.ShoppingListApp.controller;

import com.abrahms.ShoppingListApp.dto.ShoppingListDTO;
import com.abrahms.ShoppingListApp.service.ShoppingListService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.Collection;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ShoppingListController.class)
public class ShoppingListControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ShoppingListService shoppingListService;

    @Test
    public void getAllListsTest() throws Exception {
        Collection<ShoppingListDTO> shoppingLists = Arrays.asList(/* initialize your DTOs here */);
        Mockito.when(shoppingListService.getAllShoppingLists()).thenReturn(shoppingLists);

        mockMvc.perform(MockMvcRequestBuilders.get("/shopping-lists"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").exists()); // Customize based on your DTO structure
    }

    @Test
    public void getListByIdTest() throws Exception {
        UUID id = UUID.randomUUID();
        ShoppingListDTO shoppingListDTO = new ShoppingListDTO(/* initialize your DTO */);
        Mockito.when(shoppingListService.getShoppingListByID(id)).thenReturn(shoppingListDTO);

        mockMvc.perform(MockMvcRequestBuilders.get("/shopping-lists/" + id))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(id.toString())); // Customize based on your DTO structure
    }

    // Continue with similar tests for addList, updateListById, and deleteListById
}
