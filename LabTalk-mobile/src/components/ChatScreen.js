import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ListView, FlatList, BackHandler, ScrollView, TextInput, Image, Dimensions } from 'react-native';
import {
    Container, Content, ListItem, List, CheckBox,
    Header, Left, Right, Body, Item, Button,
    Title, Input
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Drawer from 'react-native-drawer'
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import CalendarScreen from './CalendarScreen.js';
import ChatItem from './ChatItem.js';

import { connect } from 'react-redux';
import {
    createChat, changeHiddenChatroom, closeHiddenChatroom,
    createChat_hid, changeChatroom, listChats, listChats_hid
} from '../states/group-actions.js';
import { toggle_Calendar } from '../states/calendar-actions.js';

class ChatScreen extends React.Component {
    static propTypes = {
        chats: PropTypes.array,
        hiddenchatroom_open: PropTypes.bool,
        username_login: PropTypes.string,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            intervalId: {},
            changechat: false,
            changechat_hid: false,
            count: 0,
            text: ''
        };

        this.handle_chat_submit = this.handle_chat_submit.bind(this);
        this.inittimer = this.inittimer.bind(this);
        this.timer = this.timer.bind(this);
        this.changeroom = this.changeroom.bind(this);
    }

    componentDidMount() {
        this.inittimer();
        BackHandler.addEventListener('hardwareBackPress', () => {
            clearInterval(this.state.intervalId);
            this.setState({ intervalId: {} });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ((nextProps.chats.length !== this.props.chats.length) || (nextProps.group.id != this.props.group.id)) {
            return true;
        }
        else if (nextProps.hiddenchatroom_open !== this.props.hiddenchatroom_open) {
            return true;
        }
        else if (nextProps.calendar !== this.props.calendar) {
            return true;
        }
        else if (nextProps.chats_hid.length !== this.props.chats_hid.length) {
            return true;
        }
        else if (nextState.text !== this.state.text) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        const { chats, chats_hid, dispatch, group, username_login, hiddenchatroom_open, calendar } = this.props;
        var items = [];
        let children = (
            <View style={{ justifyContent: 'center' }} >
                <View><Text style={{ fontSize: 25, textAlign: 'center' }}>開始新的對話...</Text></View>
            </View>
        );

        if (chats.length > 0) {
            items = chats;
            children = (
                <FlatList
                    style={{flexDirection: 'column-reverse', flex:1}}
                    data={items}
                    renderItem={({ item }) =>
                        <View style={{ margin: 8 }}>
                            <ChatItem {...item} />
                        </View>
                    } />
            );
        }
        var items_hid = [];
        let children_hid = (
            <View style={{ justifyContent: 'center' }} >
                <View><Text style={{ fontSize: 25, textAlign: 'center' }}>開始新的對話...</Text></View>
            </View>
        );

        if (chats_hid.length > 0) {
            items_hid = chats_hid;
            children_hid = (
                <FlatList
                    style={{flexDirection: 'column-reverse', flex:1}}
                    data={items_hid}
                    renderItem={({ item }) =>
                        <View style={{ margin: 8}} >
                            <ChatItem {...item} />
                        </View>
                    } />
            );
        }

        let members = '';
        let groupname = group.name ? group.name : "LABTALK";
        let pageview = this.props.hiddenchatroom_open ? 1 : 0;
        if (pageview && this.state.text === '' && this.state.count == 1) {
            this.state.text = '@';
            this.state.count = 0;
        }
        else if (!pageview && this.state.text === '@' && this.state.count == 1) {
            this.state.text = '';
            this.state.count = 0;
        }
        else if (!pageview && this.state.text === '' && this.state.count == 1) {
            this.state.count = 0;
        }
        else if (pageview && this.state.text === '@' && this.state.count == 1) {
            this.state.count = 0;
        }

        return (
            <Drawer
                content={<CalendarScreen />}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={0.2}
                captureGestures={true}
                acceptTap={true}
                ref={(ref) => this._drawer = ref}
            >
                <Header style={{ backgroundColor: 'rgb(0,0,0)', borderBottomWidth: 0 }}>
                    <Left>
                        <Button transparent onPress={() => this.changeroom()}>
                            <Icon name='arrow-left' style={{color:"#fff", fontSize:20}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ textAlign: 'center', fontSize: 35 }}>{groupname}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { this._drawer.open() }}>
                            <Icon name='calendar' size={20} color="#fff" />
                        </Button>
                    </Right>
                </Header>
                <ScrollableTabView

                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar />}
                    onScroll={(position) => {
                        if (position == 1) {
                            this.props.dispatch(changeHiddenChatroom(this.props.group, ""));
                            this.state.count = 1;
                        }
                        else if (position == 0) {
                            this.props.dispatch(closeHiddenChatroom());
                            this.state.count = 1;
                        }
                    }
                    }
                    page={pageview}
                >
                    <ScrollView tabLabel="聊天室" style={{ backgroundColor: 'white' }}>
                        {children}
                    </ScrollView>
                    <ScrollView tabLabel="討論區" style={{ backgroundColor: 'white' }}>
                        {children_hid}
                    </ScrollView>
                </ScrollableTabView>

                <View>
                    <Item>
                        <Input
                            ref={c => this.Input = c}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                            placeholder="輸入訊息...  <使用 @ 開啟/關閉內嵌討論室>"
                        />
                      <Button iconRight light onPress={this.handle_chat_submit}>
                            <Icon name='arrow-right' />
                        </Button>
                    </Item>
                </View>
            </Drawer>

        )
    }

    handle_chat_submit() {
        if (this.state.text === '@' && this.props.hiddenchatroom_open) {
            this.props.dispatch(closeHiddenChatroom());
            this.state.text = '';
        }
        else if (this.state.text === '@' && !(this.props.hiddenchatroom_open)) {
            this.props.dispatch(changeHiddenChatroom(this.props.group, ""));
            this.state.text = '@';
        }
        else if (this.state.text.match(/^@/)) {
            var string_input = this.state.text.replace(/^@/, '');
            this.props.dispatch(createChat_hid(this.props.group.id, this.props.username_login, string_input));
            this.state.text = '@';
        }
        else if (!(this.state.text.match(/^@/)) && this.props.hiddenchatroom_open) {
            this.props.dispatch(closeHiddenChatroom());
            this.state.text = '';
        }
        else if (this.state.text) {
            this.props.dispatch(createChat(this.props.group.id, this.props.username_login, this.state.text));
            this.state.text = '';
        }
    }

    inittimer() {
        var intervalId = setInterval(this.timer, 3000);
        this.setState({ intervalId: intervalId });
    }

    timer() {
        const { group, dispatch } = this.props;
        if (group.id) {
            dispatch(listChats(group.id, ''));
            dispatch(listChats_hid(group.id, ''));
        }
    }

    changeroom() {
        let { goBack } = this.props.navigation;
        clearInterval(this.state.intervalId);
        this.setState({ intervalId: {} });
        goBack();
    }
}

export default connect(state => ({
    ...state.chatroom,
    ...state.chatroom_hid,
    ...state.chatlist,
    ...state.calendar
}))(ChatScreen);
