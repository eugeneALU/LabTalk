import React from 'react';
import './Personpage.css';
import {connect} from 'react-redux';
<<<<<<< HEAD

class Personpage extends React.Component {
    constructor(props) {
        super(props);
=======
import {Button } from 'reactstrap';
import {resetItem} from 'states/logIn-action.js';
class Personpage extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
    }

    render() {
        return(
            <div className="person_background d-flex align-items-center">
                <div className="d-flex flex-column m-auto">
<<<<<<< HEAD
                    <img id="userphoto" src="./image/icon for personal page/icon.jpg"/>
                    <br/>
                    <br/>
                    <h1 id="username">Milo</h1>
=======
                    <img id="userphoto" src="./image/icon for personal page/icon.png"/>
                    <br/>
                    <br/>
                    <h1 id="username">{this.props.username_login}</h1>
                    <Button onClick={this.logout} color="danger" className="mt-5">登出</Button>
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
                </div>
            </div>
        );
    }
<<<<<<< HEAD
}

export default connect()(Personpage);
=======

    logout(){
      this.props.dispatch(resetItem());
    }
}

export default connect((state) => {
    return {
       ...state.chatlist,
       ...state.logIn
    };
})(Personpage);
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
