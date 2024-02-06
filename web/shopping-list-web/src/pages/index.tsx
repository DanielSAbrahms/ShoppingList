import { ShoppingList } from "@/models/shopping-list-model";
import { getAllShoppingLists } from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";
import { generateRandomId } from "@/utilities/utilities";
import Link from "next/link";
import React, { useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import { useDispatch } from "react-redux";

type HomePageProps = {
    error?: string;
};

export default function HomePage(props: HomePageProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "clearCurrentList" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppLayout>
            <h1>Welcome</h1>
        </AppLayout>
    );
}
