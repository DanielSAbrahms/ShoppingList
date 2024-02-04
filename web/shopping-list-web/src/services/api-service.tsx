import {
    NewShoppingList,
    NewShoppingListDTO,
    ShoppingList,
    ShoppingListDTO,
} from "@/models/shopping-list-model";
import { Product, ProductInList } from "@/models/product-model";

async function fetchData(endpoint: string): Promise<any> {
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: "GET",
    });
    if (response.ok) return response?.json();
    else throw new Error(`Error sending get request to :${endpoint}`);
}

async function addData(endpoint: string, data: object): Promise<any> {
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        console.error("Response Status:", response.status);
        console.error("Status Text:", response.statusText);
        throw new Error(`Error sending post request to :${endpoint}`);
    } else {
        return (await response.text()).replace(/['"]+/g, "");
    }
}

async function putData(endpoint: string, data: object): Promise<any> {
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Error sending put request to :${endpoint}`);
    } else {
        return response;
    }
}

async function deleteData(endpoint: string): Promise<any> {
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Error sending delete request to :${endpoint}`);
    } else {
        return response;
    }
}

export const getAllShoppingLists = async (): Promise<ShoppingList[]> => {
    const shoppingLists: ShoppingListDTO[] = await fetchData("shopping-lists");
    var newShoppingLists: ShoppingList[] = [];

    shoppingLists.map((shoppingList) => {
        const newProductList: ProductInList[] = [];

        shoppingList.products.map((p) => {
            // If Product is already in newProductList
            const foundProduct = newProductList.find(
                (x) => x.product.id === p.id
            );
            if (foundProduct) {
                foundProduct.quantity = foundProduct.quantity + 1;
            } else {
                const newProductInList: ProductInList = {
                    product: p,
                    quantity: 1,
                };
                newProductList.push(newProductInList);
            }
        });

        const newShoppingList: ShoppingList = {
            id: shoppingList.id,
            name: shoppingList.name,
            date: formatIncomingDate(shoppingList.date),
            products: newProductList,
        };

        newShoppingLists.push(newShoppingList);
    });
    return newShoppingLists;
};

export const getShoppingListById = async (id: string) => {
    const shoppingList: ShoppingListDTO = await fetchData(
        `shopping-lists/${id}`
    );
    const newProductList: ProductInList[] = [];

    shoppingList.products.map((p) => {
        // If Product is already in newProductList
        const foundProduct = newProductList.find((x) => x.product.id === p.id);
        if (foundProduct) {
            foundProduct.quantity = foundProduct.quantity + 1;
        } else {
            const newProductInList: ProductInList = { product: p, quantity: 1 };
            newProductList.push(newProductInList);
        }
    });

    const newShoppingList: ShoppingList = {
        id: id,
        name: shoppingList.name,
        date: formatIncomingDate(shoppingList.date),
        products: newProductList,
    };

    return newShoppingList;
};

// Should convert NewShoppingList with quantities into ShoppingList with duplicate instances
export const addShoppingList = (newData: NewShoppingList): Promise<string> => {
    // Fill in Static Data
    var data: NewShoppingListDTO = {
        name: newData.name,
        date: formatOutgoingDate(newData.date),
        products: [],
    };

    // For each product, push instance into list for every quantity
    newData.products.map((productInList) => {
        for (var i = 0; i < productInList.quantity; i++) {
            data.products.push(productInList.product);
        }
    });
    return addData(`shopping-lists`, data);
};

export const updateShoppingListById = (
    newData: ShoppingList
): Promise<string> => {
    var data: ShoppingListDTO = {
        id: newData.id,
        name: newData.name,
        date: formatOutgoingDate(newData.date),
        products: [],
    };

    // For each product, push instance into list for every quantity
    newData.products.map((productInList) => {
        for (var i = 0; i < productInList.quantity; i++) {
            data.products.push(productInList.product);
        }
    });

    return putData(`shopping-lists/${data.id}`, data);
};

export const deleteShoppingListById = (id: string): Promise<string> => {
    return deleteData(`shopping-lists/${id}`);
};

export const getAllProducts = (): Promise<Product[]> =>
    fetchData("stores/products");

const formatIncomingDate = (dateString: string): string => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(5, 7);
    const day = dateString.substring(8, 10);

    return `${month}/${day}/${year}`;
};

const formatOutgoingDate = (dateString: string): string => {
    const month = dateString.substring(0, 2);
    const day = dateString.substring(3, 5);
    const year = dateString.substring(6, 10);

    return `${year}-${month}-${day}`;
};
