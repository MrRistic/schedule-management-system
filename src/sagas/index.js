import {takeEvery} from 'redux-saga';
import {fork,call,put} from 'redux-saga/effects';
import {ActionTypes} from '../actions/constants';
import Employees from '../data/Emplyees.json';
import Shifts from '../data/Shifts.json';

const apiFetch = {

    fetchLocal(file) {
    //  Simulate Api Call and Server delay
        return new Promise((resolve)=>{
            setTimeout(function(){
                resolve(file);
            }, 20);
        })

    }
};

function parseShiftsEmployees(data) {

    const shift = data.shifts.Shifts;
    const allDataList = [];
    //Loop trough employees & assign to the new list
    data.employees.map((item, index) => {

        allDataList[index] = item;
        allDataList[index].shift = [];
        //Loop trough dates
        data.dates.map((dateItem,dateIndex) =>{

            shift.map((shiftItem) => {
                //Get timestamps of weekdays
                let timeStampDay = +new Date(dateItem.date +', ' + dateItem.year);
                //Check is there a active shift in the time range
                let activeShift =  (timeStampDay>=shiftItem.dates.start && timeStampDay<=shiftItem.dates.end  ) ? shiftItem : false;

                if(!allDataList[index].shift[dateIndex])
                {
                    allDataList[index].shift[dateIndex] = (activeShift && activeShift.userIds.indexOf(item.userId) > -1 )
                        ? activeShift
                        : false;
                }

             });
        });
    });

    return {dateShifts: allDataList};

}

//Saga function
function *callGetEmployeeSaga(action) {
    const result = yield call(apiFetch.fetchLocal,Employees);
    const finalResult = Object.assign(result,action.payload);

    yield put({type: ActionTypes.EMPLOYEES.EMPLOYEES_DATA_FETCHED, result});

    yield put({type: ActionTypes.SHIFTS.GET_SHIFTS_DATA, finalResult })
}

function *callShiftsSaga(action) {

    const employees = action.finalResult.Employees;
    const dates = action.finalResult.dateList;
    const shifts = yield call(apiFetch.fetchLocal,Shifts);

        const result = yield call(parseShiftsEmployees,{employees,dates,shifts});
        yield put({type: ActionTypes.SHIFTS.SHIFTS_DATA_FETCHED, result})



}

//Action listener
function *GetEmployeeSaga() {
    yield *takeEvery(ActionTypes.EMPLOYEES.GET_EMPLOYEES_DATA,callGetEmployeeSaga);
}
function *GetShiftsSaga() {

    yield *takeEvery(ActionTypes.SHIFTS.GET_SHIFTS_DATA,callShiftsSaga);
}

// function *getFilterSaga() {
//     yield *takeEvery(ActionTypes.EMPLOYEES.FILTER,callShiftsSaga);
// }

export default function *root() {
    yield [
        fork(GetEmployeeSaga),
        fork(GetShiftsSaga)
    ]
}