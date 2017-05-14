import React from 'react';
import Calendar from 'components/Calendar.jsx';
import {connect} from 'react-redux';

import './ChatRoom.css';



class ChatRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          Calendar:false
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle(){
      this.setState({
        Calendar: !this.state.Calendar
      });
    }

    render() {
 
      return(
        <div className="d-flex flex-column">
          <div className="d-flex flex-row">
            <div className="roomtitle d-flex justify-content-center">
              <p id="title" className="">LabTalk</p>
            </div>
            <div className="Calendartitle d-flex justify-content-center">
              <img onClick={this.toggle} id="Calendar_icon" src="./image/icon for Calendar/write-board.png"/>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            {/*<Chat/>*/}
            {this.state.Calendar ? <Calendar /> : null}
          </div>
        </div>
      )
    }
}

export default connect()(ChatRoom);
