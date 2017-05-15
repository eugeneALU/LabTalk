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
        username_login: PropTypes.string,
        groupitemloading: PropTypes.bool,
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
      const {dispatch, addmember_modal_Toggle, Toggle_id, id, usernames, group, username_login, groupitemloading} = this.props;
      let members = '';

      if(usernames.length) {
        members = usernames.map(p =>{
          if(p.username !== username_login)
          return <a className="group-members ml-2" key={p.username+p.id}>{p.username}</a>
        });
      }
      let select ='' ;

      if(group.id===id){
        select = '-select';
      }

      let loading = '' ;
      if(groupitemloading){
        loading = '-loading' ;
      }



      return(
        <div className={`group-item${loading}`} >
        <div onClick={this.handleGroupClick} className="group-item justify-content-center align-items-center">
          <h4 className={`group-title${select}`}>{this.props.name}</h4>
          <div><Button className="ml-1" outline color="info" onClick={this.handle_addmemberbutton_toggle}>改變成員</Button><Button className="ml-2" outline color="danger" onClick={this.handleGroupDelete}>刪除群組</Button> </div>
          <br/>
            <div><a onClick={this.handle_addmemberbutton_toggle} className="group-member">成員</a>{members}</div>

              <div>
                  <Modal isOpen={addmember_modal_Toggle && Toggle_id===id} toggle={this.handle_addmemberbutton_toggle}>
                      <ModalHeader toggle={this.handle_addmemberbutton_toggle}>改變群組成員</ModalHeader>
                      <ModalBody>
                          <div>
                            <InputGroup>
                              <Input type="text"  getRef={(input)=>(this.input=input)} placeholder="Enter the Members Name"/>
                            </InputGroup>
                          </div>
                      </ModalBody>
                      <ModalFooter>
                          <Button color="success" onClick={this.handleAddMembers}>新增成員</Button>
                          <Button color="danger" onClick={this.handleDeleteMembers}>刪除成員</Button>
                          <Button color="secondary" onClick={this.handle_addmemberbutton_toggle}>取消</Button>
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
        let obj={
          id: this.props.id,
          name: this.props.name,
          usernames: this.props.usernames
        };
        this.props.dispatch(changeChatroom(obj, ''));

    }
}

export default connect((state) => {
    return {
        ...state.grouplist,
        ...state.groupitem,
        ...state.chatroom,
        ...state.chatlist
    };
})(GroupItem);
