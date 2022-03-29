import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

export const showCreate = createAction("USER.SHOW_CREATE");
export const hideCreate = createAction("USER.HIDE_CREATE");

export const getById = createThunkAction('USER.GET', params =>
    get('/user/' + params)
);
export const query = createThunkAction("USER.QUERY", params =>
    postJson("/user/query", params)
);
export const modify = createThunkAction("USER.MODIFY", params =>
    postJson("/user/update", params)
);
export const create = createThunkAction("USER.CREATE", params =>
    postJson("/user/create", params)
);
export const del = createThunkAction("", params =>
    get("/user/delete/" + params)
);

