import { logInSubmit } from 'api/logIn.js';
import {recordusername} from 'states/group-actions.js';
var NCRYPTO = require('n-crypto');
var nCrypto = new NCRYPTO({
        aes_key:'aaaaaaaaaaaaaaaa'//aes key,16 characters
    });

export function changeLogInName(texts){
  return {
    type: '@LogIn/NameChange',
    texts
  };
}
export function changeLogInPassword(texts){
  return {
    type: '@LogIn/PasswordChange',
    texts
  };
}
export function toggle(){
  return {
    type: '@LogIn/Toggle',
  }
}
function startLoading(){
  return{
    type: '@LogIn/StartLoading'
  };
}
function endLoading(){
  return{
    type: '@LogIn/EndLoading'
  };
}
export function resetItem(){
  return{
    type: '@LogIn/Reset'
  };
}
function loginSuccess(username){
  return {
    type: '@LogIn/Success',
    username
  }
}
function loginFail(){
  return {
    type: '@LogIn/Fail',
  }
}

export function submitLogIn(name,password){
  return (dispatch, getState) => {
    dispatch(startLoading());
    // submit the information to check is right or not
    var encode_name = nCrypto.encrypt(name, 'AES');
    var encode_password = nCrypto.encrypt(password, 'AES');//base64
    setTimeout(() =>{dispatch(endLoading());
    },600);
    return logInSubmit(encode_name, encode_password).then((len)=>{
      if(len){
        console.log("Log in succeess");
        dispatch(loginSuccess(name));
        dispatch(recordusername(name));
      }
      else{
        console.log("Log in fail");
        dispatch(loginFail());
        dispatch(resetItem());
        alert('此帳戶名稱不存在或是密碼錯誤');
      }
    });
  };
}
