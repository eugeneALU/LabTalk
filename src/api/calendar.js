import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:8080/api';

//const postBaseUrl = 'http://labtalk.ap-northeast-1.elasticbeanstalk.com/api';

export function newActivity(newtitle,newtime,newdata,group_id,day){
  let url = `${postBaseUrl}/createactivity`;

  console.log(`Making POST request to: ${url}`);

  return axios.post(url, {
        newtitle,
        newtime,
        newdata,
        group_id,
        day
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.status;
    });
}

export function select_group_activity(group_id){
  let url = `${postBaseUrl}/selectactivity`;

  console.log(`Making POST request to: ${url}`);

  return axios.post(url, {
        group_id
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
