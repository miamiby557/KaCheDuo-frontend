const defaultState = {
    visible: false,
    loading: false,
    model: {}

};
export default function create(state = defaultState, action) {
    const {type, error, payload} = action;
    if (error === true) {
        return {...state, loading: false};
    }
    switch (type) {
        case 'CHU_ZHI.SHOW_PIC':
            return {...state, visible: true, model: {...payload}};
        case 'CHU_ZHI.HIDE_SHOW_PIC':
            return {...state, visible: false, model: {}};
        default:
            return state;
    }
}

