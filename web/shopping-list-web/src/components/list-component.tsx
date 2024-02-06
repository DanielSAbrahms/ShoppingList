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
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {props.shoppingList?.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {props.shoppingList?.date}
                    </p>
                    {!props.showDetails ? (
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            Product Count: {productCount}
                        </p>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className={"shopping-list-products-wrapper"}>
                <ul role="list" className="divide-y divide-gray-100">
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
                </ul>
            </div>
        </li>
    );
};

export default ShoppingListComponent;
