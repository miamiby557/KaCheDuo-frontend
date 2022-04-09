const defaultState = {
    loading: false,
    dataSource: [],
    page: 1,
    pageSize: 20,
    totalElements: 0,
    filter: {},
    importLoading: false
};
export default function list(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'DRIVER.QUERY':
            if (error === true) {
                return {...state, loading: false, importLoading: false};
            }
            return {
                ...state,
                loading: false,
                dataSource: payload.content,
                page: payload.page,
                pageSize: payload.pageSize,
                totalElements: payload.totalElements
            };
        case 'DRIVER.QUERY_PENDING':
            return {...state, loading: true, filter: {...payload}};
        case 'DRIVER.IMPORT_PENDING':
            return {...state, importLoading: true};
        case 'DRIVER.IMPORT':
            return {...state, importLoading: false};
        case 'DRIVER.UPDATE_DATASOURCE':
            return {...state, dataSource: [...payload]};
        default:
            return state;
    }
}

