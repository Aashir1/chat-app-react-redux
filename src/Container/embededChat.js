import React from 'react';
import UsersList from './usersList';
import MessageBox from '../Component/messageBox';
class Chat extends React.Component {
    
    render() {
        return (
            <div>
                <MessageBox />
                <UsersList />
            </div>
        )
    }
}

export default Chat;