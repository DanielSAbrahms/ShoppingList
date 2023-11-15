import Image from 'next/image'
import MainLayout from "@/layouts/main-layout";
import {ShoppingList} from "@/models/shopping-list-model";
import {getShoppingListById} from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";

type ShoppingListProps = {
    shoppingList: ShoppingList;
    error?: string;
}

export const getServerSideProps = async (context: any) => {
    try {
        const id: string = context.params.id as string;
        const shoppingList: ShoppingList = await getShoppingListById(id);
        return { props: { shoppingList } };
    } catch (e: any) {
        console.log('There was an error: ' + e.message);
        return { props: { error: 'There was an error: ' + e.message}}
    }
};

export default function ShoppingLists(props: ShoppingListProps) {
    return (
        <MainLayout>
            <h1>Shopping Lists</h1>
            <div>
                {props.error ? (
                    <p>Error: {props.error}</p>
                ) : (
                    <ShoppingListComponent
                        shoppingList={props.shoppingList}
                        showDetails={true}
                    />
                )}
            </div>
        </MainLayout>
    )
}
