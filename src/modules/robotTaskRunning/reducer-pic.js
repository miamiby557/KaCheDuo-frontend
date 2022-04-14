const defaultState = {
    visible: false,
    loading: false,
    model: {}

};
export default function pic(state = defaultState, action) {
    const {type, error, payload} = action;
    if (error === true) {
        return {...state, loading: false};
    }
    switch (type) {
        case 'TASK.SHOW_PIC':
            return {...state, visible: true, model: {...payload}};
        case 'TASK.HIDE_SHOW_PIC':
            return {...state, visible: false, model: {}};
        default:
            return state;
    }
}

