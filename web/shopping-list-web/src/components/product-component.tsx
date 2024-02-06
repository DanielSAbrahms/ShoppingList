import React from "react";
import Link from "next/link";
import { Product } from "@/models/product-model";

type ProductComponentProps = {
    product: Product;
    quantity?: number;
    isEditing?: boolean;
    // isPartOfList?: boolean;
    addProductCallback?: Function;
    removeProductCallback?: Function;
};

const ProductComponent: (props: ProductComponentProps) => React.JSX.Element = (
    props: ProductComponentProps
) => {
    const addProduct = (id: string) => {
        if (props.addProductCallback) {
            props.addProductCallback(id);
        }
    };

    const removeProduct = (id: string) => {
        if (props.removeProductCallback) {
            props.removeProductCallback(id);
        }
    };

    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {props.product.brandName}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {props.product.productName}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        ${props.product.price}
                    </p>
                </div>
            </div>
            <div>
                {props.isEditing ? (
                    <span>
                        <button
                            type="button"
                            onClick={() => removeProduct(props.product.id)}
                            disabled={
                                props.quantity === undefined ||
                                props.quantity < 1
                            }
                        >
                            {" "}
                            -{" "}
                        </button>{" "}
                        Quantity: {props.quantity}
                        <button
                            type="button"
                            onClick={() => addProduct(props.product.id)}
                        >
                            {" "}
                            +{" "}
                        </button>
                    </span>
                ) : (
                    <h3>Quantity: {props.quantity}</h3>
                )}
            </div>
        </li>
    );
};

export default ProductComponent;
