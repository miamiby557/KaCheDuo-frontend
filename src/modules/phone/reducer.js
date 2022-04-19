import {combineReducers} from "redux";
import list from "./reducer-list";
import create from "./reducer-create";

const reducer = combineReducers({
    list,
    create
});

export default reducer;
