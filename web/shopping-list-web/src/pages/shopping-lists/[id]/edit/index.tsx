import { NewShoppingList, ShoppingList } from "@/models/shopping-list-model";
import {
    addShoppingList,
    getAllProducts,
    getShoppingListById,
    updateShoppingListById,
} from "@/services/api-service";
import Link from "next/link";
import React, { useEffect } from "react";
import { Product } from "@/models/product-model";
import NewShoppingListForm from "@/forms/new-shopping-list-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "@/layouts/app-layout";
import {
    clearCurrentList,
    setCurrentList,
    setCurrentListForEdit,
} from "@/actions/actions";
import UpdateShoppingListForm from "@/forms/update-shopping-list-form";
import { RootReducerProps } from "@/stores/store";

type EditShoppingListProps = {
    allProducts: Product[];
    error?: string;
    shoppingListLookup?: ShoppingList;
};

export const getServerSideProps = async (context: any) => {
    try {
        const allProducts: Product[] = await getAllProducts();
        const id: string = context.params.id as string;
        const shoppingListLookup: ShoppingList = await getShoppingListById(id);
        return { props: { allProducts, shoppingListLookup } };
    } catch (e: any) {
        console.error("There was an error: " + e.message);
        return { props: { error: "There was an error: " + e.message } };
    }
};

export default function EditShoppingList(props: EditShoppingListProps) {
    const router = useRouter();
    const dispatch = useDispatch();

    const shoppingListState = useSelector(
        (state: RootReducerProps) => state.currentListState.currentList
    );

    useEffect(() => {
        if (!shoppingListState && props.shoppingListLookup) {
            dispatch(setCurrentListForEdit(props.shoppingListLookup));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (formData: ShoppingList) => {
        try {
            updateShoppingListById(formData).then(() => {
                if (shoppingListState) {
                    dispatch(clearCurrentList());
                    router.replace(`/shopping-lists/${shoppingListState.id}`);
                } else {
                    router.replace(`/`);
                }
            });
        } catch (e: any) {
            console.error("There was an error: " + e.message);
            return { props: { error: "There was an error: " + e.message } };
        }
    };

    return (
        <AppLayout>
            <br />
            <h1>Edit Shopping List</h1>
            {!props.error && shoppingListState ? (
                <div>
                    <UpdateShoppingListForm
                        submitCallback={onSubmit}
                        shoppingList={shoppingListState}
                        allProducts={props.allProducts}
                    />
                </div>
            ) : (
                <p>Error: {props.error}</p>
            )}
        </AppLayout>
    );
}
