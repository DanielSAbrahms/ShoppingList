import { Product } from "@/models/product-model";

export function addProduct(id: string) {
    return {
        type: "addProduct",
        payload: id,
    };
}

export function removeProduct(id: string) {
    return {
        type: "removeProduct",
        payload: id,
    };
}

export function changeName(name: string) {
    return {
        type: "changeName",
        payload: name,
    };
}

export function changeDate(date: string) {
    return {
        type: "changeDate",
        payload: date,
    };
}

export function setupAllProducts(allProducts: Product[]) {
    return {
        type: "setupAllProducts",
        payload: allProducts,
    };
}
