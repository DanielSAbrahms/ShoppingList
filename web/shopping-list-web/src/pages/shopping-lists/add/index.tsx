import { NewShoppingList } from "@/models/shopping-list-model";
import { addShoppingList, getAllProducts } from "@/services/api-service";
import Link from "next/link";
import React from "react";
import { Product } from "@/models/product-model";
import NewShoppingListForm from "@/forms/new-shopping-list-form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import AppLayout from "@/layouts/app-layout";

type AddShoppingListProps = {
    allProducts: Product[];
};

export const getServerSideProps = async () => {
    try {
        const allProducts: Product[] = await getAllProducts();
        return { props: { allProducts } };
    } catch (e: any) {
        console.error("There was an error: " + e.message);
        return { props: { error: "There was an error: " + e.message } };
    }
};
export default function AddShoppingList(props: AddShoppingListProps) {
    const router = useRouter();

    const onSubmit = (formData: NewShoppingList) => {
        try {
            addShoppingList(formData).then((id: string) => {
                router.replace(`/shopping-lists/${id}`);
                return id;
            });
        } catch (e: any) {
            console.error("There was an error: " + e.message);
            return { props: { error: "There was an error: " + e.message } };
        }
    };

    return (
        <AppLayout>
            <br />
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
        </AppLayout>
    );
}
