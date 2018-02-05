import actionTypes from "../action/actionTypes";

let initialState = {
    chatWith: {},
    isProgress: false,
    messages: []
}

function messages(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHAT_WITH:
            return Object.assign({}, state, { chatWith: action.obj });

        case actionTypes.MESSAGE_RETRIVE_REQUEST:
            return Object.assign({}, state, { messages: []});

        case actionTypes.NO_MESSAGE_DO_NOTHING:
            return Object.assign({}, state, {isProgress: false});

        case actionTypes.MESSAGE_RETRIVE_REQUEST_WITHLOADER:
            return Object.assign({}, state, { messages: [], isProgress: true });

        case actionTypes.MESSAGE_RETRIVE_SUCCEED:
            return Object.assign({}, state, { messages: [...state.messages, action.obj], isProgress: false });

        default:
            return state;
    }
}

export default messages;