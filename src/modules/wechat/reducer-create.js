const defaultState = {
    visible: false,
    loading: false,
    model: {}

};
export default function create(state = defaultState, action) {
    const {type, error, payload} = action;
    switch (type) {
        case 'WECHAT.SHOW_CREATE':
            return {...state, visible: true, model: {}};
        case 'WECHAT.HIDE_CREATE':
            return {...state, visible: false, model: {}};
        case 'WECHAT.CREATE':
            if (error === true) {
                return {...state, loading: false};
            }
            return {...state, loading: false, visible: false};
        case 'WECHAT.CREATE_PENDING':
            return {...state, loading: true, model: {...payload}};
        default:
            return state;
    }
}

