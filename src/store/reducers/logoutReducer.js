import actionTypes from '../action/actionTypes';
let initialState ={
    currentUser: {}
}
function applicationLogoutReducer(state = initialState, action){
    switch(action.type){
        case actionTypes.LOGOUT_SUCCEED:
        console.log('login ka action',action);
            return Object.assign({}, state, {currentUser: null});
        default:
        return state;
    }
}

export default applicationLogoutReducer;