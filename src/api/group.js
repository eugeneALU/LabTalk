import axios from 'axios';

<<<<<<< HEAD


const postBaseUrl = 'http://localhost:8080/api';

export function listGroups(searchText = '') {
    let url = `${postBaseUrl}/groups`;
    if (searchText)
        url += `?searchText=${searchText}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
=======


const postBaseUrl = 'http://localhost:8080/api';

export function listGroups(searchText = '',username) {
    let url = `${postBaseUrl}/groups/list`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        searchText,
        username
    }).then(function(res) {
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
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

<<<<<<< HEAD
export function addGroupMembers(id, username) {
=======
export function addGroupMembers(id, username, username_login) {
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
    let url = `${postBaseUrl}/groups/members/add`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        id,
<<<<<<< HEAD
        username
=======
        username,
        username_login
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

<<<<<<< HEAD
export function deleteGroupMembers(id, username) {
=======
export function deleteGroupMembers(id, username, username_login) {
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
    let url = `${postBaseUrl}/groups/members/delete`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        id,
<<<<<<< HEAD
        username
=======
        username,
        username_login
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
<<<<<<< HEAD
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

export function deleteGroup(id) {
=======
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
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
    let url = `${postBaseUrl}/groups/delete`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
<<<<<<< HEAD
        id
=======
        id,
        username
>>>>>>> ca3615106ee744075409ba9aa255e9229015af3e
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
