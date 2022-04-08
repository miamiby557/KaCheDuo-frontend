import {createAction, createThunkAction} from "../../lib/redux-utils";
import {postJson} from "../../lib/http";

export const hideShowPic = createAction("CHU_ZHI.HIDE_SHOW_PIC");
export const showPic = createAction("CHU_ZHI.SHOW_PIC");

export const query = createThunkAction("CHU_ZHI.QUERY", params =>
    postJson("/fx/query", params)
);

