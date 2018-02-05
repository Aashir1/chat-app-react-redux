import actionTypes from '../action/actionTypes';
let initialState = {
    currentUser: {},
    isProgress: false,
    isError: false,
    errorText: ''
}
function applicationReducers(state = initialState, action) {
    
    switch (action.type) {
        case actionTypes.SIGNUP_SUCCEED:
            return Object.assign({}, state, { currentUser: action.data, isProgress: false });
        case actionTypes.SIGNUP_PROGRESS:
            return Object.assign({}, state, { isProgress: true });
        case actionTypes.SIGNUP_ERROR:
            return Object.assign({}, state, { isError: true, errorText: action.error });
        case actionTypes.SIGNUP_ERROR_ALERT:
            return Object.assign({}, state, {isError: false, errorText: '',isProgress: false});
        default:
            return state;
    }
}
export default applicationReducers;