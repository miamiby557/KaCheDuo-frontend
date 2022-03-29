import {createThunkAction} from "../../lib/redux-utils";
import {postJson} from "../../lib/http";

export const query = createThunkAction("ROBOT_TASK.QUERY", params =>
    postJson("/task/query", params)
);

