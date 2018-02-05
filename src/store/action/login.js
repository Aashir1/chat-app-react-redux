import actionTypes from './actionTypes';
import dbConfig from './firebaseConfig';
import History from '../../History';
export function loginRequestAsync(loginObj) {
    return (dispatch) => {
        dispatch(emptyStore());
        dispatch(registeredUsersRequest());
        dbConfig.auth().signInWithEmailAndPassword(loginObj.email, loginObj.password)
            .then(user => {
                dispatch(currentUser(user));
                dbConfig.database().ref('/allUsers').once('value', dataSnapshot => {
                    let data = dataSnapshot.val(),
                        dataKeyArray = Object.keys(data);
                        dataKeyArray.map(i => {
                            let currentUser = dbConfig.auth().currentUser;
                            if(user.uid === data[i].uid){
                                let obj = {
                                    name: data[i].name,
                                    uid: data[i].uid,
                                    email: data[i].email,
                                    loginTime: new Date().toLocaleTimeString().slice(0,4) + new Date().toLocaleTimeString().slice(7),
                                    currentUser
                                }
                                dispatch(registeredUsers(obj));
                            }
                            else{
                                let obj = {
                                    name: data[i].name,
                                    uid: data[i].uid,
                                    email: data[i].email,
                                    loginTime: data[i].loginTime,
                                    currentUser
                                }
                                dispatch(registeredUsers(obj));
                            }
                    })
                    History.push('/chat');
                })
            })
            .catch((error) => {
                dispatch(loginError(error.message));
            })
    }
}
function currentUser(user){
    return{
        type: actionTypes.CURRENT_USER,
        user
    }
}

function loginError(error) {
    return {
        type: actionTypes.LOGIN_ERROR,
        error
    }
}
function emptyStore(){
    return{
        type: actionTypes.EMPTY_STORE
    }
}
function registeredUsers(obj){
    return{
        type: actionTypes.ALL_REGISTERED_USERS,
        obj
    }
}
function registeredUsersRequest(){
    return{
        type: actionTypes.ALL_REGISTERED_USERS_REQUEST
    }
}
export function loginErrorAlert() {
    return {
        type: actionTypes.LOGIN_ERROR_ALERT
    }
}
