import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:3000/api';

//const postBaseUrl = 'http://labtalk.ap-northeast-1.elasticbeanstalk.com/api';

 export function logInSubmit(name,password){
   let url = `${postBaseUrl}/login`;

   console.log(`Making POST request to: ${url}`);

   return axios.post(url,{
     name,
     password
   }).then(function(res) {
       if (res.status !== 200)
           throw new Error(`Unexpected response code: ${res.status}`);

       console.log(res);
       return res.data.length;
     });
 }
