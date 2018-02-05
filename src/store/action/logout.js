import actionTypes from './actionTypes';
import dbConfig from './firebaseConfig';
import History from '../../History';
export function logoutRequestAsync(){
    return (dispatch)=>{
        dbConfig.auth().signOut()
      .then(()=>{
          History.replace('/');
          dispatch(logoutSucceed());
        }
      )
      .catch((error)=>{
        console.log(error.message);
      })

    }
}

function logoutSucceed(){
    console.log();
    return{
        type: actionTypes.LOGOUT_SUCCEED,
        
    }
}

