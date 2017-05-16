const initCalendarState = {
    calendar: false,
    toggle_schdule: true,
    numindex: 0
};

export function calendar(state = initCalendarState, action) {
    switch (action.type) {
          case '@CALENDAR/TOGGLE_CALENDAR':
               return {
                   ...state,
                   calendar: !state.calendar,
                   toggle_schdule :true
               };
          case '@CALENDAR/TOGGLE_SCHDULE':
               return {
                   ...state,
                   toggle_schdule : !state.toggle_schdule
               };
          case '@CALENDAR/NEXT_WEEK':
               return {
                   ...state,
                   numindex : state.numindex+7
               };
        default:
            return state;
    }
}

const initActivity={
  newtitle: '',
  newtime: '',
  newdata:'',
  loading: false,
  success: false
};

export function newActivity(state = initActivity, action){
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

const Activity={
  title: '',
  time:'',
  data: '',
  modal_activity: false
};

export function activity(state = Activity, action){
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
