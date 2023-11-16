import {Product} from "@/models/product-model";

export type ShoppingList = {
    id?: string;
    name: string;
    date: string;
    products?: Product[];
}