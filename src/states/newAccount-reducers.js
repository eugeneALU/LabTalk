const initAccount={
  email: '',
  newname: '',
  newpassword:'',
  loading: false,
  success: false
};

export function newAccount(state = initAccount, action){
  switch(action.type){
    case '@NewAccount/NameChange':
    return{
      ...state,
      newname: action.texts
    };
    case '@NewAccount/PasswordChange':
    return{
      ...state,
      newpassword: action.texts
    };
    case '@NewAccount/EmailChange':
    return{
      ...state,
      email: action.texts
    };
    case '@NewAccount/StartLoading':
    return{
      ...state,
      loading: true
    };
    case '@NewAccount/EndLoading':
    return{
      ...state,
      loading: false
    };
    case '@NewAccount/Reset':
    return{
      ...initAccount
    };
    default:
      return state;
  }
}
