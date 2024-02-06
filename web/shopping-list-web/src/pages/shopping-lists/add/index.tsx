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

    const navToAllLists = () => {
        router.replace("/shopping-lists");
    };

    return (
        <AppLayout>
            <br />
            <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => navToAllLists()}
            >
                Back to All Lists
            </button>
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
