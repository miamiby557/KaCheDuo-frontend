import {createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

export const query = createThunkAction("ROBOT_TASK_RUNNING.QUERY", params =>
    postJson("/task/query", params)
);
export const reRun = createThunkAction('ROBOT_TASK_RUNNING.RE_RUN', params =>
    get('/task/reRun/' + params)
);

