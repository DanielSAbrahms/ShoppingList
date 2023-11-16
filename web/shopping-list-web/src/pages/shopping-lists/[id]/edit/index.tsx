import Image from 'next/image'
import MainLayout from "@/layouts/main-layout";
import {ShoppingList} from "@/models/shopping-list-model";
import {getAllProducts, getShoppingListById, updateShoppingListById} from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";
import Link from "next/link";
import React, {useContext} from "react";
import UpdateShoppingListForm from "@/forms/update-shopping-list-form";
import {Product} from "@/models/product-model";

type ShoppingListProps = {
    id: string;
    shoppingList: ShoppingList;
    allProducts?: Product[];
}


export const getServerSideProps = async (context: any) => {
    try {
        const id: string = context.params.id as string;
        const shoppingList: ShoppingList = await getShoppingListById(id);

        const allProducts: Product[] = await getAllProducts();
        return { props: { id, shoppingList, allProducts } };
    } catch (e: any) {
        console.log('There was an error: ' + e.message);
        return { props: { error: 'There was an error: ' + e.message}}
    }
};
export default function ShoppingLists(props: ShoppingListProps) {
    const onSubmit = (formData: ShoppingList) => {
        try {
            updateShoppingListById(props.id, formData);
            alert("Updated Shopping List");
        } catch (e: any) {
            console.log('There was an error: ' + e.message);
            return { props: { error: 'There was an error: ' + e.message}}
        }
    }

    return (
        <MainLayout>
            <h1>Edit Shopping List</h1>
            <nav>
                <Link href={`/shopping-lists/${props.id}`}>Go Back</Link>
            </nav>
            <div>
                <UpdateShoppingListForm
                    shoppingList={props.shoppingList}
                    submitCallback={onSubmit}
                    allProducts={props.allProducts}
                />
            </div>

        </MainLayout>
    )
}