import { Product, ProductInList } from "@/models/product-model";
import { ShoppingList } from "@/models/shopping-list-model";
import { Reducer } from "redux";

export type EditListReducerProps = {
    shoppingListForEdit: ShoppingList; // The metadata and products in the shopping list
    allProducts: Product[]; // All products (doesn't not change)
    productsNotInList: Product[]; // All products not in list (updated when shopping list is updated)
};

const initialState: EditListReducerProps = {
    shoppingListForEdit: {
        id: "",
        name: "",
        date: "xxxx-xx-xx",
        products: [],
    },
    allProducts: [],
    productsNotInList: [],
};

const editListReducer: Reducer<EditListReducerProps> = (
    state = initialState,
    action: any
) => {
    switch (action.type) {
        // No specific action, just return state
        default:
            return state;

        case "setCurrentListForEdit": {
            // Go through products in list to remove from productsNotInList
            const newProductsNotInList = state.allProducts.filter((p) => {
                return state.shoppingListForEdit.products.find(
                    (pInList) => pInList.product.id === p.id
                );
            });

            return {
                ...state,
                shoppingListForEdit: {
                    id: action.payload.id,
                    name: action.payload.name,
                    date: action.payload.date,
                    products: action.payload.products,
                },
                productsNotInList: newProductsNotInList,
            };
        }

        // Payload is new name value
        case "changeName": {
            return {
                ...state,
                shoppingListForEdit: {
                    ...state.shoppingListForEdit,
                    name: action.payload,
                },
            };
        }

        // Payload is new date value
        case "changeDate": {
            return {
                ...state,
                shoppingListForEdit: {
                    ...state.shoppingListForEdit,
                    date: action.payload,
                },
            };
        }

        // Payload is new Product ID
        case "addProduct": {
            // First, check if products is in list
            var productInList = state.shoppingListForEdit.products.find(
                (p) => p.product.id === action.payload
            );

            // If in list, just increment
            if (productInList) {
                const newProducts = state.shoppingListForEdit.products.map(
                    (p) => {
                        if (p.product.id === action.payload) {
                            return {
                                product: p.product,
                                quantity: p.quantity + 1,
                            };
                        } else return p;
                    }
                );

                return {
                    ...state,
                    shoppingListForEdit: {
                        ...state.shoppingListForEdit,
                        products: newProducts,
                    },
                };
                // If not in list, lookup details, add to list, and remove from productsNotInList
            } else {
                const productLookup = state.allProducts?.find(
                    (p) => p.id === action.payload
                );

                if (!productLookup) {
                    console.error(
                        `Could not find product with requested id of : ${action.payload}`
                    );
                    return state;
                }

                // If Product doesn't not exist in list
                const newProductForList: ProductInList = {
                    product: productLookup,
                    quantity: 1,
                };

                const newProductsNotInList = state.productsNotInList.filter(
                    (p) => {
                        return p.id !== newProductForList.product.id;
                    }
                );

                return {
                    ...state,
                    shoppingListForEdit: {
                        ...state.shoppingListForEdit,
                        products: [
                            ...state.shoppingListForEdit.products,
                            newProductForList, // Append product to list with quantity of 1
                        ],
                    },
                    productsNotInList: newProductsNotInList, // Filter out product
                };
            }
        }

        // Payload is Product
        case "removeProduct": {
            var foundProduct = state.shoppingListForEdit.products.find(
                (p) => p.product.id === action.payload
            );
            if (!foundProduct) {
                console.error(
                    `Could not find product in list with id of : ${action.payload}`
                );
                return state;
            }

            if (foundProduct.quantity == 1) {
                // If no more quantity, remove from list
                return {
                    ...state,
                    shoppingListForEdit: {
                        ...state.shoppingListForEdit,
                        products: state.shoppingListForEdit.products.filter(
                            (p) => p.product.id !== action.payload // remove Product from state's product list
                        ),
                    },
                    productsNotInList: [
                        ...state.productsNotInList,
                        foundProduct.product,
                    ],
                };
            } else {
                // Otherwise, just decrement quantity
                const newProducts = state.shoppingListForEdit.products.map(
                    (p) => {
                        if (p.product.id === action.payload) {
                            return {
                                product: p.product,
                                quantity: p.quantity - 1,
                            };
                        } else return p;
                    }
                );

                return {
                    ...state,
                    shoppingListForEdit: {
                        ...state.shoppingListForEdit,
                        products: newProducts,
                    },
                };
            }
        }

        case "setupAllProducts": {
            return {
                ...state,
                allProducts: action.payload,
                // ProductsNotInList should be set by setCurrentListForEdit
            };
        }
    }
};

export default editListReducer;
