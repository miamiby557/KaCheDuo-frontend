import {createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

export const query = createThunkAction("ROBOT_TASK.QUERY", params =>
    postJson("/task/query", params)
);

export const handleAgain = createThunkAction("ROBOT_TASK.HANDLE_AGAIN", params =>
    get("/task/reRunHistoryTask/" + params)
);

