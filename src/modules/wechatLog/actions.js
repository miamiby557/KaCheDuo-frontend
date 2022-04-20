import {createThunkAction} from "../../lib/redux-utils";
import {postJson} from "../../lib/http";

export const query = createThunkAction("WECHAT_LOG.QUERY", params =>
    postJson("/wechatLog/query", params)
);

