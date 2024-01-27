import newFormReducer from "@/reducers/new-form-reducer";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: newFormReducer
});

export default store;