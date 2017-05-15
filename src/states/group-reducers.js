const initGrouplistState = {
    addgroup_modal_Toggle: false,
    groups:[],
    groupLoading: false
};

export function grouplist(state = initGrouplistState, action) {
    switch (action.type) {
        case '@GROUPLIST/TOOGLE_ADDGROUP_MODAL':
            return {
                ...state,
                addgroup_modal_Toggle: !state.addgroup_modal_Toggle
            };
        case '@GROUPLIST/CREATE_GROUP':
            return {
                addgroup_modal_Toggle: false,
                groups: action.groups
            };
            case '@GROUPLIST/START_LOADING':
                return {
                    ...state,
                    groupLoading: true
                };
            case '@GROUPLIST/END_LOADING':
                return {
                    ...state,
                    groupLoading: false
                };
            case '@GROUPLIST/GET_GROUPS':
                return {
                    addgroup_modal_Toggle: false,
                    groupLoading: false,
                    groups: action.groups
                };



        default:
            return state;
    }
}

const initGroupItemState = {
    addmember_modal_Toggle: false,
    Toggle_id: '',
    groupitemloading: false

};

export function groupitem(state = initGroupItemState, action) {
    switch (action.type) {
        case '@GROUPITEM/TOOGLE_ADDMEMBER_MODAL':
            return {
                ...state,
                addmember_modal_Toggle: !state.addmember_modal_Toggle,
                Toggle_id: action.id
            };
            case '@GROUPITEM/START_LOADING':
                return {
                    ...state,
                      groupitemloading: true
                };
                case '@GROUPITEM/END_LOADING':
                    return {
                        ...state,
                          groupitemloading: false
                    };

        default:
            return state;
    }
}

const initChatRoomState = {
    chatroomloading: false,
    group:{},
    chats: [],
};

export function chatroom(state = initChatRoomState, action) {
    switch (action.type) {
        case '@CHATROOM/CHANGE_CHATROOM':
            return {
                ...state,
                group: action.group
            };
        case '@CHATROOM/GET_CHATS':
            return {
                ...state,
                chats: action.chats,
                chatroomloading: false
            };
         case '@CHATROOM/START_LOADING':
            return {
                ...state,
                chatroomloading: true
            };
          case '@CHATROOM/END_LOADING':
               return {
                  ...state,
                 chatroomloading: false
             };
          case '@CHATROOM/CLEAR_CHATS':
               return {
                   ...state,
                   chats: []
               };
        default:
            return state;
    }
}

const initChatRoomHIDState = {
    chats_hid: [],
    chatroom_hidloading: false
};

export function chatroom_hid(state = initChatRoomHIDState, action) {
    switch (action.type) {
        case '@CHATROOM_HID/GET_CHATS':
            return {
                ...state,
                chats_hid: action.chats
            };
            case '@CHATROOM_HID/CLEAR_CHATS':
                return {
                    ...state,
                    chats_hid: []
                };
                case '@CHATROOM_HID/START_LOADING':
                    return {
                        ...state,
                        chatroom_hidloading: true
                    };
                    case '@CHATROOM_HID/END_LOADING':
                        return {
                            ...state,
                            chatroom_hidloading: false
                        };
        default:
            return state;
    }
}

const initChatListState = {

    hiddenchatroom_open: false,
    chatlist_loading: false,
    username_login: ''

};

export function chatlist(state = initChatListState, action) {
    switch (action.type) {
      case '@CHATLIST/OPEN_HIDDENCHATROOM':
            return{
              ...state,
              hiddenchatroom_open: true
            };
      case '@CHATLIST/CLOSE_HIDDENCHATROOM':
            return{
              ...state,
              hiddenchatroom_open: false
            };
            case '@CHATLIST/START_LOADING':
                return {
                    ...state,
                    chatlist_loading: true
                };
                case '@CHATLIST/END_LOADING':
                    return {
                        ...state,
                        chatlist_loading: false
                    };
                    case '@CHATLIST/USERNAME':
                        return {
                            ...state,
                            username_login: action.username
                        };
        default:
            return state;
    }
}
