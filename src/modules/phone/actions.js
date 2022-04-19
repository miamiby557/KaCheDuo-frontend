import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get} from "../../lib/http";

export const showCreate = createAction("PHONE.SHOW_CREATE");
export const hideCreate = createAction("PHONE.HIDE_CREATE");

export const query = createThunkAction("PHONE.QUERY", params =>
    get("/phone/query")
);
export const create = createThunkAction("PHONE.CREATE", params =>
    get("/phone/create/" + params)
);
export const del = createThunkAction("", params =>
    get("/phone/delete/" + params)
);

