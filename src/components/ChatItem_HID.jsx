import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';



import './ChatItem_HID.css';

class ChatItem_HID extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        username: PropTypes.string
    };

    constructor(props) {
        super(props);

    }

    render(){
      const {text, username} = this.props;
      return(
        <p>{username} : {text}</p>
      );
    }
}

export default connect((state) => {
    return {
        ...state.chatroom_hid,
    };
})(ChatItem_HID);
