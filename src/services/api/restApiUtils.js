import 'isomorphic-fetch';

const HEADERS = {
    'Content-type': 'application/json; charset=UTF-8'
};
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

export async function handleRequest(url, type, options = {}, data = {}) {
    const config = {
        ...options,
        method: type,
        headers: HEADERS
    };
    if (type === 'POST') {
        config.body = JSON.stringify(data);
    }
    try {
        // TODO:: add loader state
        const response = await fetch(url, config);
        if (response.status !== 200) {
            throw new Error('Bad response from server');
        }
        if (options.no_result) {
            return {};
        }
        const serverData = await response.json();
        return serverData;
    } catch (e) {
        return await Promise.reject(e);
    }
}

export async function get(url, options = {}) {
    return await handleRequest(url, GET, options);
}

export async function post(url, data, options = {}) {
    return await handleRequest(url, POST, options, data);
}

export async function putAction(url, data = {}, options = {}) {
    return await handleRequest(url, PUT, options, data);
}

export async function deleteAction(url, options = {}) {
    return await handleRequest(url, DELETE, options);
}
