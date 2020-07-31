// const PUBLISHER_URL = 'https://pan.network/annotation/v1';
const PUBLISHER_URL = 'https://134.122.90.29:8000';


async function get(params) {
    const query = Object.keys(params)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    return new Promise((resolve) => {
        window.postMessage({ type: 'QUERY_PUBLISHER', url: PUBLISHER_URL + '?' + query }, '*');
        window.addEventListener('message', (event) => {
            if (event.data.type && (event.data.type === 'QUERY_PUBLISHER_RESPONSE')) {
                resolve(event.data.result);
            }
        });
    });
}

export async function post(body) {
    return new Promise((resolve) => {
        window.postMessage({ type: 'POST_PUBLISHER', url: PUBLISHER_URL, body: JSON.stringify(body) }, '*');
        window.addEventListener('message', (event) => {
            if (event.data.type && (event.data.type === 'POST_PUBLISHER_RESPONSE')) {
                resolve(event.data.result);
            }
        });
    });
}

export async function getAnnotationsByReference({ first = 10, skip = 0, reference }) {
    return get({ limit: first, offset: skip, content: reference });
}

export async function sendAnnotationToPublisher(annotation) {
    return post(annotation);
}