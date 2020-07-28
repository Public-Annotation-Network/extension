import fetch from 'cross-fetch';

// const PUBLISHER_URL = 'https://pan.network/annotation/v1';
const PUBLISHER_URL = 'http://134.122.90.29:8000';


async function get(params) {
	const query = Object.keys(params)
		.map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
		.join('&');

	const response = await fetch(PUBLISHER_URL + '?' + query);

	if (response.status !== 200) {
		throw new Error(response);
	}

	try {
		return await response.json();
	} catch (error) {
		throw error;
	}
}

export async function post(route, body) {
	const response = await fetch(route, {
		method: 'POST',
		// headers: { 'Content-Type': 'application/json', Authorization: TOKEN },
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});

	if (response.status !== 200) {
		throw new Error(response.statusText);
	}

	try {
		return await response.json();
	} catch (error) {
		throw error;
	}
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
	return await post(PUBLISHER_URL, annotation);
}