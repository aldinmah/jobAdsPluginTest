let appBaseUrlEl = 'https://staging.leanlink.io/public/api/'
let tokenEl = '008f4ac7-787c-4050-83f2-17466bbd520b'

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

const handle = (promise) => promise
    .then(data => ([data, undefined]))
    .catch(error => Promise.resolve([undefined, error]));

function get(url, options = {}) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json',
            'X-Auth-Token': tokenEl,
        },
        ...options,
    };
    return handle(fetch(url, requestOptions).then(handleResponse));
}

function post(url, body, options = {}) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': tokenEl
        },
        body: JSON.stringify(body),
        ...options,
    };
    return handle(fetch(url, requestOptions).then(handleResponse));
}

function put(url, body, options = {}) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': tokenEl
        },
        body: JSON.stringify(body),
        ...options,
    };
    return handle(fetch(url, requestOptions).then(handleResponse));
}

function del(url, options = {}) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': tokenEl
        },
        ...options,
    };
    return handle(fetch(url, requestOptions).then(handleResponse));
}

const getFromStorage = (storageKey, isSessionStorage) => {
    if(isSessionStorage)
	    return JSON.parse(window.sessionStorage.getItem(storageKey)) || {};
    else
        return JSON.parse(window.localStorage.getItem(storageKey)) || {};
};

const setInStorage = (data, storageKey, isSessionStorage) => {
    let existingData = getFromStorage();
	Object.assign(existingData, data);
    if(isSessionStorage)
	    window.sessionStorage.setItem(storageKey,JSON.stringify(existingData));
    else
        window.localStorage.setItem(storageKey,JSON.stringify(existingData));
};

const API = {
    get,
    post,
    put,
    delete: del,
    setInStorage,
    getFromStorage
};

export default API;