import React from 'react';
import ChatRoom_HID from 'components/ChatRoom_HID.jsx';
import Calendar from 'components/Calendar.jsx';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';

import './ChatRoom.css';
import ChatItem from 'components/ChatItem.jsx';
import {createChat, changeHiddenChatroom, closeHiddenChatroom, createChat_hid, changeChatroom, listChats} from 'states/group-actions.js';
import {toggle_Calendar} from 'states/calendar-actions.js';

class ChatRoom extends React.Component {
     static propTypes = {
        chats: PropTypes.array,
        hiddenchatroom_open: PropTypes.bool,
        username_login: PropTypes.string,
        dispatch: PropTypes.func
     }

    constructor(props) {
        super(props);

        this.state = {
          intervalId : {}
        };
        this.toggle = this.toggle.bind(this);
        this.handle_chat_submit = this.handle_chat_submit.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.inittimer = this.inittimer.bind(this);
        this.timer = this.timer.bind(this);
    }

    componentDidMount(){
      this.inittimer();

    }

    componentWillUnMount(){
      clearInterval(this.state.intervalId);
    }
    shouldComponentUpdate(nextProps, nextState){
      if((nextProps.chats.length !== this.props.chats.length) || (nextProps.group.id != this.props.group.id)){
        return true;
      }
      else if(nextProps.hiddenchatroom_open !== this.props.hiddenchatroom_open){
        return true;
      }
      else if(nextProps.calendar !== this.props.calendar){
        return true;
      }
      else{
        return false;
      }
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
       const {chats, dispatch, group, username_login, hiddenchatroom_open, calendar} = this.props;
       let children = (
          <div className='empty d-flex justify-content-center align-items-center' >
              <span className='empty-text'>尚未有任何對話...</span>
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
      let groupname = group.name ? group.name : "LABTALK" ;

      if(group.usernames) {
         members = group.usernames.map(p => {
            if(p.username !== username_login)
              return <a className="group-members ml-2" key={p.username+p.id}>{p.username}</a>
          });
      }

      return(
        <div className="d-flex flex-column">
          <div className="d-flex flex-row">
            <div className="roomtitle d-flex justify-content-center">
              <p id="title">{groupname}</p>
            </div>
            <div className="Calendartitle d-flex justify-content-center">
              <img onClick={this.toggle} id="Calendar_icon" src="./image/icon for calendar/write-board-white.png"/>
            </div>
          </div>
          <div className="d-flex justify-content-end">

            <div className="chatroom mr-auto">
              <div className='chat-list'>
                  <div className="d-flex flex-column-reverse">{children}</div>
                  <div ref={(el) => { this.messagesEnd = el; }}>{''}</div>
              </div>
              <div>
                <InputGroup>
                  <Input type="text"  getRef={(e)=>(this.chatEL=e)} onKeyPress={this.handleSearchKeyPress} placeholder="輸入訊息...  <使用 @ 開啟/關閉內嵌討論室>"/>
                </InputGroup>
              </div>
            </div>
            {this.props.hiddenchatroom_open ? <ChatRoom_HID /> : null}
            {this.props.calendar ? <Calendar /> : null}
          </div>
        </div>
      )
    }

    toggle(){
      this.props.dispatch(toggle_Calendar());
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

    scrollToBottom(){
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView();
    }

    inittimer(){
      var intervalId = setInterval(this.timer, 3000);
      this.setState({intervalId: intervalId});
    }

    timer(){
      const{group, dispatch} = this.props;
      if(group.id){
        dispatch(listChats(group.id, ''));
      }
    }

}

export default connect((state) => {
    return {
        ...state.chatroom,
        ...state.chatlist,
        ...state.calendar
    };
})(ChatRoom);
