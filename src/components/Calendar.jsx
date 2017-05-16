import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import './Calendar.css';
<<<<<<< HEAD
=======
import {toogle_Schdule, next_week} from 'states/calendar-actions.js';
import{
  changeAccountName,
  changeAccountPassword,
  changeAccountEmail,
  submitAccount
} from 'states/newAccount-action.js';
import {Button,
        Input,
        Modal, 
        ModalHeader, 
        ModalBody, 
        ModalFooter
} from 'reactstrap';

>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        moment.locale('zh-tw');

<<<<<<< HEAD
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
=======
        this.toggle_schdule = this.toggle_schdule.bind(this);
        this.nextweek = this.nextweek.bind(this);
        this.toggle = this.toggle.bind(this);
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
    }

    render() {
        let obj;
<<<<<<< HEAD
        let weeknumber = moment().weeks();
        let dddd = moment().weeks(19).format('dddd');
        let day = moment().week(19).format('MMM Do');
        let calendar_start =  moment().add(this.state.numindex, 'days').format("MMM Do");
        let year =  moment().add(this.state.numindex, 'days').format("YYYY");
        let calendar_end = moment().add(this.state.numindex+7, 'days').format("MMM Do");
        console.log(this.state.numindex)

        if (this.state.toggle_schdule) {
=======

        let calendar_start =  moment().add(this.props.numindex, 'days').format("MMM Do");
        let year =  moment().add(this.props.numindex, 'days').format("YYYY");
        let calendar_end = moment().add(this.props.numindex+7, 'days').format("MMM Do");
        console.log(this.props.numindex)

        if (this.props.toggle_schdule) {
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
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
<<<<<<< HEAD
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.state.numindex, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex, 'days').format("Do")}</p>
                                    </div>
                                </div>
=======
                        <li className="list-group-item day p-0" onClick={this.toggle}>
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.props.numindex, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.props.numindex, 'days').format("Do")}</p>
                                    </div>
                                </div>
                                <div id="try">
                                    <p>oaijergi</p>
                                </div>
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
<<<<<<< HEAD
                                       <p className="date mb-0">{moment().add(this.state.numindex+1, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+1, 'days').format("Do")}</p>
=======
                                       <p className="date mb-0">{moment().add(this.props.numindex+1, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.props.numindex+1, 'days').format("Do")}</p>
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
                                    </div>
                                </div>
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
<<<<<<< HEAD
                                       <p className="date mb-0">{moment().add(this.state.numindex+2, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+2, 'days').format("Do")}</p>
=======
                                       <p className="date mb-0">{moment().add(this.props.numindex+2, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.props.numindex+2, 'days').format("Do")}</p>
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
                                    </div>
                                </div>
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
<<<<<<< HEAD
                                       <p className="date mb-0">{moment().add(this.state.numindex+3, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+3, 'days').format("Do")}</p>
=======
                                       <p className="date mb-0">{moment().add(this.props.numindex+3, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.props.numindex+3, 'days').format("Do")}</p>
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
                                    </div>
                                </div>
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
<<<<<<< HEAD
                                       <p className="date mb-0">{moment().add(this.state.numindex+4, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+4, 'days').format("Do")}</p>
=======
                                       <p className="date mb-0">{moment().add(this.props.numindex+4, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.props.numindex+4, 'days').format("Do")}</p>
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
                                    </div>
                                </div>
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
<<<<<<< HEAD
                                       <p className="date mb-0">{moment().add(this.state.numindex+5, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+5, 'days').format("Do")}</p>
=======
                                       <p className="date mb-0">{moment().add(this.props.numindex+5, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.props.numindex+5, 'days').format("Do")}</p>
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
                                    </div>
                                </div>
                            </div>
                        </li> 
                        <li className="list-group-item day p-0">
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
<<<<<<< HEAD
                                       <p className="date mb-0">{moment().add(this.state.numindex+6, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.state.numindex+6, 'days').format("Do")}</p>
=======
                                       <p className="date mb-0">{moment().add(this.props.numindex+6, 'days').format("dddd")}</p> 
                                       <p className="date mb-0">{moment().add(this.props.numindex+6, 'days').format("Do")}</p>
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
                                    </div>
                                </div>
                            </div>
                        </li>   
                        <li id="next"className="list-group-item">
                            <i onClick={this.nextweek} className="ml-auto mx-auto fa fa-angle-double-down fa-2x" aria-hidden="true"></i>
                        </li>
                    </ul>
<<<<<<< HEAD
=======
                    <Modal isOpen={this.props.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                    <Input value ={this.props.newtitle} onChange={this.NameChange} placeholder='標題' type="text" className='col-10 m-auto'/>
                        <br/>
                        <Input value ={this.props.newtime} onChange={this.PasswordChange} placeholder='時間' type="text" className='col-10 m-auto'/>
                        <br/>
                        <Input value ={this.props.newdata} onChange={this.EmailChange} placeholder='詳細資料' type="text" className='col-10 m-auto'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.buildActivity} outline color="warning" className='col-4 m-auto'>新增</Button>
                    </ModalFooter>
                    </Modal>
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
                 </div>
            );
        }

        return (
        <div>
            {obj}
        </div>
        );
    }
<<<<<<< HEAD
}

export default connect()(Calendar);
=======

    toggle() {
        this.props.dispatch(toggle(this.props.modal));
    }

    toggle_schdule(){
        this.props.dispatch(toogle_Schdule());
    }

    nextweek(){
        this.props.dispatch(next_week());
    }
}

export default connect((state) => {
    return {
        ...state.chatroom,
        ...state.calendar
    };
})(Calendar);
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
