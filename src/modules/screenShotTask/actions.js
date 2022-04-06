import {createAction, createThunkAction} from "../../lib/redux-utils";
import {postJson} from "../../lib/http";

export const hideShowPic = createAction("SCREEN_SHOT_TASK.HIDE_SHOW_PIC");
export const showPic = createAction("SCREEN_SHOT_TASK.SHOW_PIC");

export const query = createThunkAction("SCREEN_SHOT_TASK.QUERY", params =>
    postJson("/screenShot/query", params)
);

