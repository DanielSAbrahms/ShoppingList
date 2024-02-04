import { ShoppingList } from "@/models/shopping-list-model";
import {
    deleteShoppingListById,
    getShoppingListById,
} from "@/services/api-service";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "@/layouts/app-layout";
import { setCurrentList, setCurrentListForEdit } from "@/actions/actions";
import { RootReducerProps } from "@/stores/store";
import ShoppingListComponent from "@/components/list-component";
import { generateRandomId } from "@/utilities/utilities";

type DeleteShoppingListProps = {
    error?: string;
    shoppingListLookup?: ShoppingList;
};

export const getServerSideProps = async (context: any) => {
    try {
        const id: string = context.params.id as string;
        const shoppingListLookup: ShoppingList = await getShoppingListById(id);
        return { props: { shoppingListLookup } };
    } catch (e: any) {
        console.error("There was an error: " + e.message);
        return { props: { error: "There was an error: " + e.message } };
    }
};

export default function DeleteShoppingList(props: DeleteShoppingListProps) {
    const router = useRouter();
    const dispatch = useDispatch();

    const shoppingListState = useSelector(
        (state: RootReducerProps) => state.currentListState.currentList
    );

    useEffect(() => {
        if (!shoppingListState && props.shoppingListLookup) {
            dispatch(setCurrentList(props.shoppingListLookup));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tryDelete = () => {
        try {
            if (shoppingListState) {
                deleteShoppingListById(shoppingListState.id).then(() => {
                    router.replace(`/`);
                });
            } else {
                console.error("Could not delete list");
                return { props: { error: "Could not delete list" } };
            }
        } catch (e: any) {
            console.error("There was an error: " + e.message);
            return { props: { error: "There was an error: " + e.message } };
        }
    };

    return (
        <AppLayout>
            <br />
            <h3>Are you sure you want to delete? </h3>
            {!props.error && shoppingListState ? (
                <div>
                    <button type="button" onClick={() => tryDelete()}>
                        Confirm Delete
                    </button>
                    <ShoppingListComponent
                        key={generateRandomId()}
                        shoppingList={shoppingListState}
                        showDetails={false}
                    />
                </div>
            ) : (
                <p>Error: {props.error}</p>
            )}
        </AppLayout>
    );
}
