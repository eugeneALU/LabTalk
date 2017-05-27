const initCalendarState = {
    calendar: false,
    toggle_schdule: true,
    numindex: 0,
    modal_activity: false,
    day: 0
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
           case '@CALENDAR/MODAL_ACTIVITY':
               return {
                   ...state,
                   modal_activity : !state.modal_activity
               };
           case '@CALENDAR/UPDATE_DATE':
               return {
                   ...state,
                    day: action.day
               };
        default:
            return state;
    }
}

const initActivity={
  newtitle: '',
  newtime: '',
  newdata:'',
  activity: ''
};

export function newactivity(state = initActivity, action){
  switch(action.type){
    case '@NewActivity/TitleChange':
    return{
      ...state,
      newtitle: action.texts
    };
    case '@NewActivity/TimeChange':
    return{
      ...state,
      newtime: action.texts
    };
    case '@NewActivity/DataChange':
    return{
      ...state,
      newdata: action.texts
    };
    case '@NewActivity/Reset':
    return{
      ...initActivity
    };
    case '@NewActivity/SetActivity':
    return{
      ...state,
      activity : action.activity
    };
    default:
      return state;
  }
}
