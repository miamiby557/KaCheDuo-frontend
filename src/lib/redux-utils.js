import reduceReducers from "reduce-reducers";
import lodash from 'lodash';
import {Form} from 'antd';

export function createAction(type) {
    const typeString = type.toString();
    const actionCreator = payload => {
        const action = {type, payload};
        if (payload instanceof Error) {
            action.error = true;
        }
        return action;
    };
    actionCreator.toString = () => typeString;
    return actionCreator;
}

export function createThunkAction(type, promiseCreator) {
    const typeString = type.toString();
    const actionCreator = params => dispatch => {
        dispatch({type: `${type}_PENDING`, payload: params});
        const promise = promiseCreator(params);
        const resolved = result => dispatch({type, payload: result});
        const rejected = ex => dispatch({type, error: true, payload: ex});
        if (promise && promise.then) {
            return promise.then(resolved, rejected);
        } else {
            console.log("require a promise object", promise);
        }
    };
    actionCreator.toString = () => typeString;
    return actionCreator;
}

export function createReducer(type, reducer, defaultState = {}) {
    return (state = defaultState, action) => {
        if (type === action.type) {
            return reducer(state, action);
        }
        return state;
    };
}

export function createThunkReducer(type,
                                   pendingReducer,
                                   doneReducer,
                                   defaultState = {}) {
    return (state = defaultState, action) => {
        if (type === action.type && doneReducer) {
            return doneReducer(state, action);
        } else if (`${type}_PENDING` === action.type && pendingReducer) {
            return pendingReducer(state, action);
        }
        return state;
    };
}

/*
* 合并多个Reducer为一个Reducer
*/
export function composeReducer(defaultState, ...reducers) {
    const initReducer = (state = defaultState) => state;
    return reduceReducers(initReducer, ...reducers);
}

/**
 * 将模型类转为FormFields
 * @param {*} model
 * @param {*} paths
 */
export function mapModelToFields(model = {}, paths = '') {
    return lodash.reduce(
        model,
        (result, value, key) => {
            const field = paths ? `${paths}.${key}` : key;
            if (lodash.isPlainObject(value)) {
                return {...result, ...mapModelToFields(value, field)};
            } else {
                return {...result, [field]: Form.createFormField({value: value})};
            }
        },
        {}
    );
}
