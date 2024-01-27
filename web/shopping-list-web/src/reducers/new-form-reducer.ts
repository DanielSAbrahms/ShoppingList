import { Product } from "@/models/product-model";
import { NewShoppingList } from "@/models/shopping-list-model";
import { ReducerAction } from "react";
import { Reducer } from "redux";

const emptyProductList: Product[] = [];

const initialState: NewShoppingList = {
    name: "",
    date: "xxxx-xx-xx",
    products: emptyProductList
}

const newFormReducer: Reducer<NewShoppingList> = (state = initialState, action: any) => {
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
            return {
                ...state,
                // Add Product to state's product list
                products: [
                    ...state.products,
                    action.payload
                ]
            }
        }

        case 'removeProduct': { // Payload is Product
            return {
                ...state,
                // remove Product to state's product list
                products: state.products.filter(p => p.key !== action.payload.key)
            }
        }
    }
}

export default newFormReducer;