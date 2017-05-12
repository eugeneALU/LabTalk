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

    }

    render() {
      const {chats_hid} = this.props;
      let children = (
          <ListGroupItem className='empty d-flex justify-content-center align-items-center' >
              <div className='empty-text'>No Conversation here.</div>
          </ListGroupItem>

      );
      if (chats_hid.length) {
        children = chats_hid.map(p => (
            <ListGroupItem key={p.id} action>
                <ChatItem_HID {...p} />
            </ListGroupItem>
        ));
      }
      return(
        <div>
        <h1>Disccusion Room</h1>
          <div className='chat-list'>
                <ListGroup>{children}</ListGroup>
          </div>
        </div>
      );
    }


}

export default connect((state) => {
    return {
        ...state.chatroom,
        ...state.chatroom_hid
    };
})(ChatRoom_HID);
