import currentListReducer, {
    CurrentListReducerProps,
} from "@/reducers/current-list-reducer";
import editListReducer, {
    EditListReducerProps,
} from "@/reducers/edit-list-reducer";
import newListReducer, {
    NewListReducerProps,
} from "@/reducers/new-list-reducer";
import { configureStore } from "@reduxjs/toolkit";

export type RootReducerProps = {
    newListState: NewListReducerProps;
    editListState: EditListReducerProps;
    currentListState: CurrentListReducerProps;
};

const store = configureStore({
    reducer: {
        editListState: editListReducer,
        newListState: newListReducer,
        currentListState: currentListReducer,
    },
});

export default store;
