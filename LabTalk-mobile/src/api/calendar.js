
// Develop server URL
const postBaseUrl = 'http://192.168.2.65:3000/api';
// const postBaseUrl = 'http://labtalk.us-west-2.elasticbeanstalk.com/api';

export function newActivity(newtitle,newtime,newdata,group_id,day){
  let url = `${postBaseUrl}/createactivity`;

  console.log(`Making POST request to: ${url}`);

  return fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          newtitle,
          newtime,
          newdata,
          group_id,
          day
      })
  }).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.json();
  });
}

export function select_group_activity(group_id){
  let url = `${postBaseUrl}/selectactivity`;

  console.log(`Making POST request to: ${url}`);

  return fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          group_id
      })
  }).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.json();
  });
}
