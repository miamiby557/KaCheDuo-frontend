import {createThunkAction} from "../../lib/redux-utils";
import {postJson} from "../../lib/http";

export const query = createThunkAction("ROBOT_LOG.QUERY", params =>
    postJson("/log/query", params)
);

