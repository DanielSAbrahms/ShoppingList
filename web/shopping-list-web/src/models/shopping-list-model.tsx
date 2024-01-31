import { Product, ProductInList } from "./product-model";

export type ShoppingList = {
    id: string;
    name: string;
    date: string;
    products: ProductInList[];
};

export type NewShoppingList = {
    name: string;
    date: string;
    products: ProductInList[];
};

export type ShoppingListDTO = {
    id: string;
    name: string;
    date: string;
    products: Product[];
};

export type NewShoppingListDTO = {
    name: string;
    date: string;
    products: Product[];
};
