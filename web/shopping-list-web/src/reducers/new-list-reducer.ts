import { Product, ProductInList } from "@/models/product-model";
import { NewShoppingList } from "@/models/shopping-list-model";
import { Reducer } from "redux";

export type NewListReducerProps = {
    newShoppingList: NewShoppingList; // The metadata and products in the shopping list
    allProducts: Product[]; // All products (doesn't not change)
    productsNotInList: Product[]; // All products not in list (updated when shopping list is updated)
    error: any;
};

const initialState: NewListReducerProps = {
    newShoppingList: {
        name: "",
        date: "xx/xx/xxxx",
        products: [],
    },
    allProducts: [],
    productsNotInList: [],
    error: null,
};

const newListReducer: Reducer<NewListReducerProps> = (
    state = initialState,
    action: any
) => {
    switch (action.type) {
        default: // No specific action, just return state
            return state;

        case "changeName": {
            // Payload is new name value
            return {
                ...state,
                newShoppingList: {
                    ...state.newShoppingList,
                    name: action.payload,
                },
            };
        }

        case "changeDate": {
            // Payload is new date value
            return {
                ...state,
                newShoppingList: {
                    ...state.newShoppingList,
                    date: action.payload,
                },
            };
        }

        // Payload is new Product ID
        case "addProduct": {
            // First, check if products is in list
            var productInList = state.newShoppingList.products.find(
                (p) => p.product.id === action.payload
            );

            // If in list, just increment
            if (productInList) {
                const newProducts = state.newShoppingList.products.map((p) => {
                    if (p.product.id === action.payload) {
                        return { product: p.product, quantity: p.quantity + 1 };
                    } else return p;
                });

                return {
                    ...state,
                    newShoppingList: {
                        ...state.newShoppingList,
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
                    newShoppingList: {
                        ...state.newShoppingList,
                        products: [
                            ...state.newShoppingList.products,
                            newProductForList, // Append product to list with quantity of 1
                        ],
                    },
                    productsNotInList: newProductsNotInList, // Filter out product
                };
            }
        }

        // Payload is Product
        case "removeProduct": {
            var foundProduct = state.newShoppingList.products.find(
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
                    newShoppingList: {
                        ...state.newShoppingList,
                        products: state.newShoppingList.products.filter(
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
                const newProducts = state.newShoppingList.products.map((p) => {
                    if (p.product.id === action.payload) {
                        return { product: p.product, quantity: p.quantity - 1 };
                    } else return p;
                });

                return {
                    ...state,
                    newShoppingList: {
                        ...state.newShoppingList,
                        products: newProducts,
                    },
                };
            }
        }

        case "setupAllProducts": {
            return {
                ...state,
                allProducts: action.payload,
                productsNotInList: action.payload,
            };
        }

        case "setError": {
            return {
                ...state,
                error: action.payload,
            };
        }

        case "clearError": {
            return {
                ...state,
                error: null,
            };
        }
    }
};

export default newListReducer;
