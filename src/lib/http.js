import qs from 'qs';
import identity from "./identity";

const apiServer = '/api';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let message = `服务器响应错误(${response.status}) ${response.statusText} ${
            response.url
        }`;
        let error = new Error(message);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

function isResultObject(obj) {
    return (
        obj &&
        obj.hasOwnProperty('success') &&
        obj.hasOwnProperty('content') &&
        obj.hasOwnProperty('message')
    );
}

function checkResult(result) {
    if (isResultObject(result)) {
        if (result.success === true) {
            return Promise.resolve(result.content);
        } else {
            let error = new Error(result.message);
            error.result = result;
            return Promise.reject(error);
        }
    } else {
        return Promise.resolve(result);
    }
}

export function request(path, options = {}) {
    const {isAuthenticated, token} = identity;
    const headers =
        isAuthenticated && token
            ? {
                ...options.headers,
                // Authorization: `Bearer ${token}`,
                Token: `${token}`
            }
            : {...options.headers};
    const url = path.indexOf("http") >= 0 ? path : `${apiServer}${path}`;
    return fetch(url, {
        ...options,
        headers
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(checkResult);
}

export function requestBlob(path, options = {}) {
    return fetch(`${apiServer}${path}`, options)
        .then(response => response.blob())
        .then(checkResult);
}

export function exportFile(path, data) {
    return requestBlob(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(data)
    });
}

export function get(path) {
    return request(path, {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache'
        },
    });
}

export function post(path, data) {
    return request(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(data)
    });
}

export function postJson(path, data) {
    return request(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(data)
    });
}

export function put(path, data) {
    return request(path + '/' + data.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(data)
    });
}

export function putJson(path, data) {
    return request(path + '/' + data.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export function postForm(path, data) {
    return request(path, {
        method: 'POST',
        body: formify(data)
    });
}

function formify(data) {
    if (typeof data !== 'object') return null;
    let formData = new FormData();
    for (let key in data) {
        if (data[key] instanceof Array) {
            for (let i in data[key]) {
                formData.append(key, data[key][i]);
            }
        } else {
            formData.append(key, data[key] || '');
        }
    }
    return formData;
}
