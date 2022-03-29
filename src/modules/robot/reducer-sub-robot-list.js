const defaultState = {
    visible: false,
    loading: false,
    data: []

};
export default function subRobot(state = defaultState, action) {
    const {type, payload} = action;
    switch (type) {
        case 'SUB_ROBOT.UPDATE':
            return {...state, data: [...payload]};
        case 'ROBOT.SHOW_CREATE':
        case 'ROBOT.HIDE_CREATE':
        case 'ROBOT.HIDE_UPDATE':
            return {...state, data: []};
        default:
            return state;
    }
}

