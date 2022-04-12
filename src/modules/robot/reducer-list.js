const defaultState = {
    loading: false,
    page: 1,
    pageSize: 20,
    totalElements: 0,
    dataSource: []
};
export default function list(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'ROBOT.QUERY':
            if (error === true) {
                return {...state, loading: false};
            }
            if (payload && payload.length > 0) {
                payload.forEach(item => {
                    item.show1 = false;
                    item.show2 = false;
                    if (item.subRobots && item.subRobots.length > 0) {
                        item.subRobots.forEach(data=>{
                            data.show1 = false;
                        });
                    }
                });
            }
            return {
                ...state,
                loading: false,
                dataSource: payload.content,
                page: payload.page,
                pageSize: payload.pageSize,
                totalElements: payload.totalElements
            };
        case 'ROBOT.QUERY_PENDING':
            return {...state, loading: true};
        case 'ROBOT.UPDATE_DATASOURCE':
            return {...state, dataSource: [...payload]};
        default:
            return state;
    }
}

