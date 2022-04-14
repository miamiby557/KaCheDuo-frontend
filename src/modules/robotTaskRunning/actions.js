import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

export const hideShowPic = createAction("TASK.HIDE_SHOW_PIC");
export const showPic = createAction("TASK.SHOW_PIC");

export const query = createThunkAction("ROBOT_TASK_RUNNING.QUERY", params =>
    postJson("/task/queryRunningTask", params)
);
export const reRun = createThunkAction('ROBOT_TASK_RUNNING.RE_RUN', params =>
    get('/task/reRun/' + params)
);

