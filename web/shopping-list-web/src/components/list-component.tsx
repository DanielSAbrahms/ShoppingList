import React from "react";
import {ShoppingList} from "@/models/shopping-list-model";
import Link from "next/link";
import ProductComponent from "@/components/product-component";
import {generateRandomId} from "@/utilities/utilities";
import { Product } from "@/models/product-model";

const ShoppingListComponent: (data: { shoppingList: ShoppingList, products?: Product[], showDetails: boolean })
    => React.JSX.Element = (data: { shoppingList: ShoppingList, products?: Product[], showDetails: boolean }) => {
    return (
        <div className={"shopping-list-component-wrapper"}
            style={{
                border: '3px solid black',
                padding: '8px', margin: '8px',
                borderRadius: '8px'
            }}>
            <h3>Name: { data.shoppingList.name }</h3>
            <h3>Date: { data.shoppingList.date }</h3>
            <div className={"shopping-list-products-wrapper"}>
                {
                    (data.showDetails && data.products) ?
                        data.products.map(product => (
                            <ProductComponent key={generateRandomId()} product={product}></ProductComponent>
                        ))
                    : <></>
                }
            </div>
            <nav>
                {data.showDetails ?
                    <></>
                :
                    <Link href={`/shopping-lists/${data.shoppingList.id}`}>List Details</Link>
                }
            </nav>
        </div>
    );
};

export default ShoppingListComponent;