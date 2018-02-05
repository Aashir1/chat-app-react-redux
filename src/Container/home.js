import React from 'react';
import { connect } from 'react-redux';
import dbConfig from '../store/action/firebaseConfig';
import { logoutRequestAsync } from '../store/action/logout';
import { List, ListItem } from 'material-ui/List';
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
import History from '../History';

const colorArray = [blue300, indigo900, orange200, deepOrange300, pink400, purple500];
function mapStateToProps(state) {
    return {
        currentUser: state.applicationLogoutReducer.currentUser,
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
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            isUser: false
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
        console.log('senderUID: ', eachUser.currentUser.uid);
        console.log('reciverUID: ', eachUser.uid);
        this.props.loadUserMsg(eachUser);
        // History.push(`/home/${eachUser.name}`);
        History.push(`/home/${eachUser.name}`);
        
        this.props.chatWith(eachUser);
    }

    render() {
        console.log(this.props.allUsers)
        return (
            <div>
                <h1 >
                    Home Page
                </h1>
                {/* <UsersList users={this.props.allUsers}/> */}
                <List className={`list-wrapper`}>
                    <Subheader>All Users</Subheader>
                    {
                        this.props.allUsers.map(eachUser => {
                            console.log(eachUser);
                            return (
                                <div>
                                    <ListItem
                                        key={`${eachUser.uid}`}
                                        leftAvatar={<Avatar
                                            color={deepOrange300}
                                            backgroundColor={colorArray[Math.floor(Math.random() * 6)]}
                                            size={30}
                                        // style={{ float: 'left', marginRight: "7px" }}
                                        // style={style}
                                        >
                                            {`${eachUser.name.slice(0, 1).toUpperCase()}`}
                                        </Avatar>}
                                        onClick={() => { this.openChat(eachUser) }}
                                        // rightIconButton={rightIconMenu}
                                        rightIcon={<CommunicationChatBubble />}
                                        primaryText={`${eachUser.name}`}
                                        secondaryText={eachUser.loginTime}
                                        secondaryTextLines={1}
                                    />
                                    {/* <Divider inset={true} /> */}
                                </div>

                            )
                        })
                    }
                </List>
                <Divider />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));