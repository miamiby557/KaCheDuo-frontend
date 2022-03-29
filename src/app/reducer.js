import {combineReducers} from "redux";

import home from "../modules/home/reducer.js";
import common from "../app/commonReducer.js";
import user from "../modules/user/reducer.js";
import profile from "../modules/profile/reducer.js";
import robot from "../modules/robot/reducer.js";
import driver from "../modules/driver/reducer.js";
import robotLog from "../modules/robotLog/reducer.js";
import robotTask from "../modules/robotTask/reducer.js";
import robotTaskRunning from "../modules/robotTaskRunning/reducer.js";
import chuZhi from "../modules/chuZhi/reducer.js";
import location from "../modules/location/reducer.js";

const rootReducer = combineReducers({
    home,
    common,
    user,
    profile,
    robot,
    driver,
    robotLog,
    robotTask,
    chuZhi,
    robotTaskRunning,
    location
});

export default rootReducer;
