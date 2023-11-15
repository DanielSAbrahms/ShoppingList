import React from "react";
import Link from "next/link";
import {Product} from "@/models/product-model";

const ProductComponent: (data: { product: Product })
    => React.JSX.Element = (data: { product: Product }) => {
    return (
        <div className={"product-component-wrapper"}
            style={{
                border: '2px dotted black',
                padding: '8px', margin: '8px',
                borderRadius: '8px'
            }}>
            <h3>Brand: { data.product.brandName }</h3>
            <h3>Product: { data.product.productName }</h3>
            <h3>Price: ${ data.product.price }</h3>
        </div>
    );
};

export default ProductComponent;