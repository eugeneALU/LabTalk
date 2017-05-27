import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import './Calendar.css';
import {toogle_Schdule, next_week, toggle_modal_activity, update_date,
        changeTitle, changeTime, changeData, submitActivity, select_by_group} from 'states/calendar-actions.js';
import {Button,
        Input,
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter
} from 'reactstrap';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        moment.locale('zh-tw');

        this.toggle_modal = this.toggle_modal.bind(this);
        this.nextweek = this.nextweek.bind(this);
        this.toggle_schdule = this.toggle_schdule.bind(this);
        this.TitleChange = this.TitleChange.bind(this);
        this.TimeChange = this.TimeChange.bind(this);
        this.DataChange = this.DataChange.bind(this);
        this.buildActivity =  this.buildActivity.bind(this);
    }

    render() {
        let obj;
        let activity_all =[];
        let key;
        let display_item = (
            <div className="activity">
                <p className="display_title"></p>
                <p className="display_time"></p>
            </div>
        );
      if(this.props.activity.length >0){
       activity_all =this.props.activity.map(p => {
          return <div key={`${p.group_id}${p.title}${p.time}`} className="act ml-2">
         <p className="display_day">{p.day}</p>
         <p className="display_title">標題:{p.title}</p>
         <p className="display_time">時間:{p.time}</p>
     </div>

        });
      }
        // if (this.props.activity.length) {
/*            for (key in  this.props.activity){
                 activity_all += (
                 <div key1={this.props.activity.group_id} className="act">
                <p className="display_day">{this.props.activity[key].day}</p>
                <p className="display_title">標題:{this.props.activity[key].title}</p>
                <p className="display_time">時間:{this.props.activity[key].time}</p>
            </div>

                 );*/
            /*}
        activity_all = this.props.activity.map(p => (
            <div key={p.group_id} className="act">
                <p className="display_day">{p.day}</p>
                <p className="display_title">標題:{p.title}</p>
                <p className="display_time">時間:{p.time}</p>
            </div>
        ));
      }*/
        // }


        let calendar_start =  moment().add(this.props.numindex, 'days').format("MMM Do");
        let year =  moment().add(this.props.numindex, 'days').format("YYYY");
        let calendar_end = moment().add(this.props.numindex+6, 'days').format("MMM Do");

        if (this.props.toggle_schdule) {
            obj = (
                <div className="d-flex flex-column" id="Calendar">
                <br/>
                <img id="schdule" onClick={this.toggle_schdule} className="ml-auto mr-auto" src="./image/icon for calendar/calendar-with-a-clock.png" />
                {activity_all}<hr/>
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
                        <li className="list-group-item day p-0" onClick={(e) =>this.toggle_modal(0)}>
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.props.numindex, 'days').format("dddd")}</p>
                                       <p className="date mb-0">{moment().add(this.props.numindex, 'days').format("Do")}</p>
                                    </div>
                                </div>
                                <div className="display_calendar d-flex flex-row">

                                </div>
                            </div>
                        </li>
                        <li className="list-group-item day p-0" onClick={(e) =>this.toggle_modal(1)}>
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.props.numindex+1, 'days').format("dddd")}</p>
                                       <p className="date mb-0">{moment().add(this.props.numindex+1, 'days').format("Do")}</p>
                                    </div>
                                </div>
                                <div className="display_calendar d-flex flex-row">

                                </div>
                            </div>
                        </li>
                        <li className="list-group-item day p-0" onClick={(e) =>this.toggle_modal(2)}>
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.props.numindex+2, 'days').format("dddd")}</p>
                                       <p className="date mb-0">{moment().add(this.props.numindex+2, 'days').format("Do")}</p>
                                    </div>
                                </div>
                                <div className="display_calendar d-flex flex-row">

                                </div>
                            </div>
                        </li>
                        <li className="list-group-item day p-0" onClick={(e) =>this.toggle_modal(3)}>
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.props.numindex+3, 'days').format("dddd")}</p>
                                       <p className="date mb-0">{moment().add(this.props.numindex+3, 'days').format("Do")}</p>
                                    </div>
                                </div>
                                <div className="display_calendar d-flex flex-row">

                                </div>
                            </div>
                        </li>
                        <li className="list-group-item day p-0" onClick={(e) =>this.toggle_modal(4)}>
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.props.numindex+4, 'days').format("dddd")}</p>
                                       <p className="date mb-0">{moment().add(this.props.numindex+4, 'days').format("Do")}</p>
                                    </div>
                                </div>
                                <div className="display_calendar d-flex flex-row">

                                </div>
                            </div>
                        </li>
                        <li className="list-group-item day p-0" onClick={(e) =>this.toggle_modal(5)}>
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.props.numindex+5, 'days').format("dddd")}</p>
                                       <p className="date mb-0">{moment().add(this.props.numindex+5, 'days').format("Do")}</p>
                                    </div>
                                </div>
                                <div className="display_calendar d-flex flex-row">

                                </div>
                            </div>
                        </li>
                        <li className="list-group-item day p-0" onClick={(e) =>this.toggle_modal(6)}>
                            <div className="d-flex flex-row date-display">
                                <div id="today" className="d-flex align-items-center">
                                   <div className="mt-auto mb-auto">
                                       <p className="date mb-0">{moment().add(this.props.numindex+6, 'days').format("dddd")}</p>
                                       <p className="date mb-0">{moment().add(this.props.numindex+6, 'days').format("Do")}</p>
                                    </div>
                                </div>
                                <div className="display_calendar d-flex flex-row">

                                </div>
                            </div>
                        </li>
                        <li id="next"className="list-group-item">
                            <i onClick={this.nextweek} className="ml-auto mx-auto fa fa-angle-double-down fa-2x" aria-hidden="true"></i>
                        </li>
                    </ul>
                        <Modal isOpen={this.props.modal_activity} toggle={this.toggle_modal}>
                        <ModalHeader toggle={this.toggle_modal}>{moment().add(this.props.numindex+this.props.day, 'days').format("dddd Do")}</ModalHeader>
                        <ModalBody>
                        <Input value ={this.props.newtitle} onChange={this.TitleChange} placeholder='標題' type="text" className='col-10 m-auto'/>
                            <br/>
                            <Input value ={this.props.newtime} onChange={this.TimeChange} placeholder='時間' type="text" className='col-10 m-auto'/>
                            <br/>
                            <Input value ={this.props.newdata} onChange={this.DataChange} placeholder='詳細資料' type="text" className='col-10 m-auto'/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.buildActivity}  color="danger" className='col-4 m-auto'>新增</Button>
                        </ModalFooter>
                        </Modal>
                 </div>
            );
        }

        return (
        <div className="calendar_">
            {obj}
        </div>
        );
    }

    toggle_modal(day) {
        this.props.dispatch(toggle_modal_activity());
        this.props.dispatch(update_date(day));
    }

    toggle_schdule(){
        this.props.dispatch(toogle_Schdule());
    }

    nextweek(){
        this.props.dispatch(next_week());
    }

    TitleChange(e){
        var texts=e.target.value;
        this.props.dispatch(changeTitle(texts));
    }

    TimeChange(e){
        var texts = e.target.value;
        this.props.dispatch(changeTime(texts));
    }

    DataChange(e){
        var texts = e.target.value;
        this.props.dispatch(changeData(texts));
    }

    buildActivity(){
        if(!this.props.group.id){
        alert('請選擇群組');
        }
        else if(! this.props.newtitle){
        alert('請輸入標題');
        }
        else if(!this.props.newtime){
        alert('請輸入時間');
        }
        else{
        this.props.dispatch(submitActivity(
            this.props.newtitle,
            this.props.newtime,
            this.props.newdata,
            this.props.group.id,
            moment().add(this.props.numindex+this.props.day, 'days').format("YYYY dddd Do")
        ));
        }
    }
}


export default connect((state) => {
    return {
        ...state.chatroom,
        ...state.calendar,
        ...state.activity,
        ...state.calendar,
        ...state.newactivity
    };
})(Calendar);
