import { combineReducers, createStore } from "redux";
import { authReducer } from './AuthState';
import { vacationReducer } from './VacationsState';

const reducers = combineReducers({ authState: authReducer, vacationState: vacationReducer });
const store = createStore(reducers);

export default store;