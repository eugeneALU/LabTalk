import React from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'reactstrap';
import GroupList from 'components/GroupList.jsx';
import ChatRoom from 'components/ChatRoom.jsx';
import ChatRoom_HID from 'components/ChatRoom_HID.jsx';
import PropTypes from 'prop-types';
import {listGroups} from 'states/group-actions.js';

import './ChatList.css';

class ChatList extends React.Component {
  static propTypes = {

      hiddenchatroom_open : PropTypes.bool,
      username_login: PropTypes.string

  };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.dispatch(listGroups(''));
    }
    render() {
      const {hiddenchatroom_open, username_login} = this.props;

      let chat_list = ('');

      if(hiddenchatroom_open){
        chat_list = (<Row className="mt-2">
          <Col xs="3"><GroupList/></Col>
          <Col xs="4"><ChatRoom/></Col>
          <Col xs="4"><ChatRoom_HID/></Col>
          <Col xs="1"></Col>
        </Row>);
      }
      else {
        chat_list = (<Row className="mt-2">
          <Col xs="4"><GroupList/></Col>
          <Col xs="7"><ChatRoom/></Col>
          <Col xs="1"></Col>
        </Row>);
      }

      return(
          <div>
          <Row className="justify-content-center"><h2 className="labtalk mt-2 mb-1"><span className="lab">LAB</span>TALK</h2></Row>
          <Row className="justify-content-center mb-1"><p className="welcome-user">以{username_login}的身份使用</p></Row>
          {chat_list}
          </div>
      );
    }
}

export default connect((state) => {
    return {
        ...state.grouplist,
        ...state.chatlist
    };
})(ChatList);
