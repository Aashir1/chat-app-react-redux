import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import './usersList.css';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
} from 'material-ui/styles/colors';

const colorArray = [blue300, indigo900, orange200, deepOrange300, pink400, purple500];

const UsersList = () => (
    
    <div className={`list-wrapper`}>
        <List className={`list-wrapper`}>
        <Subheader>All Users</Subheader>
        {
            this.props.allUsers.map(eachUser => {
                return (
                    <div>
                        <ListItem
                            key={`${eachUser.uid}`}
                            leftAvatar={<Avatar
                                color={deepOrange300}
                                backgroundColor={colorArray[Math.floor(Math.random() * 6)]}
                                size={30}
                            >
                                {`${eachUser.name.slice(0, 1).toUpperCase()}`}
                            </Avatar>}
                            onClick={()=>{console.log('list clicked')}}
                            primaryText={`${eachUser.name}`}
                            rightIcon={<CommunicationChatBubble />}
                            secondaryTextLines={2}
                        />
                    </div>

                )
            })
        }
    </List>
    <Divider />

    </div>
);

export default UsersList;