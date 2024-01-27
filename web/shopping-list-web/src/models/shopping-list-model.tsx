import { Product, ProductInList } from "./product-model";

export type ShoppingList = {
    id: string;
    name: string;
    date: string;
    products: Product[];
}

export type NewShoppingList = {
    name: string;
    date: string;
    products: ProductInList[];
}