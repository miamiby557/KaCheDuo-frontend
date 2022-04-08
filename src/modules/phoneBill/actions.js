import {createThunkAction} from "../../lib/redux-utils";
import {postJson} from "../../lib/http";

export const query = createThunkAction("PHONE_BILL.QUERY", params =>
    postJson("/phoneBill/query", params)
);

