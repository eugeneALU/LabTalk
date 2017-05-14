import React from 'react';
import './Loginpage.css';
import {connect} from 'react-redux';
import {Button,
        Input,
        Modal, 
        ModalHeader, 
        ModalBody, 
        ModalFooter
       } from 'reactstrap';

class Loginpage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return(
            <div className = 'background container-fluid d-flex align-items-center'>
            <div className = 'm-auto d-flex flex-column justify-content-center'>
                  <h1>LabTalk</h1>
                <br/>
                <br/>
                <br/>
                    <Input placeholder='username' className='col-10 m-auto'/>
                    <br/>
                    <Input placeholder='password' className='col-10 m-auto'/>
                <br/>
                <br/>
                    <Button outline color="warning" className='col-4 m-auto' id='login_button' onClick={this.props.login}>LOG IN</Button>
                <br/>
                    <a onClick={this.toggle} className='m-auto' id='register_button'>Register</a>
            </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                <ModalBody>
                   <Input placeholder='username' className='col-10 m-auto'/>
                    <br/>
                    <Input placeholder='password' className='col-10 m-auto'/>
                    <br/>
                    <Input placeholder='e-mail' className='col-10 m-auto'/>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="warning" className='col-4 m-auto'>Confirm</Button>
                </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        ...state.grouplist,
    };
})(Loginpage);