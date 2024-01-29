import { Product, ProductInList } from "@/models/product-model";
import { NewShoppingList } from "@/models/shopping-list-model";
import { ReducerAction } from "react";
import { Reducer } from "redux";

export type newListReducerProps = {
    newShoppingList: NewShoppingList,
    allProducts?: Product[],
    productsNotInList?: Product[]
}

const initialState: newListReducerProps = {
    newShoppingList: {
        name: "",
        date: "xxxx-xx-xx",
        products: []
    },
    allProducts: [],
    productsNotInList: []
}

const newListReducer: Reducer<newListReducerProps> = (state = initialState, action: any) => {
    switch (action.type) {
        default: // No specific action, just return state
            return state

        case 'changeName': { // Payload is new name value
            return {
                ...state,
                name: action.payload
            }
        }

        case 'changeDate': { // Payload is new date value
            return {
                ...state,
                date: action.payload
            }
        }

        case 'addProduct': { // Payload is new Product
            console.log("addProduct reducer");
            var foundProduct = state.newShoppingList.products.find(p => p.product.id === action.payload.product.id);
            
            if (foundProduct) { // If product already exists in list
                foundProduct.quantity++;

                return {
                    ...state,
                    products: [
                        ...state.newShoppingList.products.filter(p => p.product.id !== foundProduct?.product.id),
                        foundProduct
                    ]
                }
            } else { // If Product doesn't not exist in list
                const newProductForList: ProductInList = { product: action.payload, quantity: 1 };

                return {
                    ...state,
                    products: [
                        ...state.newShoppingList.products,
                        newProductForList // Append product to list with quantity of 1
                    ]
                }
            }
        }

        case 'removeProduct': { // Payload is Product
            var foundProduct = state.newShoppingList.products.find(p => p.product.id === action.payload.product.id);
            if (!foundProduct) return state; // If can't find product in list, don't do anything

            foundProduct.quantity--;

            if (foundProduct.quantity < 1) { // If no more quantity, remove from list
                return {
                    ...state,
                    // remove Product to state's product list
                    products: state.newShoppingList.products.filter(p => p.product.id !== action.payload.id)
                }
            } else { // Otherwise, just decrement quantity
                return {
                    ...state,
                    products: [
                        ...state.newShoppingList.products.filter(p => p.product.id !== foundProduct?.product.id),
                        foundProduct
                    ]
                }
            }
        }
    }
}

export default newListReducer;