import {createThunkAction} from "../../lib/redux-utils";
import {postJson} from "../../lib/http";

export const query = createThunkAction("SCREEN_SHOT_TASK_RUNNING.QUERY", params =>
    postJson("/screenShot/queryRunningTask", params)
);

