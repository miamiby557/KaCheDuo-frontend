import {createThunkAction} from "../../lib/redux-utils";
import {postJson} from "../../lib/http";

export const query = createThunkAction("CHU_ZHI.QUERY", params =>
    postJson("/fx/query", params)
);

