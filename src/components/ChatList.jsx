import React from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'reactstrap';
import GroupList from 'components/GroupList.jsx';
import ChatRoom from 'components/ChatRoom.jsx';
import {listGroups} from 'states/group-actions.js';

import './ChatList.css';

class ChatList extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.props.dispatch(listGroups(''));
    }
    render() {
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
    };
})(ChatList);
