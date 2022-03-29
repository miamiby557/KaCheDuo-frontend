import {createThunkAction} from "../../lib/redux-utils";
import {get} from "../../lib/http";

const path = "/home";
const ACTION_PREFIX = "DASHBOARD.";

export const querySelf = createThunkAction(ACTION_PREFIX + "DASHBOARD", (params) =>
    get(path + "/querySelf/"+ params)
);
export const queryByAdmin = createThunkAction(ACTION_PREFIX + "DASHBOARD", () =>
    get(path + "/queryByAdmin")
);





