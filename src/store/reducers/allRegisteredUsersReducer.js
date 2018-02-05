import actionTypes from "../action/actionTypes";
let initialState = {
    users: [],
    isProgress: false,
    chatWith: {},
    currentUser: {}
};
function registeredUsers(state = initialState, action) {

    switch (action.type) {
        case actionTypes.ALL_REGISTERED_USERS:
            return Object.assign({}, state, { users: [...state.users, action.obj], isProgress: false });

        case actionTypes.ALL_REGISTERED_USERS_REQUEST:
            return Object.assign({}, state, { isProgress: true, users: []});

        case actionTypes.SIGNUP_ERROR_ALERT:
            return Object.assign({}, state, { isError: false, errorText: '', isProgress: false })

        case actionTypes.EMPTY_STORE:
            return Object.assign({}, state, { users: [] });

        case actionTypes.LOGIN_ERROR_ALERT:
            return Object.assign({}, state, { isError: false, errorText: '', isProgress: false })

        case actionTypes.CURRENT_USER:
            console.log('currentUser dispatched: ', action);
            return Object.assign({}, state, {currentUser: action.user});

        default:
            return state;
    }
}

export default registeredUsers;