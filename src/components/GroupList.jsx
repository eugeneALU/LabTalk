import React from 'react';
import PropTypes from 'prop-types';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    ListGroup,
    ListGroupItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import {connect} from 'react-redux';
import {toggleAddGroupModal, createGroup} from 'states/group-actions.js';
import GroupItem from 'components/GroupItem.jsx';


import './GroupList.css';

class GroupList extends React.Component {
    static propTypes = {
        addgroup_modal_Toggle: PropTypes.bool,
        groups: PropTypes.array,
        dispatch: PropTypes.func
    };
    constructor(props) {
        super(props);

        this.handle_addgroupbutton_toggle = this.handle_addgroupbutton_toggle.bind(this);
        this.handle_creategroup = this.handle_creategroup.bind(this);
    }

    render() {
        const {dispatch, addgroup_modal_Toggle, groups} = this.props;
        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>No Group here.<br/>Create Group by clicking the button !</div>
            </ListGroupItem>

        );
        if (groups.length) {
          children = groups.map(p => (
              <ListGroupItem key={p.id} action id="li" >
                  <GroupItem {...p}/>
              </ListGroupItem>
          ));
      }

        return (
            <div>
                <div className='group-list'>
                    <center className="listtitle">
                        <img id="listicon" src="./image/icon for navbar/list.png"/>
                        <p id="listtxt">Groups List</p>
                    </center>
                    <div className="list d-flex align-items-center flex-column">
                        <div>
                            <ListGroup>{children}</ListGroup>
                        </div>
                        <div className="ml-auto mr-auto mt-3">
                            <Button className="listbutton" color="warning" onClick={this.handle_addgroupbutton_toggle}>Create Groups +</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal isOpen={addgroup_modal_Toggle} toggle={this.handle_addgroupbutton_toggle}>
                        <ModalHeader toggle={this.handle_addgroupbutton_toggle}>Create Group</ModalHeader>
                        <ModalBody>
                            <div>
                              <InputGroup>
                                <InputGroupAddon>Group Name</InputGroupAddon>
                                <Input type="text"  getRef={(input)=>(this.input=input)} placeholder="Enter your Group Name"/>
                              </InputGroup>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handle_creategroup}>Create</Button>
                            <Button color="secondary" onClick={this.handle_addgroupbutton_toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );

    }

    handle_addgroupbutton_toggle() {
        this.props.dispatch(toggleAddGroupModal());
    }
    handle_creategroup(e) {
      console.log(this.input.value);
      this.props.dispatch(createGroup(this.input.value,''));
    }
}

export default connect((state) => {
    return state.grouplist;
})(GroupList);
