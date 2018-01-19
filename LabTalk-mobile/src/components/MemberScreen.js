import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    TouchableHighlight,
    ToastAndroid

} from 'react-native';

import {Content,
        Icon,
        List,
        ListItem,
        Header,
        Left,
        Body,
        Title,
        Input,
        Button
} from 'native-base';
import {connect} from 'react-redux';
import {addMembers, DeleteMembers} from '../states/group-actions.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class MemberScreen extends React.Component {
      static propTypes = {
          group: PropTypes.object,
          username_login: PropTypes.string,
          dispatch: PropTypes.func
      };


    constructor(props) {
        super(props);
        this.state = {
          text: ''
        };

        this.handleAddMembers = this.handleAddMembers.bind(this);
        this.handleDeleteMembers = this.handleDeleteMembers.bind(this);

    }
    render() {
        const {username_login, groups} = this.props;
        const {id, name, usernames } =this.props.group;

        return (
          <KeyboardAwareScrollView>
          <View style={{flex: 1}}>
          <Header style={{backgroundColor: 'black'}}>
              <Body>
                  <Title>編輯成員</Title>
              </Body>
          </Header>
          <View style={{flex:5}}>
          <Text></Text>
          <List dataArray={usernames}
              renderRow={(p) =>{
                if(p.username!=username_login){
                  return(
                    <ListItem style={{ flex: 1 }} >
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        <Icon name='close' onPress={()=>{this.handleDeleteMembers(p.username)}} style={{fontSize:20, marginHorizontal: 20, color:'rgb(18, 19, 94)'}}/>
                        <Icon name='person' style={{marginHorizontal: 20}}/>
                        <Text style={{fontSize: 20, justifyContent: 'center', fontWeight: 'bold'}}>{p.username}</Text>
                    </View>
                    </ListItem>
                  );
                }
                else{
                  return(<View></View>);
                }
              }
              }>
          </List>
          </View>
          <View style={{flex:1}}>
          <Input value={this.state.text} onChangeText={(text)=> this.setState({text:text})} placeholder={'請輸入帳戶名稱'}/>
          <Button block dark onPress={this.handleAddMembers}><Text style={{color: 'white'}}>新增</Text></Button>
          </View>
          </View>
          </KeyboardAwareScrollView>
      );
    }

    handleAddMembers(){
      if(this.state.text){
        this.props.dispatch(addMembers(this.props.group.id, this.state.text, this.props.username_login));
        this.setState({text:''});
      }
    }
    handleDeleteMembers(username_delete){
      this.props.dispatch(DeleteMembers(this.props.group.id, username_delete, this.props.username_login));
    }




}

export default connect(state => ({
  ...state.groupitem,
  ...state.grouplist,
  ...state.chatlist,
  ...state.chatroom
}))(MemberScreen);
