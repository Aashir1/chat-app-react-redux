import SignUp from './signup';
import { connect } from 'react-redux';
import actionTypes from '../../store/action/actionTypes';
import applicationReducers from '../../store/reducers/signupReducer'//signUpRequestAsync
import {signUpRequestAsync} from '../../store/action/signup'
function mapStateToProps(state) {
    return {
        currentUser: state.applicationReducers.currentUser
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signUpUser: (dataObj)=>dispatch(signUpRequestAsync(dataObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);