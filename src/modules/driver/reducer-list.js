const defaultState = {
    loading: false,
    dataSource: [],
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
                dataSource: [...payload]
            };
        case 'DRIVER.QUERY_PENDING':
            return {...state, loading: true, filter: payload ? payload.filter : {}};
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

