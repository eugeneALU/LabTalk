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

        this.state = {
            intervalId: {}
        };

        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.inittimer = this.inittimer.bind(this);
        this.timer = this.timer.bind(this);

    }
    componentDidMount() {
          this.inittimer();

      }
      componentWillUnMount() {
          clearInterval(this.state.intervalId);
      }
      shouldComponentUpdate(nextProps, nextState) {
          if (nextProps.chats_hid.length !== this.props.chats_hid.length) {
              return true;
          } else {
              return false;
          }
      }
      componentDidUpdate() {
          this.scrollToBottom();

      }
    render() {
      const {chats_hid} = this.props;
      let children = (
          <div className='empty d-flex justify-content-center align-items-center' >
              <div className='empty-text'>尚未有任何對話...</div>
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
        <div className="ml-auto">
          <div className='chat-list-hid'>
                <div className="d-flex flex-column-reverse">{children}</div>
                <div ref={(el) => { this.messagesEnd = el; }}>{''}</div>
          </div>
        </div>
      );
    }

    scrollToBottom() {
          const node = ReactDOM.findDOMNode(this.messagesEnd);
          node.scrollIntoView();
      }

      inittimer() {
          var intervalId = setInterval(this.timer, 3000);
          this.setState({intervalId: intervalId});
      }

      timer() {
          const {group, dispatch} = this.props;
          if (group.id) {
              dispatch(listChats_hid(group.id, ''));
          }
      }


}

export default connect((state) => {
    return {
        ...state.chatroom,
        ...state.chatroom_hid
    };
})(ChatRoom_HID);
