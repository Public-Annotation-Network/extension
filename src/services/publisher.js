// const PUBLISHER_URL = 'https://pan.network/annotation/v1';
const PUBLISHER_URL = 'http://134.122.90.29:8000';


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

export async function post(route, body) {
    return new Promise((resolve) => {
        window.postMessage({ type: 'POST_PUBLISHER', url: PUBLISHER_URL, body: JSON.stringify(body) }, '*');
        window.addEventListener('message', (event) => {
            if (event.data.type && (event.data.type === 'POST_PUBLISHER_RESPONSE')) {
                resolve(event.data.result);
            }
        });
    });
}

// export async function getAnnotationCIDs( {first=10, skip=0} ) {
// 		const result = await get({ limit: first, offset: skip });

// 		return result;
// }

export const getAnnotationCIDs = async ({ first = 10, skip = 0 }) => {
    const result = await get({ limit: first, offset: skip });

    return result;
}

export async function getAnnotationCIDsByReference({ first, skip, reference }) {
    return;
}

export async function sendAnnotationToPublisher(annotation) {
    return post(PUBLISHER_URL, annotation);
}