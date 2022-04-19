const defaultState = {
    visible: false,
    loading: false,
    model: {}

};
export default function create(state = defaultState, action) {
    const {type, error, payload} = action;
    switch (type) {
        case 'PHONE.SHOW_CREATE':
            return {...state, visible: true, model: {}};
        case 'PHONE.HIDE_CREATE':
            return {...state, visible: false, model: {}};
        case 'PHONE.CREATE':
            if (error === true) {
                return {...state, loading: false};
            }
            return {...state, loading: false, visible: false};
        case 'PHONE.CREATE_PENDING':
            return {...state, loading: true, model: {...payload}};
        default:
            return state;
    }
}

