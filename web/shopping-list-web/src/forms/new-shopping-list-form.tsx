import { NewShoppingList } from "@/models/shopping-list-model";
import React, { useEffect } from "react";
import ProductComponent from "@/components/product-component";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/models/product-model";
import { RootReducerProps } from "@/stores/store";
import {
    addProduct,
    changeDate,
    changeName,
    clearError,
    removeProduct,
    setError,
    setupAllProducts,
} from "@/actions/actions";

type NewShoppingListFormProps = {
    submitCallback: Function;
    allProducts: Product[];
};

export default function NewShoppingListForm(props: NewShoppingListFormProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setupAllProducts(props.allProducts));
        dispatch({ type: "clearCurrentList" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { newListState, productsNotInListState, errorState } = useSelector(
        (state: RootReducerProps) => ({
            newListState: state.newListState.newShoppingList,
            productsNotInListState: state.newListState.productsNotInList,
            errorState: state.newListState.error,
        })
    );

    const { newListNameState, newListDateState, newListProductsState } = {
        newListNameState: newListState.name,
        newListDateState: newListState.date,
        newListProductsState: newListState.products,
    };

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
        if (!verifyData(newFormData)) {
            dispatch(setError("Data is bad"));
            return;
        } else {
            dispatch(clearError());
            props.submitCallback(newFormData);
        }
    };

    return (
        <div>
            {!errorState ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ListNameInput">Name: </label>
                        <input
                            id="ListNameInput"
                            type="text"
                            name="name"
                            value={newListNameState}
                            onChange={(e) =>
                                dispatch(changeName(e.target.value))
                            }
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
                            onChange={(e) =>
                                dispatch(changeDate(e.target.value))
                            }
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
                                addProductCallback={(id: string) =>
                                    dispatch(addProduct(id))
                                }
                                removeProductCallback={(id: string) =>
                                    dispatch(removeProduct(id))
                                }
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
                                    addProductCallback={(id: string) =>
                                        dispatch(addProduct(id))
                                    }
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
                <p>Error: {errorState}</p>
            )}
        </div>
    );
}
