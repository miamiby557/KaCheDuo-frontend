const defaultState = {
    visible: false,
    loading:false,
    selectRoleCodeList:[],
    model: {}
};
export default function modify(state = defaultState, action) {
    const {type, error} = action;
    switch (type) {
        case 'PROFILE.MODIFY':
            if(error===true){
                return {...state, loading:false,visible: true};
            }
            return {...state, loading:false, model: {}};
        case 'PROFILE.MODIFY_PENDING':
            return {...state, loading: true};
        default:
            return state;
    }
}

