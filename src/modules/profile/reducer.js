import {combineReducers} from "redux";
import tab from "./reducer-tab";
import modify from "./reducer-modify";
import account from "./reducer-account";

const reducer = combineReducers({
    tab,
    modify,
    account,
});

export default reducer;
