import{
  logInSubmit
}from 'api/logIn.js';
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
function resetItem(){
  return{
    type: '@LogIn/Reset'
  };
}
function loginSuccess(){
  return {
    type: '@LogIn/Success',
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
        dispatch(loginSuccess());
      }
      else{
        console.log("Log in fail");
        dispatch(loginFail());
        dispatch(resetItem());
        alert('NO This Account!!');
      }
    });
  };
}
