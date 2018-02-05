import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import applicationReducers from './reducers/signupReducer';
import applicationSignInReducer from './reducers/loginReducer';
import applicationLogoutReducer from './reducers/logoutReducer';
import registeredUsers from './reducers/allRegisteredUsersReducer';
import messages from './reducers/messeging';

let reducers = combineReducers({
    applicationReducers,
    applicationSignInReducer,
    applicationLogoutReducer,
    registeredUsers,
    messages
});
const loggerMiddleware = createLogger();

let store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export default store;