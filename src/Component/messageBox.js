import React from 'react';
import { connect } from 'react-redux';
import dbConfig from '../store/action/firebaseConfig';
import '../Component/usersList.css';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import ActionAndroid from 'material-ui/svg-icons/content/send';
import Edit from 'material-ui/svg-icons/image/edit';
import { fullWhite } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import MessagesActions from '../store/action/messaging';
import CircularProgress from 'material-ui/CircularProgress';
import './messages.css';
import Done from 'material-ui/svg-icons/action/done';
import FillCircle from 'material-ui/svg-icons/action/check-circle';

const styles = {
    chip: {
        margin: 4,
        backgroundColor: '#f1f0f1'
    },
    senderChip: {
        margin: 4,
        float: 'right',
        backgroundColor: '#4080ff',
        color: '#fff !important'
    },
    messageBox: {
        overflow: 'hidden',
        float: 'right',
        display: 'inline-block',
        width: '70%'
    },
    icon: {
        float: 'right',
        position: 'relative',
        top: '14px',
        color: '#747474'
    },
    seenIcon: {
        float: 'right',
        position: 'relative',
        top: '14px',
        color: '#747474'
    },
    editIcon: {
        float: 'right',
        position: 'relative',
        top: '4px',
        left: '6px',
        color: 'rgba(0, 0, 0, 0.26)',
        cursor: 'pointer'
    }
}

function mapStateToProps(state) {
    return {
        chatWith: state.messages.chatWith,
        isProgress: state.messages.isProgress,
        messagesArray: state.messages.messages

    }
}
function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (obj) => dispatch(MessagesActions.sendMessage(obj)),
        deleteMsg: (parentKey, msgKey) => dispatch(MessagesActions.deleteMsg(parentKey, msgKey)),
        updateMsg: (msg, msgObj) => dispatch(MessagesActions.updateMsg(msg, msgObj)),
        seenDone: eachObj => dispatch(MessagesActions.seenDone(eachObj))
    }
}
class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: false,
            message: '',
            forIcons: true,
            updateMessage: false,
            updateMsgObj: {},
            transform: 0
        }
        dbConfig.auth().onAuthStateChanged(user => {
            if (user) {
                this.state.isUser = true;
            } else {
                this.state.isUser = false;
            }
        })

    }
    componentDidMount() {

        document.documentElement.addEventListener('scroll', this.handleScroll);

    }

    componentWillUnmount() {
        document.documentElement.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        this.refs.nav.getDOMNode().style.top = document.documentElement.scrollTop + 'px';
    }
    handleRequestDelete = (msgObj) => {
        this.props.deleteMsg(msgObj.parentKey, msgObj.msgKey);
    }
    updateState = (ev) => {
        this.setState({ message: ev.target.value });
    }
    sendMessage = (ev) => {
        ev.preventDefault();
        if (this.state.updateMessage) {
            this.props.updateMsg(this.state.message, this.state.updateMsgObj);
            this.setState({ updateMessage: false, message: '' });
        } else {
            if (this.state.message.trim() !== "") {
                this.props.chatWith['message'] = this.state.message;
                this.props.chatWith['timeSpace'] = parseInt(new Date().getTime() + 60000);
                this.props.sendMessage(this.props.chatWith);
                this.setState({ message: '' });
            }
        }
        window.scrollBy(0, 400);
    }
    updateMsg = (msgObj) => {
        this.setState({ message: msgObj.message, updateMessage: true, updateMsgObj: msgObj });
    }
    calculateTimeSpace = (timeSpace) => {
        this.flag = false;        
        console.log('here i am called thats why some wrong heppen')
        setTimeout(() => {
            if(!this.flag){
                this.setState({ forIcons: false });
                console.log('forIcons is false');
                setTimeout(() => {
                    this.setState({ forIcons: true });
                    console.log('forIcons is true');
                }, 500);
                this.flag = true
            }
        }, 60000);
    }

    render() {
        return (
            <div style={styles.messageBox}>
                <div className={`messages-wrapper`} ref='nav'>
                    <div>
                        <div style={{
                            height: '563px',
                            overflowY: 'scroll'
                        }}>
                            {
                                (this.props.isProgress) ?
                                    <CircularProgress style={{ margin: '50%' }} size={80} thickness={5} />
                                    : (
                                        this.props.messagesArray.map(eachObj => {
                                            if (this.props.chatWith.currentUser.uid === eachObj.reciverUID) {
                                                if (!eachObj.seen) {
                                                    this.props.seenDone(eachObj);
                                                }
                                            }
                                            if (this.props.chatWith.currentUser.uid === eachObj.senderUID) {
                                                if (eachObj.timeSpace - new Date().getTime() > 0) {
                                                    if (this.state.forIcons) {
                                                        this.calculateTimeSpace();
                                                        return (
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <Chip
                                                                    className={`chip-span`}
                                                                    onRequestDelete={() => { this.handleRequestDelete(eachObj) }}
                                                                    onClick={this.handleClick}
                                                                    style={styles.senderChip}
                                                                >
                                                                    {eachObj.message}
                                                                    <span>
                                                                        
                                                                        <Edit onClick={() => { this.updateMsg(eachObj) }} style={styles.editIcon} />
                                                                    </span>
                                                                </Chip>
                                                                <Done style={styles.icon} />
                                                                <br />
                                                            </div>
                                                        )
                                                        {
                                                            this.setState({ forIcons: true });
                                                        }
                                                    } else {
                                                        //if user seen show colored iCon else null icon
                                                        if (eachObj.seen) {
                                                            return (
                                                                <div style={{ overflow: 'hidden' }}>
                                                                    <Chip
                                                                        className={`chip-span`}
                                                                        style={styles.senderChip}
                                                                    >
                                                                        {eachObj.message}
                                                                    </Chip>
                                                                    <FillCircle style={styles.seenIcon} />
                                                                    <br />
                                                                </div>

                                                            )
                                                        }
                                                        return (
                                                            <div style={{ overflow: 'hidden' }}>

                                                                <Chip
                                                                    className={`chip-span`}
                                                                    style={styles.senderChip}
                                                                >
                                                                    {eachObj.message}
                                                                </Chip>
                                                                <Done style={styles.icon} />
                                                                <br />
                                                            </div>
                                                        )
                                                    }
                                                } else {
                                                    if (eachObj.seen) {
                                                        return (
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <Chip
                                                                    className={`chip-span`}
                                                                    style={styles.senderChip}
                                                                >
                                                                    {eachObj.message}
                                                                </Chip>
                                                                <FillCircle style={styles.seenIcon} />
                                                                <br />
                                                            </div>

                                                        )
                                                    }
                                                    return (
                                                        <div style={{ overflow: 'hidden' }}>
                                                            <Chip
                                                                className={`chip-span`}
                                                                style={styles.senderChip}
                                                            >
                                                                {eachObj.message}
                                                            </Chip>
                                                            <Done style={styles.icon} />
                                                            <br />
                                                        </div>

                                                    )
                                                }

                                            } else {
                                                return (
                                                    <div style={{ overflow: 'hidden' }}>
                                                        <Chip
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
                                style={{ width: '80%' }}
                                value={this.state.message}
                                onChange={this.updateState}
                                hintText="Hint Text"
                            />
                            <RaisedButton
                                className={`send-button`}
                                style={{ width: '20%' }}
                                backgroundColor="#407ffe"
                                icon={<ActionAndroid color={fullWhite} />}
                                onClick={this.sendMessage}
                            />

                        </div>
                    </div>

                </div>
            </div >
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);