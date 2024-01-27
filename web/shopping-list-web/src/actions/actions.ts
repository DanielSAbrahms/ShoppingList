import { Product } from "@/models/product-model";

export function addProduct(product: Product) {
    return {
        type: 'addProduct',
        payload: product
    }
}

export function removeProduct(product: Product) {
    return {
        type: 'removeProduct',
        payload: product
    }
}

export function changeName(name: string) {
    return {
        type: 'changeName',
        payload: name
    }
}

export function changeDate(date: string) {
    return {
        type: 'changeDate',
        payload: date
    }
}