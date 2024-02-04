import React, { useEffect } from "react";
import { ShoppingList } from "@/models/shopping-list-model";
import Link from "next/link";
import ProductComponent from "@/components/product-component";
import { generateRandomId } from "@/utilities/utilities";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setCurrentList } from "@/actions/actions";
import { getShoppingListById } from "@/services/api-service";

type ShoppingListComponentProps = {
    shoppingList: ShoppingList;
    showDetails: boolean;
};

const ShoppingListComponent = (props: ShoppingListComponentProps) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const navigateToListDetails = () => {
        dispatch(setCurrentList(props.shoppingList));
        router.replace(`/shopping-lists/${props.shoppingList.id}`);
    };

    var productCount = 0;
    props.shoppingList?.products.map((product) => {
        productCount += product.quantity;
    });

    return (
        <div
            className={"shopping-list-component-wrapper"}
            style={{
                border: "3px solid black",
                padding: "8px",
                margin: "8px",
                borderRadius: "8px",
            }}
        >
            <h3>Name: {props.shoppingList?.name}</h3>
            <h3>Date: {props.shoppingList?.date}</h3>
            {!props.showDetails ? (
                <h3>Product Count: {productCount}</h3>
            ) : (
                <></>
            )}
            <div className={"shopping-list-products-wrapper"}>
                {props.showDetails ? (
                    props.shoppingList?.products.map((productInList) => (
                        <ProductComponent
                            key={generateRandomId()}
                            product={productInList.product}
                            quantity={productInList.quantity}
                        ></ProductComponent>
                    ))
                ) : (
                    <button
                        type="button"
                        onClick={() => navigateToListDetails()}
                    >
                        List Details
                    </button>
                )}
            </div>
        </div>
    );
};

export default ShoppingListComponent;
