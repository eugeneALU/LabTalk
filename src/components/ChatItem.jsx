import React from 'react';
import PropTypes from 'prop-types';


import {connect} from 'react-redux';



import './ChatItem.css';

class ChatItem extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        username: PropTypes.string,
        username_login: PropTypes.string,
        ts: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.change_ts_to_time = this.change_ts_to_time.bind(this);
        this.change_ts_to_date = this.change_ts_to_date.bind(this);
        this.handle_string_length = this.handle_string_length.bind(this);
    }

    render(){
      const {text, username, ts, username_login} = this.props;
      let TimeString = this.change_ts_to_time(ts*1000).concat(' ',this.change_ts_to_date(ts*1000));


      let username_display = username;
      let flex = 'd-flex flex-row';
      let username_style = 'chat-username-other m-2';
      let text_style = 'chat-text-other m-2';
      if(username === username_login){
        username_display = 'Me';
        text_style = 'chat-text-me m-2';
        username_style = 'chat-username-me m-2';
        flex = 'd-flex flex-row-reverse';
      }




      return(
      <div className={flex}>
      <a className={username_style}>{username_display}</a>{' '}<div title={TimeString} className={text_style} style={{width:this.handle_string_length()}}>{text}</div>
      </div>
      );
    }

    change_ts_to_time(ts){
      var time = new Date(ts);
      return time.toLocaleTimeString();
    }

    change_ts_to_date(ts){
      var time = new Date(ts);
      return time.toLocaleDateString();
    }

    handle_string_length(){
      const {text} = this.props;

      if (text.length < 30){
        return `${text.length+1}rem`;
      }
      else{
        return '60%';
      }
    }

}

export default connect((state) => {
    return {
        ...state.chatroom,
        ...state.chatlist
    };
})(ChatItem);
