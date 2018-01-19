// const postBaseUrl = 'http://labtalk.us-west-2.elasticbeanstalk.com/api';
const postBaseUrl = 'http://192.168.2.65:3000/api';

export function listChats(id, searchText = '', hidden) {
    let url ='';

    if(hidden)
      url = `${postBaseUrl}/chats/list/hid`;
    else {
      url = `${postBaseUrl}/chats/list`;
    }
    console.log(`Making POST request to: ${url}`);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id, searchText, hidden
        })
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
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

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id, username, text, hidden
        })
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });
}
