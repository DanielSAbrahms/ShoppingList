import { ShoppingList } from "@/models/shopping-list-model";
import { getAllShoppingLists } from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";
import { generateRandomId } from "@/utilities/utilities";
import Link from "next/link";
import React, { useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import { useDispatch } from "react-redux";

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

    useEffect(() => {
        dispatch({ type: "clearCurrentList" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppLayout>
            <h1>All Shopping Lists</h1>
            <nav>
                <Link href={`/shopping-lists/add`}>Add Shopping List</Link>
            </nav>
            <div>
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
            </div>
        </AppLayout>
    );
}
