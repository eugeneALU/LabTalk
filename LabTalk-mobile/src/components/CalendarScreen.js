import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Text, View, ListView, Modal, ToastAndroid, TouchableNativeFeedback, Dimensions } from 'react-native';
import { Container, Content, List, ListItem, Form, Item, Input, Button } from 'native-base';
import {
    toogle_Schdule, next_week, prev_week, toggle_modal_activity, update_date,
    changeTitle, changeTime, changeData, submitActivity, select_by_group
} from '../states/calendar-actions.js';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import momentLocale from 'moment/locale/zh-tw';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class CalendarScreen extends React.Component {

    constructor(props) {
        super(props);
        moment.updateLocale('zh-tw', momentLocale);

        this.toggle_modal = this.toggle_modal.bind(this);
        this.toggle = this.toggle.bind(this);
        this.nextweek = this.nextweek.bind(this);
        this.prevweek = this.prevweek.bind(this);
        this.toggle_schdule = this.toggle_schdule.bind(this);
        this.TitleChange = this.TitleChange.bind(this);
        this.TimeChange = this.TimeChange.bind(this);
        this.DataChange = this.DataChange.bind(this);
        this.buildActivity = this.buildActivity.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(select_by_group(this.props.group.id));
    }

    render() {
        let obj = [];
        let items = [];
        let activity_1 = [];
        let activity_2 = [];
        let activity_3 = [];
        let activity_4 = [];
        let activity_5 = [];
        let activity_6 = [];
        let activity_7 = [];
        let key;

        if (this.props.activity.length > 0) {
            items = this.props.activity;
            for (i = 0; i < this.props.activity.length; i++) {
                if (this.props.activity[i].day == moment().add(this.props.numindex, 'days').format("YYYY dddd Do"))
                { activity_1.push(this.props.activity[i]); }
                else if (this.props.activity[i].day == moment().add(this.props.numindex + 1, 'days').format("YYYY dddd Do"))
                { activity_2.push(this.props.activity[i]); }
                else if (this.props.activity[i].day == moment().add(this.props.numindex + 2, 'days').format("YYYY dddd Do"))
                { activity_3.push(this.props.activity[i]); }
                else if (this.props.activity[i].day == moment().add(this.props.numindex + 3, 'days').format("YYYY dddd Do"))
                { activity_4.push(this.props.activity[i]); }
                else if (this.props.activity[i].day == moment().add(this.props.numindex + 4, 'days').format("YYYY dddd Do"))
                { activity_5.push(this.props.activity[i]); }
                else if (this.props.activity[i].day == moment().add(this.props.numindex + 5, 'days').format("YYYY dddd Do"))
                { activity_6.push(this.props.activity[i]); }
                else if (this.props.activity[i].day == moment().add(this.props.numindex + 6, 'days').format("YYYY dddd Do"))
                { activity_7.push(this.props.activity[i]); }
            }
        }
        console.log(activity_1);
        console.log(this.props.activity);
        // if 
        //     return  <div key={`${p.group_id}${p.title}${p.time}`} className="act ml-2">
        //         <p className="display_day">{p.day}</p>
        //         <p className="display_title">標題:{p.title}</p>
        //         <p className="display_time">時間:{p.time}</p>
        //     </div>


        let calendar_start = moment().add(this.props.numindex, 'days').format("MMM Do");
        let year = moment().add(this.props.numindex, 'days').format("YYYY");
        let calendar_end = moment().add(this.props.numindex + 6, 'days').format("MMM Do");

        obj = (
            <Content>
                <ListItem style={{ flex: 1, marginLeft: 0, paddingRight: 0, backgroundColor: "lightgray" }}>
                    <TouchableNativeFeedback onPress={this.prevweek}>
                        <View style={{ flex: 1, backgroundColor: "lightgray", alignItems: 'center', paddingVertical: 0 }}>
                            <Text style={{ textAlign: 'center', height: 40, alignItems: 'center' }}><Icon name="arrow-up" size={20} color="#000" /></Text>
                        </View>
                    </TouchableNativeFeedback>
                </ListItem>
                <ListItem itemDivider>
                    <Text>{calendar_start}{"  "} ~ {"  "}{calendar_end}</Text>
                    <Text> </Text>
                    <Text>{year}</Text>
                </ListItem>
                <ListItem style={{ flex: 1 }} itemDivider onPress={(e) => this.toggle_modal(0)}>
                    <Text>{moment().add(this.props.numindex, 'days').format("dddd")}{"    "}</Text>
                    <Text>{moment().add(this.props.numindex, 'days').format("Do")}</Text>
                </ListItem>
                <List dataArray={activity_1}
                    renderRow={(item) =>
                        <ListItem>
                            <Text style={{ fontSize: 20 }}>
                                事件:{"      "}{item.title}{"\n"}
                                時間:{"      "}{item.time}</Text>
                        </ListItem>
                    }>
                </List>
                <ListItem style={{ flex: 1 }} itemDivider onPress={(e) => this.toggle_modal(1)}>
                    <Text>{moment().add(this.props.numindex + 1, 'days').format("dddd")}{"    "}</Text>
                    <Text>{moment().add(this.props.numindex + 1, 'days').format("Do")}</Text>
                </ListItem>
                <List dataArray={activity_2}
                    renderRow={(item) =>
                        <ListItem>
                            <Text style={{ fontSize: 20 }}>
                                事件:{"      "}{item.title}{"\n"}
                                時間:{"      "}{item.time}</Text>
                        </ListItem>
                    }>
                </List>
                <ListItem style={{ flex: 1 }} itemDivider onPress={(e) => this.toggle_modal(2)}>
                    <Text>{moment().add(this.props.numindex + 2, 'days').format("dddd")}{"    "}</Text>
                    <Text>{moment().add(this.props.numindex + 2, 'days').format("Do")}</Text>
                </ListItem>
                <List dataArray={activity_3}
                    renderRow={(item) =>
                        <ListItem>
                            <Text style={{ fontSize: 20 }}>
                                事件:{"      "}{item.title}{"\n"}
                                時間:{"      "}{item.time}</Text>
                        </ListItem>
                    }>
                </List>
                <ListItem style={{ flex: 1 }} itemDivider onPress={(e) => this.toggle_modal(3)}>
                    <Text>{moment().add(this.props.numindex + 3, 'days').format("dddd")}{"    "}</Text>
                    <Text>{moment().add(this.props.numindex + 3, 'days').format("Do")}</Text>
                </ListItem>
                <List dataArray={activity_4}
                    renderRow={(item) =>
                        <ListItem>
                            <Text style={{ fontSize: 20 }}>
                                事件:{"      "}{item.title}{"\n"}
                                時間:{"      "}{item.time}</Text>
                        </ListItem>
                    }>
                </List>
                <ListItem style={{ flex: 1 }} itemDivider onPress={(e) => this.toggle_modal(4)}>
                    <Text>{moment().add(this.props.numindex + 4, 'days').format("dddd")}{"    "}</Text>
                    <Text>{moment().add(this.props.numindex + 4, 'days').format("Do")}</Text>
                </ListItem>
                <List dataArray={activity_5}
                    renderRow={(item) =>
                        <ListItem>
                            <Text style={{ fontSize: 20 }}>
                                事件:{"      "}{item.title}{"\n"}
                                時間:{"      "}{item.time}</Text>
                        </ListItem>
                    }>
                </List>
                <ListItem style={{ flex: 1 }} itemDivider onPress={(e) => this.toggle_modal(5)}>
                    <Text>{moment().add(this.props.numindex + 5, 'days').format("dddd")}{"    "}</Text>
                    <Text>{moment().add(this.props.numindex + 5, 'days').format("Do")}</Text>
                </ListItem>
                <List dataArray={activity_6}
                    renderRow={(item) =>
                        <ListItem>
                            <Text style={{ fontSize: 20 }}>
                                事件:{"      "}{item.title}{"\n"}
                                時間:{"      "}{item.time}</Text>
                        </ListItem>
                    }>
                </List>
                <ListItem style={{ flex: 1 }} itemDivider onPress={(e) => this.toggle_modal(6)}>
                    <Text>{moment().add(this.props.numindex + 6, 'days').format("dddd")}{"    "}</Text>
                    <Text>{moment().add(this.props.numindex + 6, 'days').format("Do")}</Text>
                </ListItem>
                <List dataArray={activity_7}
                    renderRow={(item) =>
                        <ListItem>
                            <Text style={{ fontSize: 20 }}>
                                事件:{"      "}{item.title}{"\n"}
                                時間:{"      "}{item.time}</Text>
                        </ListItem>
                    }>
                </List>
                <ListItem style={{ borderBottomWidth: 0, flex: 1, marginLeft: 0, paddingRight: 0, backgroundColor: "lightgray" }}>
                    <TouchableNativeFeedback onPress={this.nextweek}>
                        <View style={{ flex: 1, backgroundColor: "lightgray" }}>
                            <Text style={{ textAlign: 'center', height: 40 }}><Icon name="arrow-down" size={20} color="#000" /></Text>
                        </View>
                    </TouchableNativeFeedback>
                </ListItem>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.props.modal_activity}
                    onRequestClose={this.toggle}
                >
                <KeyboardAwareScrollView>
                    <View style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <View style={{ backgroundColor: 'white', marginTop: Dimensions.get('window').height*0.535 }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>
                                    {moment().add(this.props.numindex + this.props.day, 'days').format("dddd Do")}
                                </Text>
                            </View>
                            <View style={{ marginTop: 22 }}>
                                <Form style={{ marginHorizontal: 40 }}>
                                    <Item underline>
                                        <Input value={this.props.newtitle} onChangeText={this.TitleChange} placeholder='事件標題' />
                                    </Item>
                                    <Item underline>
                                        <Input value={this.props.newtime} onChangeText={this.TimeChange} placeholder='時間' />
                                    </Item>
                                    <Item underline>
                                        <Input value={this.props.newdata} onChangeText={this.DataChange} placeholder='詳細資料' />
                                    </Item>
                                </Form>
                                <Button dark rounded onPress={this.buildActivity} style={{ alignSelf: 'center', marginTop: 20 }}>
                                    <Text> </Text>
                                    <Text> </Text>
                                    <Text style={{ fontSize: 24, color: 'white' }}>建立</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                    </KeyboardAwareScrollView>
                </Modal>
            </Content>
        )
        return (
            <Container style={{ backgroundColor: "lightgray" }}>
                {obj}
            </Container>
        );
    }

    toggle_modal(day) {
        this.props.dispatch(toggle_modal_activity());
        this.props.dispatch(update_date(day));
    }

    toggle() {
        this.props.dispatch(toggle_modal_activity());
    }

    toggle_schdule() {
        this.props.dispatch(toogle_Schdule());
    }

    nextweek() {
        this.props.dispatch(next_week());
        this.props.dispatch(select_by_group(this.props.group.id));
    }

    prevweek() {
        this.props.dispatch(prev_week());
        this.props.dispatch(select_by_group(this.props.group.id));
    }

    TitleChange(e) {
        this.props.dispatch(changeTitle(e));
    }

    TimeChange(e) {
        this.props.dispatch(changeTime(e));
    }

    DataChange(e) {
        this.props.dispatch(changeData(e));
    }

    buildActivity() {
        if (!this.props.group.id) {
            ToastAndroid.show('請選擇群組', ToastAndroid.SHORT);
        }
        else if (!this.props.newtitle) {
            ToastAndroid.show('請輸入標題', ToastAndroid.SHORT);
        }
        else if (!this.props.newtime) {
            ToastAndroid.show('請輸入時間', ToastAndroid.SHORT);
        }
        else {
            this.props.dispatch(submitActivity(
                this.props.newtitle,
                this.props.newtime,
                this.props.newdata,
                this.props.group.id,
                moment().add(this.props.numindex + this.props.day, 'days').format("YYYY dddd Do")
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
})(CalendarScreen);

