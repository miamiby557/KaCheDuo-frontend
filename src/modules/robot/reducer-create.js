const defaultState = {
    visible: false,
    loading: false,
    model: {}

};
export default function create(state = defaultState, action) {
    const {type, error, payload} = action;
    switch (type) {
        case 'ROBOT.SHOW_CREATE':
            return {...state, visible: true, model: {}};
        case 'ROBOT.HIDE_CREATE':
            return {...state, visible: false, model: {}};
        case 'ROBOT.UPDATE_MODEL':
            return {...state, model: {...payload}};
        case 'ROBOT.CREATE':
            if (error === true) {
                return {...state, loading: false};
            }
            return {...state, loading: false, visible: false};
        case 'ROBOT.CREATE_PENDING':
            return {...state, loading: true, model: {...payload}};
        default:
            return state;
    }
}

