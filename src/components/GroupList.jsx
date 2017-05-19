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
        username_login: PropTypes.string,
        groupLoading: PropTypes.bool,
        dispatch: PropTypes.func
    };
    constructor(props) {
        super(props);

        this.handle_addgroupbutton_toggle = this.handle_addgroupbutton_toggle.bind(this);
        this.handle_creategroup = this.handle_creategroup.bind(this);
    }

    render() {
        const {dispatch, addgroup_modal_Toggle, groups, groupLoading} = this.props;
        let loading = '';
        if(groupLoading){
            loading = 'loading';
        }

        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>無任何群組<br/>點擊下面按鈕創建群組</div>
            </ListGroupItem>

        );
        if (groups.length > 0) {
          children = groups.map(p => (
              <ListGroupItem key={p.id} action id="li" >
                  <GroupItem {...p}/>
              </ListGroupItem>
          ));
      }

        return (
            <div>
                <div className={`grouplist${loading}`}>
                    <center className="listtitle">
                        <img id="listicon" src="./image/icon for navbar/list_white.png"/>
                        <p id="listtxt">群組列表</p>
                    </center>
                    <div className="list d-flex align-items-center flex-column">
                        <div className='group-list'>
                            <ListGroup>{children}</ListGroup>
                        </div>
                        <div className="ml-auto mr-auto mt-3">
                            <Button className="listbutton" color="primary" onClick={this.handle_addgroupbutton_toggle}>創建群組 +</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal isOpen={addgroup_modal_Toggle} toggle={this.handle_addgroupbutton_toggle}>
                        <ModalHeader toggle={this.handle_addgroupbutton_toggle}>創建群組</ModalHeader>
                        <ModalBody>
                            <div>
                              <InputGroup>
                                <InputGroupAddon>群組名稱</InputGroupAddon>
                                <Input type="text"  getRef={(e)=>(this.groupnameEL=e)} placeholder="請輸入群組名稱"/>
                              </InputGroup>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="info" onClick={this.handle_creategroup}>新增</Button>
                            <Button color="secondary" onClick={this.handle_addgroupbutton_toggle}>取消</Button>
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
       this.props.dispatch(createGroup(this.groupnameEL.value,this.props.username_login,''));
    }
}

export default connect((state) => {
    return {
        ...state.grouplist,
        ...state.chatlist
    }
})(GroupList);
