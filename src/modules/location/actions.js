import {createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

export const query = createThunkAction("LOCATION.QUERY", params =>
    postJson("/location/query", params)
);
export const getLocationRobots = createThunkAction("LOCATION.QUERY_ROBOTS", params =>
    get("/robot/getLocationRobots/" + params)
);

