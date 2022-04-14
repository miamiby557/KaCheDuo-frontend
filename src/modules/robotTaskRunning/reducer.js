import {combineReducers} from "redux";
import list from "./reducer-list";
import pic from "./reducer-pic";

const reducer = combineReducers({
    list,
    pic
});

export default reducer;
