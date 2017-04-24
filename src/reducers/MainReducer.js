import {ActionTypes} from '../actions/constants';

export default function (state = {},action) {

    switch (action.type) {

        case ActionTypes.WEEK.GET_WEEK_DATA:
            return Object.assign({},state,action.payload);
        case ActionTypes.EMPLOYEES.GET_EMPLOYEES_DATA:
            return state;
        case ActionTypes.EMPLOYEES.EMPLOYEES_DATA_FETCHED:
            return Object.assign({},state,action.result);
        case ActionTypes.SHIFTS.GET_SHIFTS_DATA:
            return state;
        case ActionTypes.SHIFTS.SHIFTS_DATA_FETCHED:
            return Object.assign({},state,action.result);
        case ActionTypes.EMPLOYEES.FILTER:
            console.log(action)
             return Object.assign({},state,action);
        default:
            return state;
    }
}