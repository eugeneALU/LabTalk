import axios from 'axios';



const postBaseUrl = 'http://localhost:8080/api';

export function listGroups(searchText = '',username) {
    let url = `${postBaseUrl}/groups/list`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        searchText,
        username
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createGroup(groupname, username) {
    let url = `${postBaseUrl}/groups`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        groupname,
        username
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function addGroupMembers(id, username, username_login) {
    let url = `${postBaseUrl}/groups/members/add`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        id,
        username,
        username_login
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function deleteGroupMembers(id, username, username_login) {
    let url = `${postBaseUrl}/groups/members/delete`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        id,
        username,
        username_login
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function getGroup(id) {
    let url = `${postBaseUrl}/groups/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function deleteGroup(id, username) {
    let url = `${postBaseUrl}/groups/delete`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        id,
        username
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
