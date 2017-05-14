import React from 'react';
import './Personpage.css';
import {connect} from 'react-redux';

class Personpage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="person_background d-flex align-items-center">
                <div className="d-flex flex-column m-auto">
                    <img id="userphoto" src="./image/icon for personal page/icon.jpg"/>
                    <br/>
                    <br/>
                    <h1 id="username">Milo</h1>
                </div>
            </div>
        );
    }
}

export default connect()(Personpage);