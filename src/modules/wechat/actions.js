import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get} from "../../lib/http";

export const showCreate = createAction("WECHAT.SHOW_CREATE");
export const hideCreate = createAction("WECHAT.HIDE_CREATE");

export const query = createThunkAction("WECHAT.QUERY", () =>
    get("/wechat/query")
);
export const create = createThunkAction("WECHAT.CREATE", params =>
    get("/wechat/create/" + params)
);
export const del = createThunkAction("", params =>
    get("/wechat/delete/" + params)
);
export const sync = createThunkAction("", params =>
    get("/wechat/sync/" + params)
);

