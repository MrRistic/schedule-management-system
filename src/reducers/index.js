import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import MainReducer from './MainReducer'



const rootReducer = combineReducers({
    MainData: MainReducer,
    routing: routerReducer
});

export default rootReducer;
