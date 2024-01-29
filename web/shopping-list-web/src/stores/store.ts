import newListReducer from "@/reducers/new-list-reducer";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: newListReducer
});

export default store;