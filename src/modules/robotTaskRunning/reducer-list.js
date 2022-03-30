const defaultState = {
    loading: false,
    dataSource: [],
    filter: {}
};
export default function list(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'ROBOT_TASK_RUNNING.QUERY':
            if (error === true) {
                return {...state, loading: false};
            }
            return {
                ...state,
                loading: false,
                dataSource: [...payload]
            };
        case 'ROBOT_TASK_RUNNING.QUERY_PENDING':
            return {...state, loading: true, filter: {...payload}};
        default:
            return state;
    }
}

