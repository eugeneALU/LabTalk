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
import {select_by_group} from 'states/calendar-actions.js';
import moment from 'moment';

import './GroupItem.css';

class GroupItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        usernames: PropTypes.array,
        username_login: PropTypes.string,
        Toggle_id: PropTypes.string,
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
      const {dispatch, addmember_modal_Toggle, Toggle_id, id, usernames, group, username_login} = this.props;
      let members = '';

      if(usernames.length) {
        members = usernames.map(p =>{
          if(p.username !== username_login)
          return <a className="group-members ml-2" key={p.username+p.id}>{p.username}</a>
        });
      }
      let select ='';

      if(group.id===id){
        select = 'select';
      }

      return(
        <div>
        <div onClick={this.handleGroupClick} className="d-flex flex-column justify-content-center">
             <h4 className={`group-title${select} "ml-auto mx-auto`}>{this.props.name}</h4>
             <Button className="btn-group" color="danger" onClick={this.handleGroupDelete}>刪除群組</Button>
             <Button color="danger" className="btn-group mt-2 justify-content-center" onClick={this.handle_addmemberbutton_toggle} >成員</Button>

        </div>
                  <Modal isOpen={addmember_modal_Toggle && Toggle_id===id} toggle={this.handle_addmemberbutton_toggle}>
                      <ModalHeader toggle={this.handle_addmemberbutton_toggle}>改變群組成員</ModalHeader>
                      <ModalBody>
                          <div>
                            <div className="mb-2">
                            <a className="group-member">成員</a>
                            {members}</div>
                            <InputGroup>
                              <Input type="text"  getRef={(input)=>(this.input=input)} placeholder="輸入成員名稱"/>
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
      );
    }

    handle_addmemberbutton_toggle() {
        this.props.dispatch(toggleAddMemberModal(this.props.id));
    }

    handleGroupDelete(e){
      this.props.dispatch(deleteGroup(this.props.id, '', this.props.username_login));
    }

    handleAddMembers(e){
        this.props.dispatch(addMembers(this.props.id, this.input.value, this.props.username_login));
    }

    handleDeleteMembers(e){
        this.props.dispatch(DeleteMembers(this.props.id, this.input.value, this.props.username_login));
    }

    handleGroupClick(e){
        let obj={
          id: this.props.id,
          name: this.props.name,
          usernames: this.props.usernames
        };
        this.props.dispatch(changeChatroom(obj, ''));
        this.props.dispatch(select_by_group(this.props.id))
    }
}

export default connect((state) => {
    return {
        ...state.groupitem,
        ...state.grouplist,
        ...state.chatroom,
        ...state.chatlist
    };
})(GroupItem);
