import React from 'react';
import ChatList from 'components/ChatList.jsx';
import Loginpage from 'components/Loginpage.jsx';
import Personpage from 'components/Personpage.jsx';


import './Main.css';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {grouplist} from 'states/group-reducers.js';
import {Button} from 'reactstrap';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.store = null;
        this.state = {
            login_success: false
        };
        this.login= this.login.bind(this);
    }

    componentWillMount() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(combineReducers({
            grouplist
        }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));
    }

    login() {
        this.setState({
            login_success: true
        });
    }


    render() { 
        let obj;
        if (this.state.login_success){
            obj = (
                <Router>
                    <div className="d-flex flex-row">
                        <div className='d-flex flex-column align-items-end justify-content-start' id='leftnav'>
                            <div></div>
                            <div className='mt-auto'><Link to='/'><img className="navicon" src="./image/icon for navbar/man-user_white.png"/></Link></div>
                            <br/>
                            <div><Link to='/chatlist'><img className="navicon" src="./image/icon for navbar/list_white.png"/></Link></div>
                            <br/>
                            <div><Link to='/setting'><img className="navicon" src="./image/icon for navbar/settings-work-tool_white.png"/></Link></div>
                            <br/>
                        </div>
                        <div>
                            <Route exact path="/" render={() => (
                                <Personpage />
                            )}/>
                            <Route exact path="/chatlist" render={() => (
                                <ChatList />
                            )}/>
                            <Route exact path="/setting" render={() =>(
                                <Setting />
                            )}/>
                        </div>
                    </div> 
                </Router>
            );
        }
        else {
            obj = (
                 <Loginpage login={this.login}/>
            );
        }
        return(
            <Provider store={this.store}>{obj}</Provider>
        );
           
    }
}
