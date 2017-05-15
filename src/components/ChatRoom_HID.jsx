import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';
import ChatItem_HID from 'components/ChatItem_HID.jsx';


import './ChatRoom_HID.css';


class ChatRoom_HID extends React.Component {
  static propTypes = {
      chatroom_id: PropTypes.string,
      chats_hid: PropTypes.array,
      dispatch: PropTypes.func

  };
    constructor(props) {
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);

    }
    componentDidMount(){
      this.scrollToBottom();

    }
  componentDidUpdate() {
    this.scrollToBottom();

  }
    render() {
      const {chats_hid} = this.props;
      let children = (
          <div className='empty d-flex justify-content-center align-items-center' >
              <div className='empty-text'>No Conversation here.</div>
          </div>

      );
      if (chats_hid.length) {
        children = chats_hid.map(p => (
            <div key={p.id} action>
                <ChatItem_HID {...p} />
            </div>
        ));
      }
      return(
        <div>
        <h1>Disccusion Room</h1>
          <div className='chat-list-hid'>
                <div className="d-flex flex-column-reverse">{children}</div>
                <div ref={(el) => { this.messagesEnd = el; }}>{''}</div>
          </div>
        </div>
      );
    }

    scrollToBottom(){
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView();
    }


}

export default connect((state) => {
    return {
        ...state.chatroom,
        ...state.chatroom_hid
    };
})(ChatRoom_HID);
