import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

export const showCreate = createAction("ROBOT.SHOW_CREATE");
export const hideCreate = createAction("ROBOT.HIDE_CREATE");
export const showUpdate = createAction("ROBOT.SHOW_UPDATE");
export const hideUpdate = createAction("ROBOT.HIDE_UPDATE");
export const updateModel = createAction("ROBOT.UPDATE_MODEL");
export const updateSubRobot = createAction("SUB_ROBOT.UPDATE");
export const updateDataSource = createAction("ROBOT.UPDATE_DATASOURCE");

export const query = createThunkAction("ROBOT.QUERY", params =>
    postJson("/robot/query", params)
);
export const modify = createThunkAction("ROBOT.MODIFY", params =>
    postJson("/robot/update", params)
);
export const del = createThunkAction("ROBOT.DELETE", params =>
    get("/robot/del/" + params)
);
export const create = createThunkAction("ROBOT.CREATE", params =>
    postJson("/robot/create", params)
);

export const start = createThunkAction("ROBOT.START", params =>
    get("/robot/start/" + params)
);

export const stop = createThunkAction("ROBOT.STOP", params =>
    get("/robot/stop/" + params)
);

export const stopLocation = createThunkAction("ROBOT.STOP_LOCATION", params =>
    get("/robot/stopLocation/" + params)
);

export const sendMail = createThunkAction("ROBOT.SEND_MAIL", params =>
    get("/home/testSendMail")
);


export const sendMailOnceCompany = createThunkAction("ROBOT.SEND_MAIL", params =>
    get("/home/sendMailOnceCompany/" + params)
);


export const startLocation = createThunkAction("ROBOT.START_LOCATION", params =>
    get("/robot/startLocation/" + params)
);

export const runOnceLocation = createThunkAction("ROBOT.RUN_ONCE_LOCATION", params =>
    get("/robot/batchRunOnceLocation")
);
