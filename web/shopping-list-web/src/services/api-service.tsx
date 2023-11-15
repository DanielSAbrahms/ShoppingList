import {ShoppingList} from "@/models/shopping-list-model";

async function fetchData(endpoint: string): Promise<any> {
    const response = await fetch(`http://localhost:8080/${endpoint}`);

    if (response.ok) return response.json();
    else throw new Error(`Error fetching request to :${endpoint}`);
}

export const getAllShoppingLists = (): Promise<ShoppingList[]> =>
    fetchData('shopping-lists');

export const getShoppingListById = (id: string): Promise<ShoppingList> =>
    fetchData(`shopping-lists/${id}`);