import Image from 'next/image'
import MainLayout from "@/layouts/main-layout";
import {ShoppingList} from "@/models/shopping-list-model";
import {getAllShoppingLists} from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";

type ShoppingListProps = {
    shoppingLists: ShoppingList[];
    error?: string;
}

export async function getServerSideProps() {
    try {
        const shoppingLists: ShoppingList[] = await getAllShoppingLists();
        return { props: { shoppingLists } };
    } catch (e: any) {
        console.log('There was an error: ' + e.message);
        return { props: { error: 'There was an error: ' + e.message}}
    }
}

export default function ShoppingLists(props: ShoppingListProps) {
    return (
        <MainLayout>
            <h1>Shopping Lists</h1>
            <div>
                {props.error ? (
                    <p>Error: {props.error}</p>
                ) : (
                    props.shoppingLists.map(list => (
                        <ShoppingListComponent
                            shoppingList={list}
                            showDetails={false}
                        />
                    ))
                )}
            </div>
        </MainLayout>
    )
}
