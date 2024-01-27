import MainLayout from "@/layouts/main-layout";
import {ShoppingList} from "@/models/shopping-list-model";
import {addShoppingList, getAllProducts} from "@/services/api-service";
import Link from "next/link";
import React from "react";
import {Product} from "@/models/product-model";
import NewShoppingListForm from "@/forms/new-shopping-list-form";
import {useRouter} from "next/router";
import { generateRandomId } from '@/utilities/utilities';

type AddShoppingListProps = {
    allProducts?: Product[];
}

export const getServerSideProps = async () => {
    try {
        const allProducts: Product[] = await getAllProducts();
        allProducts.map(p => p.key = generateRandomId());

        return { props: { allProducts } };
    } catch (e: any) {
        console.error('There was an error: ' + e.message);
        return { props: { error: 'There was an error: ' + e.message}}
    }
};
export default function AddShoppingList(props: AddShoppingListProps) {

    const router = useRouter();
    const onSubmit = (formData: ShoppingList) => {
        try {
            addShoppingList(formData).then((id: string) => {
                console.log("Added Shopping List" + formData.toString());
                router.replace(`/shopping-lists/${id}`)
                return id;
            });
        } catch (e: any) {
            console.error('There was an error: ' + e.message);
            return { props: { error: 'There was an error: ' + e.message}}
        }
    }

    return (
        <MainLayout>
            <br/>
            <nav>
                <Link href={`/`}>Back to All Lists</Link>
            </nav>
            <h1>Add Shopping List</h1>
            <div>
                <NewShoppingListForm
                    submitCallback={onSubmit}
                    allProducts={props.allProducts}
                />
            </div>

        </MainLayout>
    )
}