const defaultState = {
    loading: false,
    activeKey: "1",
    visible:false,
    model: {}
};
export default function detail(state = defaultState, action) {
    const {type, payload} = action;
    switch (type) {

        case 'PROFILE.CHANGE_TAB':
            return {...state, activeKey: payload};
        case 'PROFILE.GET_USER':
            return {...state, model: payload};
        default:
            return state;
    }
}



