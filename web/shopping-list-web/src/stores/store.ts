import currentListReducer, {
    CurrentListReducerProps,
} from "@/reducers/current-list-reducer";
import newListReducer, {
    NewListReducerProps,
} from "@/reducers/new-list-reducer";
import { configureStore } from "@reduxjs/toolkit";

export type RootReducerProps = {
    newListState: NewListReducerProps;
    currentListState: CurrentListReducerProps;
};

const store = configureStore({
    reducer: {
        newListState: newListReducer,
        currentListState: currentListReducer,
    },
});

export default store;
