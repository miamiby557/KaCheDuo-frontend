import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

export const getUser = createThunkAction("PROFILE.GET_USER", params =>
    get("/user/"+params)
);
export const modify = createThunkAction("PROFILE.MODIFY", params =>
    postJson("/user/update", params)
);

export const changePassword = createThunkAction("PROFILE.CHANGE_PASSWORD", params =>
    postJson("/user/modifyPassword", params)
);
export const changeTab = createAction("PROFILE.CHANGE_TAB");