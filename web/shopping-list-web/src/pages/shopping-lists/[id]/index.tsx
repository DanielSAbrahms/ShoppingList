import { ShoppingList } from "@/models/shopping-list-model";
import { getShoppingListById } from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";
import Link from "next/link";
import React, { useEffect } from "react";
import { generateRandomId } from "@/utilities/utilities";
import AppLayout from "@/layouts/app-layout";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerProps } from "@/stores/store";
import { setCurrentList } from "@/actions/actions";
import { useRouter } from "next/router";

type ShoppingListDetailsProps = {
    error?: string;
    shoppingListLookup?: ShoppingList;
};

export const getServerSideProps = async (context: any) => {
    try {
        const id: string = context.params.id as string;
        const shoppingListLookup: ShoppingList = await getShoppingListById(id);
        return { props: { shoppingListLookup } };
    } catch (e: any) {
        console.log("There was an error: " + e.message);
        return { props: { error: "There was an error: " + e.message } };
    }
};

export default function ShoppingListDetails(props: ShoppingListDetailsProps) {
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

    return (
        <AppLayout>
            <h1>Shopping List</h1>
            <nav>
                {shoppingListState ? (
                    <Link href={`/shopping-lists/${shoppingListState.id}/edit`}>
                        Edit List
                    </Link>
                ) : (
                    <></>
                )}
            </nav>
            <div>
                {!props.error && shoppingListState ? (
                    <ShoppingListComponent
                        key={generateRandomId()}
                        shoppingList={shoppingListState}
                        showDetails={true}
                    />
                ) : (
                    <p>Error: {props.error}</p>
                )}
            </div>
        </AppLayout>
    );
}
