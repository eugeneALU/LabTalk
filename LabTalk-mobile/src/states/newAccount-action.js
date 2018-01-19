import{
  newSubmit
} from '../api/accountPost.js';
import{
  logInSubmit
}from '../api/logIn.js';
import {
  toggle
} from '../states/logIn-action.js';
import {ToastAndroid} from 'react-native';

export function changeAccountName(texts){
  return{
    type: '@NewAccount/NameChange',
    texts
  };
}
export function changeAccountPassword(texts){
  return{
    type: '@NewAccount/PasswordChange',
    texts
  };
}

export function changeAccountEmail(texts){
  return{
    type: '@NewAccount/EmailChange',
    texts
  };
}
function endGoLoading(){
  return{
    type: '@NewAccount/StartLoading'
  };
}
function startGoLoading(){
  return{
    type: '@NewAccount/StartLoading'
  };
}
function resetAccount(){
  return{
    type: '@NewAccount/Reset'
  };
}

export function submitAccount(newname,newpassword,email){
  return (dispatch, getState) =>{
    dispatch(startGoLoading());
    // check the name is use or not
   return logInSubmit(newname).then((len) => {
      if(len.length > 0){
        ToastAndroid.show('此帳戶名稱已被使用', ToastAndroid.SHORT);
        dispatch(endGoLoading());
        dispatch(resetAccount());
      }
      else{
        // submit the account

         // console.log(email);
          newSubmit(newname, newpassword, email).then((status)=>{
           dispatch(endGoLoading());
          // console.log(status); // output status
          // console.log("Submit NewAccount");
           ToastAndroid.show('帳戶建立成功', ToastAndroid.SHORT);
           dispatch(resetAccount());
           dispatch(toggle());
       }).catch(err => {
           dispatch(endGoLoading());
           console.error('Error creating posts', err);
           dispatch(resetAccount());
       });
      }
    });
  };
}
