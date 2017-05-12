import React from 'react';
import ChatList from 'components/ChatList.jsx';

import './Main.css';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {grouplist, groupitem, chatroom, chatlist, chatroom_hid} from 'states/group-reducers.js';

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
            chatroom_hid
        }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));
    }


    render() {
      return(
        <Provider store={this.store}>
          <ChatList/>
        </Provider>
      );
    }
}
