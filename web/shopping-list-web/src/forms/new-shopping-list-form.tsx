import Image from 'next/image'
import MainLayout from "@/layouts/main-layout";
import {NewShoppingList, ShoppingList} from "@/models/shopping-list-model";
import {getAllProducts, getAllShoppingLists, getShoppingListById} from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";
import React, {useState} from "react";
import ProductComponent from "@/components/product-component";
import {Product} from "@/models/product-model";
import {generateRandomId} from "@/utilities/utilities";
import store from '@/stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { newListReducerProps } from '@/reducers/new-list-reducer';

type NewShoppingListFormProps = {
    submitCallback: Function;
    error?: string;
    // allProducts?: Product[];
    // productsNotInList?: Product[];
}

export default function NewShoppingListForm(props: NewShoppingListFormProps) {

    const dispatch = useDispatch();
    const listNameFormData = useSelector((state: newListReducerProps) => state.newShoppingList.name);
    const listDateFormData = useSelector((state: newListReducerProps) => state.newShoppingList.date);
    const listProductsFormData = useSelector((state: newListReducerProps) => state.newShoppingList.products);

    const verifyData = (formData: NewShoppingList): boolean => {
        return (formData.name !== null && formData.date !== null
            && formData.date !== "xxxx-xx-xx");
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const newFormData = store.getState();
        if (!verifyData(newFormData)) throw new Error("Could not verify data");
        props.submitCallback(newFormData);
    }

    const handleNameChange = (e: any) => {
        dispatch({type: 'changeName', payload: e.target.value});
    }

    const handleDateChange = (e: any) => {
        dispatch({type: 'changeDate', payload: e.target.value});
    }

    // Should handle adding product or incrementing count
    const handleAddProduct = (id: string) => {
        console.log("handleAddProduct");
        const newProduct = props.allProducts?.find(p => p.id === id);

        if (newProduct) {
            dispatch({type: 'addProduct', payload: newProduct });
            props.productsNotInList = props.allProducts?.filter(p => p.id !== newProduct.id);
        } else {
            throw new Error("Can't find product by that ID");
        }
    }

    // Should handle removing product or decrementing count
    const handleRemoveProduct = (id: string) => {
        const productToRemove = listProductsFormData.find(p => p.product.id === id);

        if (productToRemove) {
            dispatch({type: 'removeProduct', payload: productToRemove })
        } else {
            throw new Error("Can't find product by that Key");
        }
    }

    return (
        <div>
            {!props.error ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ListNameInput">Name: </label>
                        <input id="ListNameInput"
                               type="text" name="name"
                               value={listNameFormData}
                               onChange={handleNameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ListDateInput">Date: &nbsp;&nbsp;</label>
                        <input id="ListDateInput"
                               type="text" name="date"
                               value={listDateFormData}
                               onChange={handleDateChange}
                        />
                    </div>
                    <br/>
                    <button type="submit">Save Changes</button>
                    <br/>

                    <h3>Products </h3>
                    {/* Iterate over products in form state data */}
                    { listProductsFormData ? listProductsFormData.map(productInList => {

                        // Lookup details
                        // const listProduct: Product | undefined = props.allProducts?.find(x => x.id = product.id);

                        // if (!product.key) product.key = generateRandomId();

                        return productInList ? (
                            <ProductComponent
                                key={generateRandomId()}
                                product={productInList.product}
                                quantity={productInList.quantity}
                                isEditing={true}
                                // isPartOfList={true}
                                addProductCallback={handleAddProduct}
                                removeProductCallback={handleRemoveProduct}
                            />
                        ) : /* If Product is null */ <></>
                    }) : /* If listProductsFormData is null */ <></> }
                    <hr/>

                    <h3>Add Products </h3>
                    { props.allProducts ? props.allProducts.map(product => {

                        // if (!product.key) product.key = generateRandomId();

                        return product? ( 
                            <ProductComponent
                                key={generateRandomId()}
                                product={product}
                                quantity={0}
                                isEditing={true}
                                // isPartOfList={false}
                                addProductCallback={handleAddProduct}
                            />
                        ) : /* If Product is null */ <></>
                    }) : /* If props.allProducts is null */ <></> }

                </form>
            ) : (
                <p>Error: {props.error}</p>
            )}
        </div>
    )
}

