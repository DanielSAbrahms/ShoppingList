import { NewShoppingList } from "@/models/shopping-list-model";
import React, { useEffect } from "react";
import ProductComponent from "@/components/product-component";
import { generateRandomId } from "@/utilities/utilities";
import { useDispatch, useSelector } from "react-redux";
import { newListReducerProps } from "@/reducers/new-list-reducer";
import { Product } from "@/models/product-model";

type NewShoppingListFormProps = {
    submitCallback: Function;
    error?: string;
    allProducts: Product[];
};

export default function NewShoppingListForm(props: NewShoppingListFormProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "setupAllProducts", payload: props.allProducts });
    }, []);

    const newListState = useSelector(
        (state: newListReducerProps) => state.newShoppingList
    );

    const newListNameState = useSelector(
        (state: newListReducerProps) => state.newShoppingList.name
    );
    const newListDateState = useSelector(
        (state: newListReducerProps) => state.newShoppingList.date
    );
    const newListProductsState = useSelector(
        (state: newListReducerProps) => state.newShoppingList.products
    );

    const allProductsState = useSelector(
        (state: newListReducerProps) => state.allProducts
    );
    const productsNotInListState = useSelector(
        (state: newListReducerProps) => state.productsNotInList
    );

    const verifyData = (formData: NewShoppingList): boolean => {
        return (
            formData.name !== null &&
            formData.date !== null &&
            formData.date !== "xxxx-xx-xx"
        );
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const newFormData = newListState;
        if (!verifyData(newFormData)) throw new Error("Could not verify data");
        props.submitCallback(newFormData);
    };

    const handleNameChange = (e: any) => {
        dispatch({ type: "changeName", payload: e.target.value });
    };

    const handleDateChange = (e: any) => {
        dispatch({ type: "changeDate", payload: e.target.value });
    };

    // Should handle adding product or incrementing count
    const handleAddProduct = (id: string) => {
        dispatch({ type: "addProduct", payload: id });
    };

    // Should handle removing product or decrementing count
    const handleRemoveProduct = (id: string) => {
        dispatch({ type: "removeProduct", payload: id });
    };

    return (
        <div>
            {!props.error ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ListNameInput">Name: </label>
                        <input
                            id="ListNameInput"
                            type="text"
                            name="name"
                            value={newListNameState}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ListDateInput">
                            Date: &nbsp;&nbsp;
                        </label>
                        <input
                            id="ListDateInput"
                            type="text"
                            name="date"
                            value={newListDateState}
                            onChange={handleDateChange}
                        />
                    </div>
                    <br />
                    <button type="submit">Save Changes</button>
                    <br />

                    <h3>Products </h3>
                    {/* Iterate over products in form state data */}
                    {newListProductsState.map((productInList) => {
                        return (
                            <ProductComponent
                                key={`${productInList.product.id}-inlist`}
                                product={productInList.product}
                                quantity={productInList.quantity}
                                isEditing={true}
                                // isPartOfList={true}
                                addProductCallback={handleAddProduct}
                                removeProductCallback={handleRemoveProduct}
                            />
                        );
                    })}
                    <hr />

                    <h3>Add Products </h3>
                    {productsNotInListState ? (
                        productsNotInListState.map((product) => {
                            // if (!product.key) product.key = generateRandomId();

                            return product ? (
                                <ProductComponent
                                    key={`${product.id}-outlist`}
                                    product={product}
                                    quantity={0}
                                    isEditing={true}
                                    // isPartOfList={false}
                                    addProductCallback={handleAddProduct}
                                />
                            ) : (
                                /* If Product is null */ <></>
                            );
                        })
                    ) : (
                        <h3>No Available Products to Add</h3>
                    )}
                </form>
            ) : (
                <p>Error: {props.error}</p>
            )}
        </div>
    );
}
