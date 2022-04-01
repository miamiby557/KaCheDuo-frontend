import {createThunkAction} from "../../lib/redux-utils";
import {postJson} from "../../lib/http";

export const query = createThunkAction("SCREEN_SHOT_TASK.QUERY", params =>
    postJson("/screenShot/query", params)
);

