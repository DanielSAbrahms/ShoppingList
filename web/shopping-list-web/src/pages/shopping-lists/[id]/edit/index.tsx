// import Image from 'next/image'
// import MainLayout from "@/layouts/main-layout";
// import {ShoppingList} from "@/models/shopping-list-model";
// import {
//     addShoppingList,
//     deleteShoppingListById,
//     getAllProducts,
//     getShoppingListById,
//     updateShoppingListById
// } from "@/services/api-service";
// import ShoppingListComponent from "@/components/list-component";
// import Link from "next/link";
// import React, {useContext} from "react";
// import UpdateShoppingListForm from "@/forms/update-shopping-list-form";
// import {Product} from "@/models/product-model";
// import {useRouter} from "next/router";

// type EditShoppingListProps = {
//     id: string;
//     shoppingList: ShoppingList;
//     allProducts?: Product[];
// }


// export const getServerSideProps = async (context: any) => {
//     try {
//         const id: string = context.params.id as string;
//         const shoppingList: ShoppingList = await getShoppingListById(id);

//         const allProducts: Product[] = await getAllProducts();
//         return { props: { id, shoppingList, allProducts } };
//     } catch (e: any) {
//         console.log('There was an error: ' + e.message);
//         return { props: { error: 'There was an error: ' + e.message}}
//     }
// };
// export default function EditShoppingList(props: EditShoppingListProps) {

//     const router = useRouter();
//     const onSubmit = (formData: ShoppingList) => {
//         try {
//             updateShoppingListById(props.id, formData).then((id: string) => {
//                 console.log("Updated Shopping List");
//                 router.replace(`/shopping-lists/${props.id}`);
//                 return id;
//             });
//         } catch (e: any) {
//             console.error('There was an error: ' + e.message);
//             return { props: { error: 'There was an error: ' + e.message}}
//         }
//     }

//     const onDelete = () => {
//         try {
//             deleteShoppingListById(props.id).then((id: string) => {
//                 console.log("Deleted Shopping List");
//                 router.replace(`/`);
//                 return id;
//             });
//         } catch (e: any) {
//             console.error('There was an error: ' + e.message);
//             return { props: { error: 'There was an error: ' + e.message}}
//         }
//     }

//     return (
//         <MainLayout>
//             <br/>
//             <nav>
//                 <Link href={`/shopping-lists/${props.id}`}>Back to List Details</Link>
//             </nav>
//             <h1>Edit Shopping List</h1>
//             <hr/>
//             <button onClick={onDelete} type="button">Delete List</button>
//             <hr/>

//             <div>
//                 <UpdateShoppingListForm
//                     shoppingList={props.shoppingList}
//                     submitCallback={onSubmit}
//                     allProducts={props.allProducts}
//                 />
//             </div>

//         </MainLayout>
//     )
// }