import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    ToastAndroid,
    TouchableNativeFeedback,
    Animated,
    Modal,
    ScrollView,
    Dimensions

} from 'react-native';
import {  Container, Content, List, ListItem, Fab, Icon, Header,
  Left, Title, Button, Body, Label, Form, Input, Item} from 'native-base';
import { listGroups } from '../states/group-actions.js';
import { addMembers, DeleteMembers, createGroup } from '../states/group-actions.js';
import GroupItem from './GroupItem';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';

class GroupScreen extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        groups: PropTypes.array,
        username_login: PropTypes.string,
        groupLoading: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
          open: false,
          text: ''
        };
        this.handle_creategroup =this.handle_creategroup.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(listGroups('', this.props.username_login));
    }

    componentwillreceiveprops(nextProps){
      /*  if(nextProps.groups!=this.props.groups)
          this.props.dispatch(listGroups('', this.props.username_login));*/
    }
    render() {
        const { navigate } = this.props;
        const { dispatch, addgroup_modal_Toggle, groups, groupLoading } = this.props;
        var items = [];
        if (groups.length > 0)
            items = groups;
        return (
          <View style={{flex:1, justifyContent: 'center' }}>
            <ScrollView style={{height: Dimensions.get('window').height*0.85}}>
                <List dataArray={items}
                    renderRow={(item) =>
                        <ListItem style={{ flex: 1 }} >
                              <GroupItem{...item} navigate = {navigate} />
                        </ListItem>
                    }>
                </List>
            </ScrollView>


            <Fab
                    direction="right"
                    containerStyle={{ marginTop: 800}}
                    style={{ backgroundColor: 'black', position: 'absolute', left: 0, top:10}}
                    position="bottomRight"
                    onPress={this.toggle}>
                    <Icon name='add' />
              </Fab>

            <Modal
              animationType={"fade"}
              transparent={false}
              visible={this.state.open}
              onRequestClose={this.toggle}
              >
            <View style={{flex: 1}}>
             <View>
               <Header style={{backgroundColor: 'black'}}>
                   <Left>
                       <Button transparent onPress={this.toggle} style={{backgroundColor: 'black'}}>
                           <Icon name='arrow-back'/>
                       </Button>
                   </Left>
                   <Body>
                       <Title>新增群組</Title>
                   </Body>
               </Header>
               <View>
                 <Form style={{marginTop:20}}>
                    <Item fixedLabel style={{marginHorizontal: 20}}>
                   <Label>群組名稱</Label>
                   <Input value={this.state.text} onChangeText={(text)=> this.setState({text:text,})}/>
                   </Item>
                   <Button dark rounded style={{marginTop:20, alignSelf:'center'}} onPress={this.handle_creategroup}>
                   <Text style={{fontSize: 20, color: 'white'}}>送出</Text></Button>
                 </Form>
               </View>
            </View>
          </View>
            </Modal>
          </View>
        );
    }


    handle_creategroup() {
      if(this.state.text){
       this.props.dispatch(createGroup(this.state.text,this.props.username_login,''));
       this.setState({text:'',});
       ToastAndroid.show('成功建立新群組', ToastAndroid.SHORT);
      }
    }

    toggle(){
      this.setState(
        {
          open: !this.state.open,
        }
      );
    }

}

export default connect(state => ({
    ...state.grouplist,
    ...state.chatroom,
    ...state.chatlist
}))(GroupScreen);
