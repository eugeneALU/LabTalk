import React from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'reactstrap';
import Calendar from 'components/Calendar.jsx';
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
        this.props.dispatch(listGroups('',this.props.username_login));
    }


    render() {
<<<<<<< HEAD
=======
      const {calendar, hiddenchatroom_open} =this.props;



>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
      return(
          <div className="d-flex justify-content-end">
            <div id="grouplist"><GroupList/></div>
            <div id="chatroom"><ChatRoom/></div>
          </div>
      );
    }
}

export default connect((state) => {
    return {
        ...state.grouplist,
<<<<<<< HEAD
        ...state.chatlist
=======
        ...state.chatlist,
        ...state.calendar
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
    };
})(ChatList);
