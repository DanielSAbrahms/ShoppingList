import { ShoppingList } from "@/models/shopping-list-model";
import { getAllShoppingLists } from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";
import { generateRandomId } from "@/utilities/utilities";
import Link from "next/link";
import React, { useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

type AllShoppingListsProps = {
    shoppingLists: ShoppingList[];
    error?: string;
};

export async function getServerSideProps() {
    try {
        const shoppingLists: ShoppingList[] = await getAllShoppingLists();
        return { props: { shoppingLists } };
    } catch (e: any) {
        console.error(e.message);
        return { props: { error: e.message } };
    }
}

export default function AllShoppingLists(props: AllShoppingListsProps) {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch({ type: "clearCurrentList" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navToAddList = () => {
        router.replace("/shopping-lists/add");
    };

    return (
        <AppLayout>
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Shopping Lists
                </h1>
            </div>
            <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => navToAddList()}
            >
                Add Shopping List
            </button>
            <div>
                <ul role="list" className="divide-y divide-gray-100">
                    {!props.error ? (
                        props.shoppingLists.map((list) => (
                            <ShoppingListComponent
                                key={generateRandomId()}
                                shoppingList={list}
                                showDetails={false}
                            />
                        ))
                    ) : (
                        <p>Error: {props.error}</p>
                    )}
                </ul>
            </div>
        </AppLayout>
    );
}
