import Image from 'next/image'
import MainLayout from "@/layouts/main-layout";
import {ShoppingList} from "@/models/shopping-list-model";
import {getAllShoppingLists} from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";
import {generateRandomId} from "@/utilities/utilities";
import Link from "next/link";
import React from "react";

type AllShoppingListsProps = {
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

export default function AllShoppingLists(props: AllShoppingListsProps) {
  return (
      <MainLayout>
        <h1>All Shopping Lists</h1>
          <nav>
              <Link href={`/shopping-lists/add`}>Add Shopping List</Link>
          </nav>
        <div>
          {!props.error ? (
              props.shoppingLists.map(list => (
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
      </MainLayout>
  )
}