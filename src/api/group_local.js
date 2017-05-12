import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const groupsKey = 'groups';

export function listGroups(searchText = '') {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listGroups(searchText));
        }, 500);
    });
}

// Simulated server-side code
function _listGroups(searchText = '') {
    let groupString = localStorage.getItem(groupsKey);
    let groups = groupString ? JSON.parse(groupString) : [];
    if (groups.length > 0 && searchText) {
        groups = groups.filter(p => {
            return p.name.toLocaleLowerCase().indexOf(searchText.toLowerCase()) !== -1
        });
    }
    return groups;
};

export function createGroup(name) {
    return new Promise((resolve, reject) => {
        resolve(_createGroup(name));
    });
}

// Simulated server-side code
function _createGroup(name) {
    const newgroup = {
        id: uuid(),
        name: name,
        ts: moment().unix()
    };
    const groups = [
        newgroup,
        ..._listGroups()
    ];
    localStorage.setItem(groupsKey, JSON.stringify(groups));
    return newgroup;
}

export function deleteGroup(id) {
    return new Promise((resolve, reject) => {
        resolve(_deleteGroup(id));
    });
}

function _deleteGroup(id) {
  let groupString = localStorage.getItem(groupsKey);
  let groups = groupString ? JSON.parse(groupString) : [];
  if (groups.length > 0) {
      groups = groups.filter(p => {
          if(p.id !== id)
            return p
      });
  }
  localStorage.setItem(groupsKey, JSON.stringify(groups));
  return groups;
}
