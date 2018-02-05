import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import History from '../../History';
import { signUpRequestAsync, signUpErrorAlert } from '../../store/action/signup';
import CircularProgress from 'material-ui/CircularProgress';
import ErrorAlert from '../../Component/errorAlert';
import '../../Component/messages.css';
import dbConfig from '../../store/action/firebaseConfig';
import firebase from 'firebase';

function mapStateToProps(state) {
    return {
        currentUser: state.applicationReducers.currentUser,
        isProgressing: state.registeredUsers.isProgress,
        isError: state.applicationReducers.isError,
        errorText: state.applicationReducers.errorText

    }
}
function mapDispatchToProps(dispatch) {
    return {
        signUpUser: (dataObj) => dispatch(signUpRequestAsync(dataObj)),
        closeAlert: () => dispatch(signUpErrorAlert())
    }
}
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
        backgroundColor: "#407ffe !important"
    },
    heading: {
        color: '#212121'
    }

};
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            file: ''
        }
    }

    signUp = () => {
        let obj = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        this.props.signUpUser(obj);
    }
    signIn = () => {
        console.log('signin is triggered');
        History.push('/');

    }
    updateValue = (ev, target) => {
        let obj = {};
        obj[target] = ev.target.value;
        this.setState(obj);
    }
    dispatchClose = () => {
        this.props.closeAlert();
    }
    
    render() {
        console.log('Progressing in signup: ', this.props.isProgressing);
        console.log('error alert info: ', this.props.errorText, this.props.isError);
        return (
            <div>
                <ErrorAlert handleClose={this.dispatchClose} open={this.props.isError} errorText={this.props.errorText} />
                {
                    this.props.isProgressing ?
                        <CircularProgress style={{ margin: '50%' }} size={80} thickness={5} />
                        : (
                            <div style={style.paperWapper}>
                                <Paper style={style.paper} zDepth={3} >
                                    <h1 style={style.heading}>SignUp</h1>
                                    <TextField
                                        onChange={(event) => { this.updateValue(event, 'name') }}
                                        value={this.state.name}
                                        style={style.textStyle}
                                        type='text'
                                        hintText=""
                                        floatingLabelText="Name*"
                                    /><br />
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

                                    

                                    <RaisedButton className={`btn`} onClick={this.signUp} label="Submit" primary={true} style={style.button} backgroundColor="#407ffe !important" />
                                    <RaisedButton className={`btn`} onClick={this.signIn} label="Login" primary={true} style={style.button} backgroundColor="#407ffe !important" />
                                </Paper>
                            </div>
                        )
                }
            </div>
        );
    }
}

// export default SignUp;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));