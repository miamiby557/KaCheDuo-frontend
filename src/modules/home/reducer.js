const defaultState = {
    loading: false,
    robotList:[]
};

export default function home(state = defaultState, action) {
    const {type, payload, error} = action;
    if(error === true){
        return state;
    }
    switch (type) {
        case 'DASHBOARD.DASHBOARD':
            return {...state, robotList: [...payload]};
        default:
            return state;
    }
}
