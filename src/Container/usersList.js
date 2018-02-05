import React from 'react';
import { connect } from 'react-redux';
import dbConfig from '../store/action/firebaseConfig';
import { logoutRequestAsync } from '../store/action/logout';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import '../Component/usersList.css';
import { withRouter } from 'react-router-dom';
import MessagesAction from '../store/action/messaging';

import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
} from 'material-ui/styles/colors';
let SelectableList = makeSelectable(List);

const colorArray = [blue300, indigo900, orange200, deepOrange300, pink400, purple500];
function mapStateToProps(state) {
    return {
        currentUser: state.registeredUsers.currentUser,
        allUsers: state.registeredUsers.users
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signInUser: (dataObj) => dispatch(logoutRequestAsync(dataObj)),
        chatWith: (eachUser) => dispatch(MessagesAction.chatwith(eachUser)),
        loadUserMsg: (obj) => dispatch(MessagesAction.loadUserMsg(obj))
    }
}
class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            isUser: false,
            eachUser: null
        }
        dbConfig.auth().onAuthStateChanged(user => {
            if (user) {
                this.state.isUser = true;
            } else {
                this.state.isUser = false;
            }
        })

    }
    openChat = (eachUser) => {
        console.log(eachUser);
        this.props.loadUserMsg(eachUser);
        this.setState({eachUser});
        this.props.chatWith(eachUser);
    }

    render() {
        return (
            <div style={{ width: '30%' }}>
                <SelectableList className={`list-wrapper`} >
                    <Subheader>
                        <div>Current Chat{': '}
                            {
                                (this.state.eachUser) ?
                                    <h3 style={{display:'inline'}}>{this.state.eachUser.name}</h3>
                                    :
                                    <h3 style={{display:'inline'}}>{this.props.currentUser.displayName}</h3>
                            }
                        </div>
                        All Users
                    </Subheader>
                    {
                        this.props.allUsers.map((eachUser, i) => {
                            return (
                                <div>
                                    <ListItem
                                        value={i}
                                        key={`${eachUser.uid}`}
                                        leftAvatar={<Avatar
                                            color={deepOrange300}
                                            backgroundColor={colorArray[Math.floor(Math.random() * 6)]}
                                            size={30}
                                        >
                                            {`${eachUser.name.slice(0, 1).toUpperCase()}`}
                                        </Avatar>}
                                        onClick={() => { this.openChat(eachUser) }}
                                        rightIcon={<CommunicationChatBubble />}
                                        primaryText={`${eachUser.name}`}
                                        secondaryText={eachUser.loginTime}
                                        secondaryTextLines={1}
                                    />
                                </div>

                            )
                        })
                    }
                </SelectableList >
                <Divider />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersList));