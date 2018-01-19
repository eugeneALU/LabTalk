import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    TouchableHighlight,
    ToastAndroid,
    Button
} from 'react-native';

import {Content, Icon} from 'native-base';
import { changeChatroom, deleteGroup } from '../states/group-actions.js';
import {connect} from 'react-redux';
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

        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleGroupDelete = this.handleGroupDelete.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
    }
    render() {
        const {id, name, usernames } =this.props;
        return (
          <View style={{flexDirection: 'row' ,flexWrap:'wrap'}}>
              <Icon onPress={this.handleGroupDelete} style={{fontSize:20, marginHorizontal: 20, color:'rgb(18, 19, 94)'}} name='close'/>
              <Icon onPress={this.handleIconClick} name='person-add' style={{fontSize: 30, marginHorizontal: 20}}/>
              <Text onPress={this.handleGroupClick} style={{alignSelf: 'stretch', width:180, fontSize:30}}>
            <Icon name='chatboxes' style={{fontSize: 30, marginHorizontal: 20}}/>{'  '}{this.props.name}</Text>
          </View>
      );
    }
    handleIconClick(){
      const { navigate, id, name, usernames} = this.props;
      let obj = {
          id: id,
          name: name,
          usernames: usernames
      };
      this.props.dispatch(changeChatroom(obj, ''));
      navigate('Member');
    }
    handleGroupClick() {
        const { navigate, id, name, usernames} = this.props;
        let obj = {
            id: id,
            name: name,
            usernames: usernames
        };
        this.props.dispatch(changeChatroom(obj, ''));
        navigate('Chat');
    }

    handleGroupDelete(){
        this.props.dispatch(deleteGroup(this.props.id, '', this.props.username_login));
        ToastAndroid.show('成功刪除群組', ToastAndroid.SHORT);
    }


}

export default connect(state => ({
  ...state.groupitem,
  ...state.grouplist,
  ...state.chatroom,
  ...state.chatlist
}))(GroupItem);
