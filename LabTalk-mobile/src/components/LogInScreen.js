import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ListView, Modal, ToastAndroid, TouchableHighlight, Image, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Content, Form, Item, Input, Button, Container } from 'native-base';

import { connect } from 'react-redux';

//redux action
import {
  changeLogInName,
  changeLogInPassword,
  submitLogIn,
  toggle
} from '../states/logIn-action.js';
import {
  changeAccountName,
  changeAccountPassword,
  changeAccountEmail,
  submitAccount
} from '../states/newAccount-action.js';
import { resetItem } from '../states/logIn-action.js';



class LogInScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showToast: false
    }
    this.toggle = this.toggle.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.goToLog = this.goToLog.bind(this);
    this.NameChange = this.NameChange.bind(this);
    this.PasswordChange = this.PasswordChange.bind(this);
    this.EmailChange = this.EmailChange.bind(this);
    this.buildAccount = this.buildAccount.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.login_success) {
      const { navigate } = this.props.navigation;
      this.props.dispatch(resetItem());
      navigate('Profile');

    }
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <View>
          <Image source={require('../images/login.jpg')} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: 'black' }}>
            <View style={{ flex: 4 }}></View>
            <View style={{ flex: 3 }}>
              <Form style={{ marginHorizontal: 20 }}>
                <Item underline>
                  <Input value={this.props.name} onChangeText={this.handleNameChange} placeholder="使用者名稱" style={{ color: 'white' }} placeholderTextColor='white' />
                </Item>
                <Item underline>
                  <Input secureTextEntry={true} value={this.props.password} onChangeText={this.handlePasswordChange} placeholder="密碼" style={{ color: 'white' }} placeholderTextColor='white' />
                </Item>
              </Form>
              <Text> </Text>
              <View style={{ alignItems: 'center' }}>
                <Button bordered light rounded onPress={this.goToLog} style={{ justifyContent: 'center', alignSelf: 'center' }}>
                  <Text style={{ color: 'rgb(215, 215, 215)', fontSize: 20 }}>登入</Text>
                </Button>
              </View>
              <Text> </Text>
              <Button bordered light rounded onPress={this.toggle} style={{ justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={{ color: 'rgb(215, 215, 215)', fontSize: 20 }}>註冊</Text>
              </Button>
            </View>
            <View style={{ marginTop: 22, backgroundColor: 'black' }} >
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.modal}
                onRequestClose={this.toggle}
              >
                <KeyboardAwareScrollView>
                  <View>
                    <Image source={require('../images/login.jpg')} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: 'black' }}>
                      <View style={{ flexDirection: 'column-reverse', marginTop: 330 }}>
                        <Button lnfo rounded onPress={this.buildAccount} style={{ alignSelf: 'center' }}>
                          <Text style={{ color: 'rgb(215, 215, 215)', fontSize: 20 }}>註冊</Text>
                        </Button>
                        <Text>{' '}</Text>
                        <Form style={{marginTop:20}}>
                          <Item underline>
                            <Input value={this.props.newname} onChangeText={this.NameChange} style={{ color: 'white' }} placeholder='註冊用戶名稱' placeholderTextColor='white' />
                          </Item>
                          <Item underline>
                            <Input value={this.props.newpassword} onChangeText={this.PasswordChange} style={{ color: 'white' }} placeholder='請設定密碼' placeholderTextColor='white' />
                          </Item>
                          <Item underline>
                            <Input value={this.props.email} onChangeText={this.EmailChange} style={{ color: 'white' }} placeholder='請輸入信箱' placeholderTextColor='white' />
                          </Item>
                        </Form>
                      </View>
                    </Image>
                  </View>
                </KeyboardAwareScrollView>
              </Modal>
            </View>
          </Image>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  toggle() {
    this.props.dispatch(toggle(this.props.modal));
  }

  handleNameChange(text) {
    this.props.dispatch(changeLogInName(text));
  }

  handlePasswordChange(text) {
    this.props.dispatch(changeLogInPassword(text));
  }
  goToLog() {
    if (!this.props.name) {
      ToastAndroid.show('請輸入用戶名稱', ToastAndroid.SHORT);
    }
    else if (!this.props.password) {
      ToastAndroid.show('請輸入用戶密碼', ToastAndroid.SHORT);
    }
    else {
      this.props.dispatch(submitLogIn(this.props.name, this.props.password));

    }
  }
  NameChange(text) {

    this.props.dispatch(changeAccountName(text));
  }
  PasswordChange(text) {

    this.props.dispatch(changeAccountPassword(text));
  }
  EmailChange(text) {

    this.props.dispatch(changeAccountEmail(text));
  }
  buildAccount() {
    if (!this.props.newname) {
      ToastAndroid.show('請輸入用戶名稱', ToastAndroid.SHORT);
    }
    else if (!this.props.newpassword) {
      ToastAndroid.show('請輸入用戶密碼', ToastAndroid.SHORT);
    }
    else if (!this.props.email) {
      ToastAndroid.show('請輸入信箱', ToastAndroid.SHORT);
    }
    else {
      this.props.dispatch(submitAccount(
        this.props.newname,
        this.props.newpassword,
        this.props.email
      ));
    }
  }
}

export default connect(state => ({
  ...state.logIn,
  ...state.newAccount
}))(LogInScreen);
