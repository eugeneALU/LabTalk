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

      hiddenchatroom_open : PropTypes.bool

  };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.dispatch(listGroups(''));
    }
    render() {
      const {hiddenchatroom_open} = this.props;
      let chat_list = ('');
      if(hiddenchatroom_open){
        chat_list = (<Row>
          <Col xs="3"><GroupList/></Col>
          <Col xs="5"><ChatRoom/></Col>
          <Col xs="4"><ChatRoom_HID/></Col>
        </Row>);
      }
      else {
        chat_list = (<Row>
          <Col xs="4"><GroupList/></Col>
          <Col xs="7"><ChatRoom/></Col>
          <Col xs="1"></Col>
        </Row>);
      }
      return(
          <div>
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
