import {ShoppingList} from "@/models/shopping-list-model";
import {Product} from "@/models/product-model";

async function fetchData(endpoint: string): Promise<any> {
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: 'GET',
    });
    if (response.ok) return response?.json();
    else throw new Error(`Error fetching request to :${endpoint}`);
}

async function putData(endpoint: string, data: object): Promise<any> {
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Error putting request to :${endpoint}`);
    } else {
        return response;
    }
}

async function addData(endpoint: string, data: object): Promise<any> {
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Error posting request to :${endpoint}`);
    } else {
        return response;
    }
}

export const getAllShoppingLists = (): Promise<ShoppingList[]> =>
    fetchData('shopping-lists');

export const getShoppingListById = (id: string): Promise<ShoppingList> =>
    fetchData(`shopping-lists/${id}`);

export const updateShoppingListById = (id: string, newData: ShoppingList): Promise<string> => {
    return putData(`shopping-lists/${id}`, newData);
}

export const addShoppingList = (newData: ShoppingList): Promise<string> => {
    return addData(`shopping-lists`, newData);
}

export const getAllProducts = (): Promise<Product[]> =>
    fetchData('stores/products');