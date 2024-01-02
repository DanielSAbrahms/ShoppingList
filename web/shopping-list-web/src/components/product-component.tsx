import React from "react";
import Link from "next/link";
import {Product} from "@/models/product-model";

type ProductComponentProps = {
    key: number;
    product: Product;

    isEditing?: boolean;
    isPartOfList?: boolean;

    addProductCallback?: Function;
    removeProductCallback?: Function;
}

const ProductComponent: (props: ProductComponentProps)
        => React.JSX.Element = ({
        product: {brandName, id, price, productName},
        isEditing, isPartOfList,
        addProductCallback, removeProductCallback}: ProductComponentProps) =>
    {

    const addProduct = (id: string) => {
        if (addProductCallback) { addProductCallback(id); }
    }

    const removeProduct = (id: string) => {
        if (removeProductCallback) { removeProductCallback(id); }
    }

    return (
        <div className={"product-component-wrapper"}
            style={{
                border: '2px dotted black',
                padding: '8px', margin: '8px',
                borderRadius: '8px'
            }}>
            <h3>Brand: { brandName }</h3>
            <h3>Product: { productName }</h3>
            <h3>Price: ${ price }</h3>
            <div>
                { isEditing && addProductCallback && removeProductCallback ? (
                    <div>
                        {!isPartOfList ?
                            (<button onClick={() => addProduct(id)}> Add </button>)
                            :
                            (<button onClick={() => removeProduct(id)}> Remove </button>)
                        }
                    </div>
                ) : (<></>) }
            </div>
        </div>
    );
};

export default ProductComponent;