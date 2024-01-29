import {NewShoppingList, ShoppingList} from "@/models/shopping-list-model";
import {Product} from "@/models/product-model";

async function fetchData(endpoint: string): Promise<any> {
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: 'GET',
    });
    if (response.ok) return response?.json();
    else throw new Error(`Error sending get request to :${endpoint}`);
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
        console.error('Response Status:', response.status);
        console.error('Status Text:', response.statusText);
        throw new Error(`Error sending post request to :${endpoint}`);
    } else {
        return (await response.text()).replace(/['"]+/g, '')
    }
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
        throw new Error(`Error sending put request to :${endpoint}`);
    } else {
        return response;
    }
}

async function deleteData(endpoint: string): Promise<any> {
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Error sending delete request to :${endpoint}`);
    } else {
        return response;
    }
}

export const getAllShoppingLists = (): Promise<ShoppingList[]> =>
    fetchData('shopping-lists');

export const getShoppingListById = (id: string): Promise<ShoppingList> =>
    fetchData(`shopping-lists/${id}`);

// Should convert NewShoppingList with quantities into ShoppingList with duplicate instances
export const addShoppingList = (newData: NewShoppingList): Promise<string> => {
    console.log(newData);
    // Fill in Static Data
    var data: ShoppingList = {
        name: newData.name,
        date: newData.date,
        products: []
    };

    // For each product, push instance into list for every quantity
    newData.products.map(productInList => {
        for (var i = 0; i < productInList.quantity; i++) {
            data.products.push(productInList.product);
        }
    });
    console.log(data);
    return addData(`shopping-lists`, data);
}

export const updateShoppingListById = (id: string, newData: ShoppingList): Promise<string> => {
    return putData(`shopping-lists/${id}`, newData);
}

export const deleteShoppingListById = (id: string): Promise<string> => {
    return deleteData(`shopping-lists/${id}`);
}

export const getAllProducts = (): Promise<Product[]> =>
    fetchData('stores/products');