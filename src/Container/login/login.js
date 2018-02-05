import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import History from '../../History';
import { withRouter } from 'react-router-dom';
import { loginRequestAsync, loginErrorAlert } from '../../store/action/login';
import CircularProgress from 'material-ui/CircularProgress';
import ErrorAlert from '../../Component/errorAlert';
import '../../Component/messages.css';
const style = {
    paper: {
        height: '100%',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        display: 'inline-block',
        padding: '40px'
    },
    paperWapper: {
        width: '70%',
        margin: '0 auto',
        marginTop: 100

    },
    textStyle: {
        width: '100%'
    },
    button: {
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px',
        backgroundColor:'407ffe'
    },
    heading: {
        color: '#212121'
    }

};


function mapStateToProps(state) {
    return {
        currentUser: state.applicationSignInReducer.currentUser,
        isProgressing: state.registeredUsers.isProgress,
        isError: state.applicationSignInReducer.isError,
        errorText: state.applicationSignInReducer.errorText
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signInUser: (dataObj) => dispatch(loginRequestAsync(dataObj)),
        closeAlert : () => dispatch(loginErrorAlert())
    }
}
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    register = () => {
        History.push('/signup');
    }
    updateValue = (ev, target) => {

        let obj = {};
        obj[target] = ev.target.value;
        this.setState(obj);
    }
    signIn = () => {
        let obj = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.signInUser(obj);
    }
    dispatchClose = () =>{
        this.props.closeAlert();
    }
    render() {
        console.log('Progressing in LOGIN: ', this.props.isProgressing);
        return (
            <div>
                <ErrorAlert handleClose={this.dispatchClose} open={this.props.isError} errorText={this.props.errorText} />

                {
                    this.props.isProgressing ?( 
                        <CircularProgress style={{marginTop: '36%',marginLeft: '44%',}} size={80} thickness={5} />
                    )
                        :
                        <div style={style.paperWapper}>
                            <Paper style={style.paper} zDepth={3} >
                                <h1 style={style.heading}>Login</h1>
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'email') }}
                                    value={this.state.email}
                                    style={style.textStyle}
                                    type='email'
                                    hintText=""
                                    floatingLabelText="Email*"
                                /><br />
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'password') }}
                                    value={this.state.password}
                                    style={style.textStyle}
                                    type='password'
                                    hintText=""
                                    floatingLabelText="Password"
                                /><br />
                                <RaisedButton className={`btn`} backgroundColor="#407ffe" onClick={this.signIn} label="Login" primary={true} style={style.button} />
                                <RaisedButton className={`btn`} backgroundColor="#407ffe" onClick={this.register} label="Register" primary={true} style={style.button} />
                            </Paper>
                        </div>
                }
            </div>
        );
    }
}

// export default Login;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
