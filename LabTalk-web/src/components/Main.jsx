import React from 'react';
import Page from 'components/Page.jsx';

import './Main.css';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';

import {newAccount} from 'states/newAccount-reducers.js';
import {logIn} from 'states/logIn-reducers.js';
import {grouplist, groupitem, chatroom, chatlist, chatroom_hid} from 'states/group-reducers.js';
import {calendar, newactivity} from 'states/calendar-reducers.js';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.store = null;
    }

    componentWillMount() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(combineReducers({
            grouplist,
            groupitem,
            chatroom,
            chatlist,
            chatroom_hid,
            logIn,
            newAccount,
            calendar,
            newactivity
        }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));
    }

    render() {
        return(
            <Provider store={this.store}>
                <Page />
            </Provider>
        );

    }
}
