import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import './Calendar.css';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        moment.locale('zh-tw');

        this.state = {
            toggle_schdule: true,
            numindex: 0
        };

        this.toggle_schdule = this.toggle_schdule.bind(this);
        this.nextweek = this.nextweek.bind(this);
    }

    toggle_schdule(){
        this.setState({
            toggle_schdule : !this.toggle_schdule
        })
    }

    nextweek(){
        this.setState({
            numindex : this.state.numindex+7
        })
    }

    render() {
        let obj;
        let weeknumber = moment().weeks();
        let dddd = moment().weeks(19).format('dddd');
        let day = moment().week(19).format('MMM Do');
        let calendar_start =  moment().add(this.state.numindex, 'days').format("MMM Do");
        let year =  moment().add(this.state.numindex, 'days').format("YYYY");
        let calendar_end = moment().add(this.state.numindex+7, 'days').format("MMM Do");
        console.log(this.state.numindex)

        if (this.state.toggle_schdule) {
            obj = (
                <div className="d-flex flex-column" id="Calendar">
                <img id="schdule" className="ml-auto mr-auto" src="./image/icon for Calendar/Calendar-with-a-clock.png" />
                {/*<activity />*/}
                <img id="add" onClick={this.toggle_schdule} className="ml-auto mr-auto" src="./image/icon for Calendar/add-button.png" />
                </div>
            );
        }

        else {
            obj = (
                 <div className="d-flex flex-column" id="Calendar_set">
                    <ul id="ul" className="list-group">
                        <li id="calendar_index" className="list-group-item">
                            <div>
                                <p className="display">{calendar_start} - {calendar_end}</p>
                                <p className="display">{year}</p>
                            </div>
                        </li>
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.state.numindex, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex, 'days').format("Do")}</p>
                                    </div>
                                </div>
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.state.numindex+1, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+1, 'days').format("Do")}</p>
                                    </div>
                                </div>
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.state.numindex+2, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+2, 'days').format("Do")}</p>
                                    </div>
                                </div>
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.state.numindex+3, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+3, 'days').format("Do")}</p>
                                    </div>
                                </div>
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.state.numindex+4, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+4, 'days').format("Do")}</p>
                                    </div>
                                </div>
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.state.numindex+5, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+5, 'days').format("Do")}</p>
                                    </div>
                                </div>
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.state.numindex+6, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+6, 'days').format("Do")}</p>
                                    </div>
                                </div>
                            </div>
                        </li>   
                        <li id="next"className="list-group-item">
                            <i onClick={this.nextweek} className="ml-auto mx-auto fa fa-angle-double-down fa-2x" aria-hidden="true"></i>
                        </li>
                    </ul>
                 </div>
            );
        }

        return (
        <div>
            {obj}
        </div>
        );
    }
}

export default connect()(Calendar);