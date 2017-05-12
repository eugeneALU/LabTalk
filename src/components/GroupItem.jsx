import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import {connect} from 'react-redux';
import {deleteGroup, toggleAddMemberModal, addMembers, changeChatroom, DeleteMembers} from 'states/group-actions.js';
import moment from 'moment';

import './GroupItem.css';

class GroupItem extends React.Component {
    static propTypes = {
        Toggle_id: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        usernames: PropTypes.array,
        chatroom_id: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handleGroupDelete = this.handleGroupDelete.bind(this);
        this.handle_addmemberbutton_toggle = this.handle_addmemberbutton_toggle.bind(this);
        this.handleAddMembers = this.handleAddMembers.bind(this);
        this.handleDeleteMembers = this.handleDeleteMembers.bind(this);
        this.handleGroupClick = this.handleGroupClick.bind(this);
    }

    render(){
      const {dispatch, addmember_modal_Toggle, Toggle_id, id, usernames, chatroom_id} = this.props;
      let members = '';

      if(usernames.length) {
        members = usernames.map(p => (
          <a className="group-members ml-2" key={p.username+p.id}>{p.username}</a>
        ));
      }

      return(
        <div className="group-item" >
        <div onClick={this.handleGroupClick} className="group-item justify-content-center align-items-center">
          <h4 className="group-title">{this.props.name}<Button className="ml-5" outline color="danger" onClick={this.handleGroupDelete}>Delete Group</Button> </h4>
          <br/>
            <div><a onClick={this.handle_addmemberbutton_toggle} className="group-member">MEMBERS</a>{members}</div>

              <div>
                  <Modal isOpen={addmember_modal_Toggle && Toggle_id===id} toggle={this.handle_addmemberbutton_toggle}>
                      <ModalHeader toggle={this.handle_addmemberbutton_toggle}>Change Members</ModalHeader>
                      <ModalBody>
                          <div>
                            <InputGroup>
                              <InputGroupAddon>Member Name</InputGroupAddon>
                              <Input type="text"  getRef={(input)=>(this.input=input)} placeholder="Enter the Members Name"/>
                            </InputGroup>
                          </div>
                      </ModalBody>
                      <ModalFooter>
                          <Button color="primary" onClick={this.handleAddMembers}>Add Member</Button>
                          <Button color="primary" onClick={this.handleDeleteMembers}>Delete Member</Button>
                          <Button color="secondary" onClick={this.handle_addmemberbutton_toggle}>Cancel</Button>
                      </ModalFooter>
                  </Modal>
              </div>
              </div>
        </div>
      );
    }

    handle_addmemberbutton_toggle() {
        this.props.dispatch(toggleAddMemberModal(this.props.id));
    }

    handleGroupDelete(e){
      this.props.dispatch(deleteGroup(this.props.id, ''));
    }
    handleAddMembers(e){
        this.props.dispatch(addMembers(this.props.id, this.input.value));
    }
    handleDeleteMembers(e){
        this.props.dispatch(DeleteMembers(this.props.id, this.input.value));
    }
    handleGroupClick(e){
        let group={
          id: this.props.id,
          name: this.props.name,
          usernames: this.props.usernames
        };
        this.props.dispatch(changeChatroom(group, ''));
    }
}

export default connect((state) => {
    return {
        ...state.grouplist,
        ...state.groupitem,
        ...state.chatroom
    };
})(GroupItem);
