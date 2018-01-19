import {newActivity,select_group_activity} from 'api/calendar.js'

export function toggle_Calendar(){
    return {
        type: '@CALENDAR/TOGGLE_CALENDAR'
    }
}
export function toogle_Schdule(){
    return {
        type: '@CALENDAR/TOGGLE_SCHDULE'
    }
}
export function next_week(){
    return {
        type: '@CALENDAR/NEXT_WEEK'
    }
}
export function toggle_modal_activity(){
    return {
        type: '@CALENDAR/MODAL_ACTIVITY'
    }
}
export function update_date(day){
    return {
        type: '@CALENDAR/UPDATE_DATE',
        day
    }
}

export function changeTitle(texts){
  return{
    type: '@NewActivity/TitleChange',
    texts
  };
}
export function changeTime(texts){
  return{
    type: '@NewActivity/TimeChange',
    texts
  };
}
export function changeData(texts){
  return{
    type: '@NewActivity/DataChange',
    texts
  };
}

function resetActivity(){
  return{
    type: '@NewActivity/Reset'
  };
}

function Activity(activity){
    return {
        type: '@NewActivity/SetActivity',
        activity
    }
}

export function submitActivity(newtitle,newtime,newdata,group_id,day){
  return (dispatch, getState) =>{

   return newActivity(newtitle,newtime,newdata,group_id,day).then((status)=>{
           console.log("Submit NewActivity");
           alert('活動已成功建立');
           dispatch(resetActivity());
           dispatch(toggle_modal_activity());
           dispatch(select_by_group(group_id));
       }).catch(err => {
           console.error('Error creating posts', err);
           dispatch(resetActivity());
       });
  };
}

export function select_by_group(group_id){
    return (dispatch, getState) => {
        return select_group_activity(group_id).then((activity)=>{
           console.log(activity);
           dispatch(Activity(activity));
       }).catch(err => {
           console.error('Error creating posts', err);
       });
    };
}
