import React from "react";
import Link from "next/link";
import {Product} from "@/models/product-model";

type ProductComponentProps = {
    key: number;
    product: Product;
    quantity?: number;
    isEditing?: boolean;
    isPartOfList?: boolean;
    addProductCallback?: Function;
    removeProductCallback?: Function;
}

const ProductComponent: (props: ProductComponentProps)
        => React.JSX.Element = (props: ProductComponentProps) =>
    {

    const addProduct = (id: string) => {
        if (props.addProductCallback) { props.addProductCallback(id); }
    }

    const removeProduct = (id: string) => {
        if (props.removeProductCallback) { props.removeProductCallback(id); }
    }

    return (
        <div className={"product-component-wrapper"}
            style={{
                border: '2px dotted black',
                padding: '8px', margin: '8px',
                borderRadius: '8px'
            }}>
            <h3>Brand: { props.product.brandName }</h3>
            <h3>Product: { props.product.productName }</h3>
            <h3>Price: ${ props.product.price }</h3>
            <div>
                { props.isEditing ? (
                    <div>
                        {!props.isPartOfList ?
                            (<button onClick={() => addProduct(props.product.id)}> Add </button>)
                            :
                            (<button onClick={() => removeProduct(props.product.id)}> Remove </button>)
                        }
                    </div>
                ) : (<></>) }
            </div>
        </div>
    );
};

export default ProductComponent;