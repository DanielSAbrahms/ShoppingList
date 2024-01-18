import Image from 'next/image'
import MainLayout from "@/layouts/main-layout";
import {ShoppingList} from "@/models/shopping-list-model";
import {getAllShoppingLists, getShoppingListById} from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";
import Link from "next/link";
import React from "react";
import UpdateShoppingListForm from "@/forms/update-shopping-list-form";
import ProductComponent from "@/components/product-component";
import {generateRandomId} from "@/utilities/utilities";

type ShoppingListDetailsProps = {
    id: string;
    shoppingList: ShoppingList;
    error?: string;
}

export const getServerSideProps = async (context: any) => {
    try {
        const id: string = context.params.id as string;
        const shoppingList: ShoppingList = await getShoppingListById(id);
        return { props: { id, shoppingList } };
    } catch (e: any) {
        console.log('There was an error: ' + e.message);
        return { props: { error: 'There was an error: ' + e.message}}
    }
};

export default function ShoppingListDetails(props: ShoppingListDetailsProps) {
    return (
        <MainLayout>
            <h1>Shopping List</h1>
            <nav>
                <Link href={`/shopping-lists/${props.id}/edit`}>Edit List</Link>
            </nav>
            <div>
                {!props.error  ? (
                    <ShoppingListComponent
                        key={generateRandomId()}
                        shoppingList={props.shoppingList}
                        showDetails={true}
                    />
                ) : (
                    <p>Error: {props.error}</p>
                )}
            </div>

        </MainLayout>
    )
}