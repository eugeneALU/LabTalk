import React from 'react';
import Page from 'components/Page.jsx';

import './Main.css';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';

import {newAccount} from 'states/newAccount-reducers.js';
import {logIn} from 'states/logIn-reducers.js';
import {grouplist, groupitem, chatroom, chatlist, chatroom_hid} from 'states/group-reducers.js';
<<<<<<< HEAD
=======
import {calendar} from 'states/calendar-reducers.js';
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e

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
<<<<<<< HEAD
            newAccount
=======
            newAccount,
            calendar
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
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
