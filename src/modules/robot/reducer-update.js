const defaultState = {
    visible: false,
    loading: false,
    model: {},
    id: ''

};
export default function update(state = defaultState, action) {
    const {type, error, payload} = action;
    switch (type) {
        case 'ROBOT.SHOW_UPDATE':
            return {...state, visible: true, id: payload.id, model: {...payload}};
        case 'ROBOT.HIDE_UPDATE':
            return {...state, visible: false, model: {}, id: ''};
        case 'ROBOT.UPDATE_MODEL':
            return {...state, model: {...payload}};
        case 'ROBOT.UPDATE':
            if (error === true) {
                return {...state, loading: false};
            }
            return {...state, loading: false, visible: false};
        case 'ROBOT.UPDATE_PENDING':
            return {...state, loading: true, model: {...payload}};
        default:
            return state;
    }
}

