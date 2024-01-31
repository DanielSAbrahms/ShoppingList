import { ShoppingList } from "@/models/shopping-list-model";
import { Reducer } from "redux";

export type CurrentListReducerProps = {
    currentList: ShoppingList | null;
};

const initialState: CurrentListReducerProps = {
    currentList: null,
};

const currentListReducer: Reducer<CurrentListReducerProps> = (
    state = initialState,
    action: any
) => {
    switch (action.type) {
        default:
            return state;

        case "setCurrentList": {
            console.log("1 " + action.payload);
            return {
                ...state,
                currentList: action.payload,
            };
        }

        case "clearCurrentList": {
            return {
                ...state,
                currentList: null,
            };
        }
    }
};

export default currentListReducer;
