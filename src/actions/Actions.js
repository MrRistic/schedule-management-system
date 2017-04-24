import {ActionTypes} from './constants';

export function receiveEmployeesList(dateList) {
    return {
        type: ActionTypes.EMPLOYEES.GET_EMPLOYEES_DATA,
        payload: dateList
    }
}

export function filterEmployees(obj) {
    return {
        type: ActionTypes.EMPLOYEES.FILTER,
        Employees: [obj]

    }
}

