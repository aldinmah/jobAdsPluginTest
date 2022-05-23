let apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'https://app.leanlink.io/public/api/api/'
let token = process.env.REACT_APP_API_TOKEN || '008f4ac7-787c-4050-83f2-17466bbd520b'

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

const handle = (promise) => promise
    .then(data => (data))
    .catch(error => Promise.resolve(error));

function get(endpoint, options = {}) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
        },
        ...options,
    };
    return handle(fetch(apiBaseUrl+endpoint, requestOptions).then(handleResponse));
}

function post(endpoint, body, options = {}) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        },
        body: JSON.stringify(body),
        ...options,
    };
    return handle(fetch(apiBaseUrl+endpoint, requestOptions).then(handleResponse));
}

function put(endpoint, body, options = {}) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        },
        body: JSON.stringify(body),
        ...options,
    };
    return handle(fetch(apiBaseUrl+endpoint, requestOptions).then(handleResponse));
}

function del(endpoint, options = {}) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        },
        ...options,
    };
    return handle(fetch(apiBaseUrl+endpoint, requestOptions).then(handleResponse));
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