import actionTypes from '../action/actionTypes';
let initialState = {
    currentUser: {},
    isProgress: false,
    isError: false,
    errorText: ''
}
function applicationSignInReducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.LOGIN_SUCCEED:
            console.log('login ka action', action);
            return Object.assign({}, state, { currentUser: action.data, isProgress: false });

        case actionTypes.LOGIN_PROGRESS:
            return Object.assign({}, state, { isProgress: true });

        case actionTypes.LOGIN_ERROR:
            return Object.assign({}, state, { isError: true, errorText: action.error });

        case actionTypes.LOGIN_ERROR_ALERT:
            return Object.assign({}, state, { isError: false, errorText: '', isProgress: false })

        default:
            return state;
    }
}

export default applicationSignInReducer;