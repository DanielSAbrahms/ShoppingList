import Image from 'next/image'
import MainLayout from "@/layouts/main-layout";
import {NewShoppingList, ShoppingList} from "@/models/shopping-list-model";
import {getAllProducts, getAllShoppingLists, getShoppingListById} from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";
import React, {useState} from "react";
import ProductComponent from "@/components/product-component";
import {Product} from "@/models/product-model";
import {generateRandomId} from "@/utilities/utilities";

type UpdateShoppingListFormProps = {
    shoppingList: ShoppingList;
    submitCallback: Function;
    error?: string;
    allProducts?: Product[];
}

export default function UpdateShoppingListForm(props: UpdateShoppingListFormProps) {
    const [ formData,
        setFormData ] = useState( {
            name: props.shoppingList.name,
            date: props.shoppingList.date,
            products: props.shoppingList.products
    })

    const verifyData = (formData: NewShoppingList): boolean => {
        return (formData.name !== null && formData.date !== null);
    }

    const handleSubmit = (e: any) => {
        console.log("Submit pressed");
        e.preventDefault();
        if (!verifyData(formData)) throw new Error("Could not verify data");
        props.submitCallback(formData);
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleAddProduct = (id: string) => {
        const newProduct = props.allProducts?.find(x => x.id === id);

        if (newProduct) {
            formData.products?.push(newProduct.id);

            setFormData(prevState => ({
                ...prevState,
                products: formData.products
            }));
        } else {
            throw new Error("Can't find product by that ID");
        }
    }

    const handleRemoveProduct = (id: string) => {
        formData.products = formData.products?.filter(x => x !== id);

        setFormData(prevState => ({
            ...prevState,
            products: formData.products
        }));
    }

    return (
        <div>
            {!props.error ? (
                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="ListNameInput">Name: </label>
                        <input id="ListNameInput"
                               type="text" name="name"
                               value={formData.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ListDateInput">Date: &nbsp;&nbsp;</label>
                        <input id="ListDateInput"
                               type="text" name="date"
                               value={formData.date}
                               onChange={handleChange}
                        />
                    </div>
                    <br/>
                    <button type="submit">Save Changes</button>
                    <br/>
                    <h3>Products </h3>
                    { formData.products ? formData.products.map(productId => {
                        const foundProduct: Product | undefined = props.allProducts?.find(x => x.id = productId);

                        return foundProduct ? (
                            <ProductComponent
                                key={generateRandomId()}
                                product={foundProduct}
                                isEditing={true}
                                isPartOfList={true}
                                addProductCallback={() => handleAddProduct}
                                removeProductCallback={handleRemoveProduct}
                            />
                        ) :  <></>
                    }) :  <></> }
                    <hr/>
                    <h3>Add Products </h3>
                    { props.allProducts ? props.allProducts.map(product => (
                        <ProductComponent
                            key={generateRandomId()}
                            product={product}
                            isEditing={true}
                            isPartOfList={false}
                            addProductCallback={handleAddProduct}
                            removeProductCallback={handleRemoveProduct}
                        />
                    )) :  <></> }

                </form>
            ) : (
                <p>Error: {props.error}</p>
            )}
        </div>
    )
}

