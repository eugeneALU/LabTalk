// Develop server URL
const postBaseUrl = 'http://192.168.2.65:3000/api';
// const postBaseUrl = 'http://labtalk.us-west-2.elasticbeanstalk.com/api';

export function newSubmit(name, password, email){
  let url = `${postBaseUrl}/posts`;

  console.log(`Making POST request to: ${url}`);

  return fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name,
          password,
          email
      })
  }).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.json();
  });
}
