import React from 'react';
import {BackHandler} from 'react-native';

import {StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider, connect} from 'react-redux';
import {StackNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';

//states
import {newAccount} from './states/newAccount-reducers.js';
import {logIn} from './states/logIn-reducers.js';
import {grouplist, groupitem, chatroom, chatlist, chatroom_hid} from './states/group-reducers.js';
import {calendar, newactivity} from './states/calendar-reducers.js';

//components
import CalendarScreen from './components/CalendarScreen';
import ChatScreen from './components/ChatScreen';
import ProfileScreen from './components/ProfileScreen';
import GroupScreen from './components/GroupScreen';
import LogInScreen from './components/LogInScreen';
import MemberScreen from './components/MemberScreen';

const AppNavigator = StackNavigator({
    Calendar: {screen: CalendarScreen},
    Chat: {screen: ChatScreen},
    Profile: {screen: ProfileScreen},
    Group: {screen: GroupScreen},
    LogIn: {screen:LogInScreen},
    Member: {screen: MemberScreen}
}, {
    headerMode: 'none'
});

class AppWithStyleAndNavigator extends React.Component {
    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <AppNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}/>
            </StyleProvider>
        );
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const {dispatch, nav} = this.props;
            if (nav.index === 0)
                return false;
            dispatch(NavigationActions.back())
            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }
}

const AppWithNavState = connect(state => ({
    nav: state.nav
}))(AppWithStyleAndNavigator);

// Nav reducer
const initialState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'LogIn'}));
const nav = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

// Create Redux store
const store = createStore(combineReducers({
    nav, grouplist, groupitem, chatroom, chatlist,
    chatroom_hid, newAccount, logIn, calendar, newactivity
}), compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavState/>
            </Provider>
        );
    }
}
