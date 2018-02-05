import actionTypes from './actionTypes';
import dbConfig from './firebaseConfig';
// console.log(signUpRequest());
import History from '../../History';

export function signUpRequestAsync(SignupObj) {
    return (dispatch) => {
        dispatch(registeredUsersRequest());
        dbConfig.auth().createUserWithEmailAndPassword(SignupObj.email, SignupObj.password)
        .then(user => {
                return user.updateProfile({
                    displayName: SignupObj.name,
                })
                .then(() => {
                    dispatch(currentUser(user));
                    let obj = {
                        name: user.displayName,
                        uid: user.uid,
                        email: user.email,
                        loginTime: new Date().toLocaleTimeString().slice(0,4) + new Date().toLocaleTimeString().slice(7)
                    }
                    dbConfig.database().ref('/allUsers').push(obj)
                    dbConfig.database().ref('/allUsers').once('value', dataSnapshot=>{
                        let data = dataSnapshot.val(),
                        dataKeyArray = Object.keys(data);
                        dataKeyArray.map(i=>{
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
            })
            .catch((error) => {
                dispatch(signUpError(error.message));
                History.push('/signup');
            })


    }
}

function currentUser(user){
    return{
        type: actionTypes.CURRENT_USER,
        user
    }
}
function signUpError(error){
    return{
        type: actionTypes.SIGNUP_ERROR,
        error
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
export function signUpErrorAlert(){
    return{
        type: actionTypes.SIGNUP_ERROR_ALERT
    }
}