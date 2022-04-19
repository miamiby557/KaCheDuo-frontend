const defaultState = {
    loading: false,
    dataSource: []
};
export default function list(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'PHONE.QUERY':
            if (error === true) {
                return {...state, loading: false};
            }
            return {
                ...state,
                loading: false,
                dataSource: [...payload]
            };
        default:
            return state;
    }
}

