import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';

import ChatItem from 'components/ChatItem.jsx';
import {createChat, openHiddenChatroom, closeHiddenChatroom, createChat_hid} from 'states/group-actions.js';

import './ChatRoom.css';


class ChatRoom extends React.Component {
    static propTypes = {
        chats: PropTypes.array,
        hiddenchatroom_open: PropTypes.bool,
        dispatch: PropTypes.func

    };
    constructor(props) {
        super(props);

        this.handle_chat_submit = this.handle_chat_submit.bind(this);
    }


    render() {
      const {chats, dispatch, group} = this.props;
      let children = (
          <ListGroupItem className='empty d-flex justify-content-center align-items-center' >
              <div className='empty-text'>No Conversation here.</div>
          </ListGroupItem>

      );
      if (chats.length) {
        children = chats.map(p => (
            <ListGroupItem key={p.id} action>
                <ChatItem {...p} />
            </ListGroupItem>
        ));
      }

      let members = '';
      let Members = '';
      let groupname = '';

      if(group){
        Members = 'MEMBERS';
        groupname = group.name;
        if(group.usernames) {
          members = group.usernames.map(p => (
            <a className="group-members ml-2" key={p.username+p.id}>{p.username}</a>
          ));
        }
      }

      return(
        <div>
        <center><h1>{groupname}</h1></center>
        <div><a className="group-member mt-1">{Members}</a>{members}</div>
        <div className='chat-list mt-2'>
              <ListGroup>{children}</ListGroup>
        </div>
        <div>
          <InputGroup>
            <Input type="text"  getRef={(e)=>(this.chatEL=e)} placeholder="To Say Something ~"/>
            <Button color="info" onClick={this.handle_chat_submit}>Submit</Button>
        </InputGroup>

        </div>

        </div>
      );
    }

    handle_chat_submit(e){
      if(this.chatEL.value==='@' && this.props.hiddenchatroom_open){
          this.props.dispatch(closeHiddenChatroom());
          this.chatEL.value='';
      }
      else if(this.chatEL.value==='@' && !(this.props.hiddenchatroom_open)){
          this.props.dispatch(openHiddenChatroom());
          this.chatEL.value='@';
      }
      else if(this.chatEL.value.match(/^@/)){
        this.props.dispatch(createChat_hid(this.props.group.id, "Me", this.chatEL.value));
        this.chatEL.value='@';
      }
      else if(this.chatEL.value){
        this.props.dispatch(createChat(this.props.group.id, "Me", this.chatEL.value));
        this.chatEL.value='';
      }
      else{
        
      }

    }


}

export default connect((state) => {
    return {
        ...state.chatroom,
        ...state.chatlist
    };
})(ChatRoom);
