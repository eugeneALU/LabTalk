const initLogIn ={
  name: '',
  password:'',
  loading: false,
  logSuc: false,
  modal: false,
  login_success: false
};

export function logIn(state = initLogIn, action){
  switch(action.type){
    case '@LogIn/NameChange':
    return{
      ...state,
      name: action.texts
    };
    case '@LogIn/PasswordChange':
    return{
      ...state,
      password: action.texts
    };
    case '@LogIn/StartLoading':
    return{
      ...state,
      loading: true
    };
    case '@LogIn/Toggle':
    return{
      ...state,
      modal: !state.modal
    };
    case '@LogIn/EndLoading':
    return{
      ...state,
      loading: false
    };
    case '@LogIn/Success':
    return{
      ...state,
     login_success: true
    };
    case '@LogIn/Fail':
    return{
      ...state,
      login_success: false
    };
    case '@LogIn/Reset':
    return{
      ...initLogIn
    };
    default:
      return state;
  }
}
