import {
    createGroup as createGroupFromApi,
    listGroups as listGroupsFromApi,
    deleteGroup as deleteGroupFromApi,
    addGroupMembers as addGroupMembersFromApi,
    deleteGroupMembers as deleteGroupMembersFromApi,
    getGroup as getGroupFromApi
} from '../api/group.js';
import {
  ToastAndroid
} from 'react-native';
import {
   createChat as createChatFromApi,
   listChats as listChatsFromApi
} from '../api/chat.js'


export function toggleAddGroupModal() {
    return {
        type: '@GROUPLIST/TOOGLE_ADDGROUP_MODAL'
    };
}

export function toggleAddMemberModal(id) {
    return {
        type: '@GROUPITEM/TOOGLE_ADDMEMBER_MODAL',
        id: id
    };
}

function startLoading_grouplist() {
    return {
        type: '@GROUPLIST/START_LOADING'
    };
}

function startLoading_chatroom() {
    return {
        type: '@CHATROOM/START_LOADING'
    };
}

function startLoading_chatroom_hid() {
    return {
        type: '@CHATROOM_HID/START_LOADING'
    };
}

function endLoading_grouplist() {
    return {
        type: '@GROUPLIST/END_LOADING'
    };
}

export function listGroups(searchText, username) {
    return (dispatch, getState) => {
      dispatch(startLoading_grouplist());
      return listGroupsFromApi(searchText, username).then(groups => {
            dispatch(getGroups(groups));
        }).catch(err => {
            console.error('Error listing posts', err);
        });
    };
}

export function createGroup(name, username_login, searchText) {
    return (dispatch, getState) => {
      return createGroupFromApi(name,  username_login).then(group => {
        dispatch(listGroups(searchText,  username_login));
    }).catch(err => {
        console.error('Error creating posts', err);
    });
  };
}

export function recordusername(username){
  return {
      type: '@CHATLIST/USERNAME',
      username
  };
}

function getGroups(groups) {
    return {
        type: '@GROUPLIST/GET_GROUPS',
        groups
    };
}
export function addGroupUser(id, username){

}
export function deleteGroup(id, searchText, username) {
    return (dispatch, getState) => {
      return deleteGroupFromApi(id, username).then(() => {
        dispatch(clearchats_hid());
        dispatch(clearchats());
        dispatch(listGroups(searchText, username));
    }).catch(err => {
        console.error('Error deleting posts', err);
    });
  };
}

export function addMembers(id, username, username_login) {
  return (dispatch, getState) => {
    return addGroupMembersFromApi(id, username, username_login).then(groups => {
      if(groups==='no_exist'){
        ToastAndroid.show('沒有此用戶名稱', ToastAndroid.SHORT);
      }
      else{
        dispatch(listGroups('',username_login));
        ToastAndroid.show('成功新增成員', ToastAndroid.SHORT);
      }
  }).catch(err => {
      console.error('Error Username', err);
  });
};
}

export function DeleteMembers(id, username, username_login) {
  return (dispatch, getState) => {
    return deleteGroupMembersFromApi(id, username, username_login).then(groups => {
      if(groups==='no_exist'){
        ToastAndroid.show('沒有此用戶名稱', ToastAndroid.SHORT);
      }
      else{
        dispatch(listGroups('', username_login));
        ToastAndroid.show('成功刪除成員', ToastAndroid.SHORT);
      }
  }).catch(err => {
      console.error('Error Username', err);
  });
};
}

export function listChats(id, searchText) {
    return (dispatch, getState) => {
      return listChatsFromApi(id ,searchText, false).then(chats => {
            dispatch(getChats(chats));
        }).catch(err => {
            console.error('Error listing chats', err);
        });
    };
}


export function createChat(id, username, searchText) {
    return (dispatch, getState) => {
      return createChatFromApi(id, username, searchText, false).then(() => {
        dispatch(listChats(id, searchText));

    }).catch(err => {
        console.error('Error creating chats', err);
    });
  };
}

export function listChats_hid(id, searchText) {
    return (dispatch, getState) => {
      return listChatsFromApi(id ,searchText, true).then(chats => {
            dispatch(getChats_hid(chats));
        }).catch(err => {
            console.error('Error listing chats', err);
        });
    };
}

export function createChat_hid(id, username, searchText) {
    return (dispatch, getState) => {
      return createChatFromApi(id, username, searchText, true).then(() => {
        dispatch(openHiddenChatroom());
        dispatch(listChats_hid(id, searchText));
    }).catch(err => {
        console.error('Error creating chats', err);
    });
  };
}
export function changeChatroom(group, searchText){
    return (dispatch, getState) => {
      dispatch(closeHiddenChatroom());
      dispatch(changeChatroomGroup(group));
      dispatch(listChats(group.id, searchText));
    };
}
function getChats(chats) {
    return {
        type: '@CHATROOM/GET_CHATS',
        chats
    };
}

function getChats_hid(chats) {
    return {
        type: '@CHATROOM_HID/GET_CHATS',
        chats
    };
}

function changeChatroomGroup(group){
  return{
    type: '@CHATROOM/CHANGE_CHATROOM',
    group: group
  };
}

export function changeHiddenChatroom(group, searchText){
    return (dispatch, getState) => {
      dispatch(openHiddenChatroom());
      dispatch(listChats_hid(group.id, searchText));
    };
}

export function openHiddenChatroom(){
  return{
    type: '@CHATLIST/OPEN_HIDDENCHATROOM'
  };
}

export function closeHiddenChatroom(){
  return{
    type: '@CHATLIST/CLOSE_HIDDENCHATROOM'
  };
}
function clearchats(){
  return{
    type: '@CHATROOM/CLEAR_CHATS'
  };
}
function clearchats_hid(){
  return{
    type: '@CHATROOM_HID/CLEAR_CHATS'
  }
}
