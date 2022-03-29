import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postForm, postJson} from "../../lib/http";

export const showCreate = createAction("DRIVER.SHOW_CREATE");
export const hideCreate = createAction("DRIVER.HIDE_CREATE");

export const query = createThunkAction("DRIVER.QUERY", params =>
    postJson("/driver/query", params)
);
export const del = createThunkAction("", params =>
    get("/driver/delete/" + params)
);
export const importDriver = createThunkAction("DRIVER.IMPORT", params =>
    postForm("/driver/import/" + params.owner, params)
);

