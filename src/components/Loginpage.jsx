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
import {
  changeLogInName,
  changeLogInPassword,
  submitLogIn,
  toggle
} from 'states/logIn-action.js';
import{
  changeAccountName,
  changeAccountPassword,
  changeAccountEmail,
  submitAccount
} from 'states/newAccount-action.js';

class Loginpage extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.goToLog=this.goToLog.bind(this);
        this.NameChange=this.NameChange.bind(this);
        this.PasswordChange=this.PasswordChange.bind(this);
        this.EmailChange=this.EmailChange.bind(this);
        this.buildAccount=this.buildAccount.bind(this);
    }

    render() {
        return(
            <div className = 'background container-fluid d-flex align-items-center'>
            <div className = 'm-auto d-flex flex-column justify-content-center'>
                  <h1>LabTalk</h1>
                <br/>
                <br/>
                <br/>
                    <Input value={this.props.name}
                           onChange={this.handleNameChange} placeholder='username' className='col-10 m-auto'/>
                    <br/>
                    <Input value={this.props.password}
                           onChange={this.handlePasswordChange} placeholder='password' className='col-10 m-auto'/>
                <br/>
                <br/>
                    <Button outline color="warning" className='col-4 m-auto' id='login_button' onClick={this.goToLog}>LOG IN</Button>
                <br/>
                    <a onClick={this.toggle} className='m-auto' id='register_button'>Register</a>
            </div>
                <Modal isOpen={this.props.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                <ModalBody>
                   <Input value ={this.props.newname} onChange={this.NameChange} placeholder='username' className='col-10 m-auto'/>
                    <br/>
                    <Input value ={this.props.newpassword} onChange={this.PasswordChange} placeholder='password' className='col-10 m-auto'/>
                    <br/>
                    <Input value ={this.props.email} onChange={this.EmailChange} placeholder='e-mail' type='email' className='col-10 m-auto'/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.buildAccount} outline color="warning" className='col-4 m-auto'>Confirm</Button>
                </ModalFooter>
                </Modal>
            </div>
        );
    }
    
    toggle() {
        this.props.dispatch(toggle(this.props.modal));
    }

    handleNameChange(e){
      var texts = e.target.value;
      this.props.dispatch(changeLogInName(texts));
    }

    handlePasswordChange(e){
      var texts = e.target.value;
      this.props.dispatch(changeLogInPassword(texts));
    }
    goToLog(e){
      if(!this.props.name){
        alert("No name!");
      }
      else if(!this.props.password){
        alert("No password!!");
      }
      else{
          this.props.dispatch(submitLogIn(this.props.name,this.props.password));
      }
    }
    NameChange(e){
        var texts=e.target.value;
        this.props.dispatch(changeAccountName(texts));
    }
    PasswordChange(e){
        var texts = e.target.value;
        this.props.dispatch(changeAccountPassword(texts));
    }
    EmailChange(e){
        var texts = e.target.value;
        this.props.dispatch(changeAccountEmail(texts));
    }
    buildAccount(){
        if(!this.props.newname){
        alert('No name!');
        }
        else if(!this.props.newpassword){
        alert('No password!!');
        }
        else if(!this.props.email){
        alert('No email!!');
        }
        else{
        this.props.dispatch(submitAccount(
            this.props.newname,
            this.props.newpassword,
            this.props.email
        ));
        }
    }
}

export default connect((state) => {
    return {
       ...state.logIn,
       ...state.newAccount
    };
})(Loginpage);