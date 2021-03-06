import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:3000/api';

//const postBaseUrl = 'http://labtalk.ap-northeast-1.elasticbeanstalk.com/api';

export function newSubmit(name, password, email){
  let url = `${postBaseUrl}/posts`;

  console.log(`Making POST request to: ${url}`);

  return axios.post(url, {
        name,
        password,
        email
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.status;
    });
}
