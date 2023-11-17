import Image from 'next/image'
import MainLayout from "@/layouts/main-layout";
import {ShoppingList} from "@/models/shopping-list-model";
import {getAllProducts, getAllShoppingLists, getShoppingListById} from "@/services/api-service";
import ShoppingListComponent from "@/components/list-component";
import React, {useState} from "react";
import ProductComponent from "@/components/product-component";
import {Product} from "@/models/product-model";
import {generateRandomId} from "@/utilities/utilities";

type NewShoppingListFormProps = {
    submitCallback: Function;
    error?: string;
    allProducts?: Product[];
}

export default function NewShoppingListForm(props: NewShoppingListFormProps) {
    const emptyList: Product[] = [];
    const [ formData,
        setFormData ] = useState( {
        name: "",
        date: "",
        products: emptyList
    })

    const verifyData = (formData: ShoppingList): boolean => {
        return true;
    }

    const handleSubmit = (e: any) => {
        console.log("Submit pressed");
        e.preventDefault();
        if (!verifyData(formData)) return;
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
            formData.products?.push(newProduct);

            setFormData(prevState => ({
                ...prevState,
                products: formData.products
            }));
        } else {
            throw new Error("Can't find product by that ID");
        }
    }

    const handleRemoveProduct = (id: string) => {
        formData.products = formData.products?.filter(x => x.id !== id);

        setFormData(prevState => ({
            ...prevState,
            products: formData.products
        }));
    }

    return (
        <div>
            {!props.error ? (
                <form onSubmit={handleSubmit}>
                    <button type="submit">Save Changes</button>
                    <div>
                        <input id="ListNameInput"
                               type="text" name="name"
                               value={formData.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input id="ListDateInput"
                               type="text" name="date"
                               value={formData.date}
                               onChange={handleChange}
                        />
                    </div>
                    <h3>Products </h3>
                    { formData.products ? formData.products.map(product => (
                        <ProductComponent
                            key={generateRandomId()}
                            product={product}
                            isEditing={true}
                            isPartOfList={true}
                            addProductCallback={() => handleAddProduct}
                            removeProductCallback={handleRemoveProduct}
                        />
                    )) :  <></> }
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

