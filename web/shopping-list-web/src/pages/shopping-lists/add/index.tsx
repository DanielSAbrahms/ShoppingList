import Image from 'next/image'
import MainLayout from "@/layouts/main-layout";
import {ShoppingList} from "@/models/shopping-list-model";
import {addShoppingList, getAllProducts, getShoppingListById, updateShoppingListById} from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";
import Link from "next/link";
import React, {useContext} from "react";
import UpdateShoppingListForm from "@/forms/update-shopping-list-form";
import {Product} from "@/models/product-model";
import NewShoppingListForm from "@/forms/new-shopping-list-form";

type AddShoppingListProps = {
    allProducts?: Product[];
}


export const getServerSideProps = async () => {
    try {
        const allProducts: Product[] = await getAllProducts();
        return { props: { allProducts } };
    } catch (e: any) {
        console.log('There was an error: ' + e.message);
        return { props: { error: 'There was an error: ' + e.message}}
    }
};
export default function AddShoppingList(props: AddShoppingListProps) {
    const onSubmit = (formData: ShoppingList) => {
        try {
            addShoppingList(formData);
            alert("Added Shopping List");
        } catch (e: any) {
            console.log('There was an error: ' + e.message);
            return { props: { error: 'There was an error: ' + e.message}}
        }
    }

    return (
        <MainLayout>
            <h1>Add Shopping List</h1>
            <nav>
                <Link href={`/shopping-lists}`}>Go Back</Link>
            </nav>
            <div>
                <NewShoppingListForm
                    submitCallback={onSubmit}
                    allProducts={props.allProducts}
                />
            </div>

        </MainLayout>
    )
}