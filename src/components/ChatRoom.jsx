import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';

import ChatItem from 'components/ChatItem.jsx';
import {createChat, changeHiddenChatroom, closeHiddenChatroom, createChat_hid, changeChatroom, listChats} from 'states/group-actions.js';

import './ChatRoom.css';


class ChatRoom extends React.Component {
    static propTypes = {
        chats: PropTypes.array,
        hiddenchatroom_open: PropTypes.bool,
        username_login: PropTypes.string,
        dispatch: PropTypes.func

    };
    constructor(props) {
        super(props);
        this.handle_chat_submit = this.handle_chat_submit.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);

    }

    render() {
      const {chats, dispatch, group} = this.props;


      let children = (
          <div className='empty d-flex justify-content-center align-items-center' >
              <span className='empty-text'>No Conversation here.</span>
          </div>

      );
      if (chats.length) {
        children = chats.map(p => (
            <div key={p.id} action>
                <ChatItem {...p} />
            </div>
        ));
      }

      let members = '';
      let groupname = group.name;



        if(group.usernames) {
          members = group.usernames.map(p => (
            <a className="group-members ml-2" key={p.username+p.id}>{p.username}</a>
          ));

        }



      return(
        <div className="chatroom">
        <center><h1>{groupname}</h1></center>
        <div><a className="group-member mt-1">Members</a>{members}</div><br/>
        <div className='chat-list mt-2'>
              <div>{children}</div>
        </div>
        <div>
          <InputGroup>
            <Input type="text"  getRef={(e)=>(this.chatEL=e)} onKeyPress={this.handleSearchKeyPress} placeholder="Say Something  <Use '@' to open/close the dicussion room>"/>
            <Button color="info" onClick={this.handle_chat_submit}>Submit</Button>
        </InputGroup>

        </div>

        </div>
      );
    }

    handle_chat_submit(){
      if(this.chatEL.value==='@' && this.props.hiddenchatroom_open){
          this.props.dispatch(closeHiddenChatroom());
          this.chatEL.value='';
      }
      else if(this.chatEL.value==='@' && !(this.props.hiddenchatroom_open)){
          this.props.dispatch(changeHiddenChatroom(this.props.group, ""));
          this.chatEL.value='@';
      }
      else if(this.chatEL.value.match(/^@/)){
        var string_input =  this.chatEL.value.replace(/^@/, '');
        this.props.dispatch(createChat_hid(this.props.group.id, this.props.username_login, string_input));
        this.chatEL.value='@';
      }
      else if(this.chatEL.value){
        this.props.dispatch(createChat(this.props.group.id, this.props.username_login, this.chatEL.value));
        this.chatEL.value='';
      }
      else{

      }
    }

      handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13){
            this.handle_chat_submit();
        }


    }



}

export default connect((state) => {
    return {
        ...state.chatroom,
        ...state.chatlist
    };
})(ChatRoom);
