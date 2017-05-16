<<<<<<< HEAD
import{
  logInSubmit
}from 'api/logIn.js';
=======
import { logInSubmit } from 'api/logIn.js';
import {recordusername} from 'states/group-actions.js';
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
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
<<<<<<< HEAD
function resetItem(){
=======
export function resetItem(){
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
  return{
    type: '@LogIn/Reset'
  };
}
<<<<<<< HEAD
function loginSuccess(){
  return {
    type: '@LogIn/Success',
=======
function loginSuccess(username){
  return {
    type: '@LogIn/Success',
    username
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
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
    setTimeout(() =>{dispatch(endLoading());
    },600);
    return logInSubmit(name,password).then((len)=>{
      if(len){
        console.log("Log in succeess");
<<<<<<< HEAD
        dispatch(loginSuccess());
=======
        dispatch(loginSuccess(name));
        dispatch(recordusername(name));
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
      }
      else{
        console.log("Log in fail");
        dispatch(loginFail());
        dispatch(resetItem());
<<<<<<< HEAD
        alert('NO This Account!!');
=======
        alert('此帳戶名稱不存在或是密碼錯誤');
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
      }
    });
  };
}
