
const defaultState = {
    visible: false,
    loading:false,
    model: {},
    selectRoleCodeList:[],
    dispatchCentre:[],

};
export default function create(state = defaultState, action) {
    const {type, error,payload} = action;
    switch (type) {
        case 'USER.SHOW_CREATE':
            return {...state, visible: true,selectRoleCodeList:[]};
        case 'USER.HIDE_CREATE':
            return {...state, visible: false,model:{}};
        case 'USER.CREATE':
            if(error===true){
                return {...state, loading:false};
            }
            return {...state, loading:false, visible: false};
        case 'USER.CREATE_PENDING':
            return {...state, loading: true,model:{...payload}};
        case 'USER.GET_DISPATCH_CENTRE':
            if(error===true){
                return state;
            }
            return {...state, dispatchCentre:action.payload};
        default:
            return state;
    }
}

