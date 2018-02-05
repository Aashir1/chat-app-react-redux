import React from 'react';
import { connect } from 'react-redux';
import dbConfig from '../store/action/firebaseConfig';
import '../Component/usersList.css';
import { withRouter } from 'react-router-dom';
import History from '../History';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import ActionAndroid from 'material-ui/svg-icons/content/send';
import { fullWhite } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import MessagesActions from '../store/action/messaging';
import CircularProgress from 'material-ui/CircularProgress';
import './messages.css';

const styles = {
    chip: {
        margin: 4,
        backgroundColor:'#f1f0f1'
    },
    senderChip:{
        margin: 4,
        float: 'right',
        backgroundColor:'#4080ff',
        color:'#fff !important'
    }
}

function mapStateToProps(state) {
    console.log(`chatWith `, state.messages.chatWith);
    return {
        chatWith: state.messages.chatWith,
        isProgress: state.messages.isProgress,
        messagesArray: state.messages.messages

    }
}
function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (obj) => dispatch(MessagesActions.sendMessage(obj))
    }
}
class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: false,
            message: ''
        }
        dbConfig.auth().onAuthStateChanged(user => {
            if (user) {
                this.state.isUser = true;
            } else {
                this.state.isUser = false;
            }
        })

    }
    handleRequestDelete = () => {
        alert('You clicked the delete button.');
    }

    handleClick = () => {
        alert('You clicked the Chip.');
    }
    updateState = (ev) => {
        this.setState({ message: ev.target.value });
    }
    sendMessage = (ev) => {
        ev.preventDefault();
        this.props.chatWith['message'] = this.state.message;
        this.props.chatWith['timeSpace'] = parseInt(new Date().getTime() + 60000);
        console.log(this.props.chatWith);
        this.props.sendMessage(this.props.chatWith);
        this.setState({message: ''});
    }
    calculateTimeSpace = (timeSpace) =>{
        this.clear = setInterval(()=>{
            if(timeSpace - new Date().getTime() > 0){
                return true;
            }else{
                clearInterval(this.clear);
                return false;
            }
        }, 1000);
    }

    render() {
        console.log('messages: ', this.props.messagesArray);
        console.log('isProgress: ', this.props.isProgress);
        // console.log('messages: ', this.props.messagesArray);

        return (
            <div>
                <div className={`users-list`}>
                </div>

                <div className={`messages-wrapper`}>
                    <h3>ID: {this.props.match.params.id}</h3>
                    <div>

                        <div className={`messages`}>
                            {
                                (this.props.isProgress) ?
                                    <CircularProgress style={{ margin: '50%' }} size={80} thickness={5} />
                                    : (
                                        this.props.messagesArray.map(eachObj => {
                                            if(this.props.chatWith.currentUser.uid === eachObj.senderUID){
                                                console.log('eachObj.timeSpace - new Date().getTime(): ', eachObj )
                                                // this.calculateTimeSpace(eachObj.timeSpace);
                                                if(this.calculateTimeSpace(eachObj.timeSpace)){
                                                    return (
                                                        <div style={{overflow:'hidden'}}> 
                                                            <Chip
                                                                className={`chip-span`}
                                                                onRequestDelete={this.handleRequestDelete}
                                                                onClick={this.handleClick}
                                                                style={styles.senderChip}
                                                            >
                                                                {eachObj.message}
                                                            </Chip>
                                                            <br />
                                                        </div>
        
                                                    )
                                                }else{
                                                    return (
                                                        <div style={{overflow:'hidden'}}> 
                                                            <Chip
                                                                className={`chip-span`}
                                                                // onRequestDelete={this.handleRequestDelete}
                                                                // onClick={this.handleClick}
                                                                style={styles.senderChip}
                                                            >
                                                                {eachObj.message}
                                                            </Chip>
                                                            <br />
                                                        </div>
        
                                                    )
                                                }
                                                
                                            }else{
                                                return (
                                                    <div style={{overflow:'hidden'}}>
                                                        <Chip
                                                            onRequestDelete={this.handleRequestDelete}
                                                            onClick={this.handleClick}
                                                            style={styles.chip}
                                                        >
                                                            {eachObj.message}
                                                        </Chip>
                                                        <br />
                                                    </div>
    
                                                )
                                            }
                                        })
                                    )
                            }

                        </div>
                        <div className={`input-field`}>
                            <TextField
                                value={this.state.message}
                                onChange={this.updateState}
                                hintText="Hint Text"
                            />
                            <RaisedButton
                                backgroundColor="#a4c639"
                                icon={<ActionAndroid color={fullWhite} />}
                                onClick={this.sendMessage}
                            />

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Child);