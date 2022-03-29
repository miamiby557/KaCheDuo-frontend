const defaultState = {
    loading: false,
    dataSource: [],
    page: 1,
    pageSize: 20,
    totalElements: 0,
    filter: {}
};
export default function list(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'ROBOT_TASK.QUERY':
            if (error === true) {
                return {...state, loading: false};
            }
            return {
                ...state,
                loading: false,
                dataSource: payload.content,
                page: payload.page,
                pageSize: payload.pageSize,
                totalElements: payload.totalElements
            };
        case 'ROBOT_TASK.QUERY_PENDING':
            return {...state, loading: true, filter: {...payload}};
        default:
            return state;
    }
}

