import {createAction, createThunkAction} from "../../lib/redux-utils";
import {postJson, get} from "../../lib/http";

export const hideShowPic = createAction("SCREEN_SHOT_TASK.HIDE_SHOW_PIC");
export const showPic = createAction("SCREEN_SHOT_TASK.SHOW_PIC");

export const query = createThunkAction("SCREEN_SHOT_TASK.QUERY", params =>
    postJson("/screenShot/query", params)
);
export const handleScreenShotAgain = createThunkAction("SCREEN_SHOT_TASK.SHOT_AGAIN", params =>
    get("/screenShot/shotAgain/" + params)
);



