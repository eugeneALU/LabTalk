import React from 'react';
import ChatList from 'components/ChatList.jsx';
import Loginpage from 'components/Loginpage.jsx';
import Personpage from 'components/Personpage.jsx';


import './Page.css';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {newAccount} from 'states/newAccount-reducers.js';
import {logIn} from 'states/logIn-reducers.js';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { 
        let obj;
        if (this.props.login_success){
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
                 <Loginpage />
            );
        }
        return(
            <div>{obj}</div>
        );  
    }
}

export default connect((state) => {
    return {
       ...state.logIn,
       ...state.newAccount
    };
})(Page);