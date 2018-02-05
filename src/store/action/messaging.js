import actionTypes from './actionTypes';
import dbConfig from './firebaseConfig';
class MessagesActions {
    static sendMessage(ob) {
        return (dispatch) => {
            let obj = {
                messages: ob.message,
                sendTime: new Date().toLocaleTimeString(),
                senderUID: ob.currentUser.uid,
                reciverUID: ob.uid,
                timeSpace: ob.timeSpace,
                seen: false
            },a=ob.currentUser.uid,
            b = ob.uid,
            key = a>b ? a+b : b+a;
            dbConfig.database().ref('/messages/' + key).push(obj)
                .then(user => {
                    // dbConfig.database().ref('/messages/' + key).once('value', dataSnapshot => {
                    //     dispatch(MessagesActions.messageRetriveRequest());
                    //     let data = dataSnapshot.val(),
                    //         dataKey = Object.keys(data);
                    //     dataKey.map(i => {
                    //         let obj = {
                    //             message: data[i].messages,
                    //             sendTime: data[i].sendTime,
                    //             senderUID: data[i].senderUID,
                    //             reciverUID: data[i].reciverUID,
                    //             timeSpace: data[i].timeSpace,
                    //             seen: data[i].seen,
                    //             msgKey: i,
                    //             parentKey: data[i].senderUID>data[i].reciverUID? (data[i].senderUID + data[i].reciverUID) : (data[i].reciverUID + data[i].senderUID)

                    //         }
                    //         dispatch(MessagesActions.messageRetriveRequestSucceed(obj));
                    //     });
                    // });
                    let i = 0
                    dispatch(MessagesActions.messageRetriveRequest());
                    dbConfig.database().ref('/messages/' + key).on('child_added', dataSnapshot => {
                        let data = dataSnapshot.val(),
                            dataKey = dataSnapshot.key;
                            
                            let obj = {
                                message: data.messages,
                                sendTime: data.sendTime,
                                senderUID: data.senderUID,
                                reciverUID: data.reciverUID,
                                timeSpace: data.timeSpace,
                                seen: data.seen,
                                msgKey: dataKey,
                                parentKey: data.senderUID>data.reciverUID? (data.senderUID + data.reciverUID) : (data.reciverUID + data.senderUID)

                            }
                            dispatch(MessagesActions.messageRetriveRequestSucceed(obj));
                            i++;
                    });
                })
                .catch(error => {
                    alert(error.messages)
                })
        }
    }
    static loadUserMsg(obj) {
        return dispatch => {
            let a=obj.currentUser.uid,
            b = obj.uid,
            key = a>b ? a+b : b+a;
            dbConfig.database().ref('/messages/' + key).on('value', dataSnapshot => {
                dispatch(MessagesActions.messageRetriveRequestWithLoader());
                if (dataSnapshot.val()) {
                    let data = dataSnapshot.val(),
                        dataKey = Object.keys(data);
                    dataKey.map(i => {
                        let obj = {
                            message: data[i].messages,
                            sendTime: data[i].sendTime,
                            senderUID: data[i].senderUID,
                            reciverUID: data[i].reciverUID,
                            timeSpace: data[i].timeSpace,
                            seen: data[i].seen,
                            msgKey: i,
                            parentKey: data[i].senderUID>data[i].reciverUID? (data[i].senderUID + data[i].reciverUID) : (data[i].reciverUID + data[i].senderUID),
                        }
                        dispatch(MessagesActions.messageRetriveRequestSucceed(obj));
                    });
                } else {
                    dispatch(MessagesActions.noMessageDoNothing());

                }
            })
        }
    }
    static deleteMsg(parentKey, msgKey){
        dbConfig.database().ref('/messages/' + parentKey).child(msgKey).remove();
        return dispatch =>{
            dbConfig.database().ref('/messages/' + parentKey).once('value', dataSnapshot => {
                dispatch(MessagesActions.messageRetriveRequest());
                let data = dataSnapshot.val(),
                    dataKey = Object.keys(data);
                dataKey.map(i => {
                    let obj = {
                        message: data[i].messages,
                        sendTime: data[i].sendTime,
                        senderUID: data[i].senderUID,
                        reciverUID: data[i].reciverUID,
                        timeSpace: data[i].timeSpace,
                        seen: data[i].seen,
                        msgKey: i,
                        parentKey: data[i].senderUID>data[i].reciverUID? (data[i].senderUID + data[i].reciverUID) : (data[i].reciverUID + data[i].senderUID)

                    }
                    dispatch(MessagesActions.messageRetriveRequestSucceed(obj));
                });
            });
        }
    }
    static seenDone(obj){
        dbConfig.database().ref('/messages/'+obj.parentKey).child(obj.msgKey).update({seen:true});
        return dispatch =>{
            dbConfig.database().ref('/messages/' + obj.parentKey).once('value', dataSnapshot => {
                dispatch(MessagesActions.messageRetriveRequest());
                let data = dataSnapshot.val(),
                    dataKey = Object.keys(data);
                dataKey.map(i => {
                    let obj = {
                        message: data[i].messages,
                        sendTime: data[i].sendTime,
                        senderUID: data[i].senderUID,
                        reciverUID: data[i].reciverUID,
                        timeSpace: data[i].timeSpace,
                        seen: data[i].seen,
                        msgKey: i,
                        parentKey: data[i].senderUID>data[i].reciverUID? (data[i].senderUID + data[i].reciverUID) : (data[i].reciverUID + data[i].senderUID)
    
                    }
                    dispatch(MessagesActions.messageRetriveRequestSucceed(obj));
                });
            });
           }
    }
    static updateMsg(msg, msgObj){
        dbConfig.database().ref('/messages/'+msgObj.parentKey).child(msgObj.msgKey).update({messages:msg});
       return dispatch =>{
        dbConfig.database().ref('/messages/' + msgObj.parentKey).once('value', dataSnapshot => {
            dispatch(MessagesActions.messageRetriveRequest());
            let data = dataSnapshot.val(),
                dataKey = Object.keys(data);
            dataKey.map(i => {
                let obj = {
                    message: data[i].messages,
                    sendTime: data[i].sendTime,
                    senderUID: data[i].senderUID,
                    reciverUID: data[i].reciverUID,
                    timeSpace: data[i].timeSpace,
                    seen: data[i].seen,
                    msgKey: i,
                    parentKey: data[i].senderUID>data[i].reciverUID? (data[i].senderUID + data[i].reciverUID) : (data[i].reciverUID + data[i].senderUID)

                }
                dispatch(MessagesActions.messageRetriveRequestSucceed(obj));
            });
        });
       }
    }
    static chatwith(obj) {
        return {
            type: actionTypes.CHAT_WITH,
            obj
        }
    }
    static messageRetriveRequest() {
        return {
            type: actionTypes.MESSAGE_RETRIVE_REQUEST
        }
    }
    static messageRetriveRequestWithLoader() {
        return {
            type: actionTypes.MESSAGE_RETRIVE_REQUEST_WITHLOADER
        }
    }
    static messageRetriveRequestSucceed(obj) {
        return {
            type: actionTypes.MESSAGE_RETRIVE_SUCCEED,
            obj
        }
    }
    static noMessageDoNothing() {
        return {
            type: actionTypes.NO_MESSAGE_DO_NOTHING
        }
    }
}
export default MessagesActions;