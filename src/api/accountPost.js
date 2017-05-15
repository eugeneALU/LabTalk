import axios from 'axios';

// Develop server URL
 const postBaseUrl = 'http://localhost:8080/api';

export function newSubmit(name,password,email){
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
