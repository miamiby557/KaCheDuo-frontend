import {combineReducers} from "redux";
import list from "./reducer-list";
import create from "./reducer-create";
import update from "./reducer-update";
import subRobot from "./reducer-sub-robot-list";

const reducer = combineReducers({
    list,
    create,
    update,
    subRobot
});

export default reducer;
