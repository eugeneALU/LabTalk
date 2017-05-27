import axios from 'axios';

//const postBaseUrl = 'http://labtalk.ap-northeast-1.elasticbeanstalk.com/api';

const postBaseUrl = 'http://localhost:8080/api';

export function listChats(id, searchText = '', hidden) {
    let url ='';

    if(hidden)
      url = `${postBaseUrl}/chats/list/hid`;
    else {
      url = `${postBaseUrl}/chats/list`;
    }
    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        id,
        searchText
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createChat(id, username, text, hidden) {
  let url ='';

  if(hidden)
    url = `${postBaseUrl}/chats/create/hid`;
  else {
    url = `${postBaseUrl}/chats/create`;
  }

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        id,
        username,
        text
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
