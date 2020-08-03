/* global chrome */

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
	main();
});

function main() {
	// eslint-disable-next-line no-undef
	const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
	// eslint-disable-next-line no-restricted-globals
	if (!location.ancestorOrigins.contains(extensionOrigin)) {
		// Fetch the local React index.html page
		// eslint-disable-next-line no-undef
		fetch(chrome.runtime.getURL('index.html') /*, options */)
			.then((response) => response.text())
			.then((html) => {
				const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);
				// eslint-disable-next-line no-undef
				$(styleStashHTML).appendTo('body');
			})
			.catch((error) => {
				console.warn(error);
			});
	}
}

window.addEventListener('message', function (event) {
	if (event.source !== window) return;
	onDidReceiveMessage(event);
});

async function onDidReceiveMessage(event) {
	// SUBGRAPH QUERIES
	if (event.data.type && (event.data.type === 'QUERY_SUBGRAPH')) {
		try {
			const response = await fetch(
				event.data.url,
				{ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: event.data.query }
			);
			if (response.status !== 200) { throw new Error(response); }
			try {
				const result = await response.json();
				window.postMessage({ type: 'QUERY_SUBGRAPH_RESPONSE', result }, '*');
			} catch (error) {
				console.log(error);
				throw new Error('Response body is empty.')
			}
		} catch (error) {
			throw new Error('Could not send HTTP request: ' + error);
		}
	}
	// IPFS QUERIES
	if (event.data.type && (event.data.type === 'QUERY_IPFS')) {
		try {
			const response = await fetch(event.data.url);
			if (response.status !== 200) { throw new Error(response); }
			try {
				const result = await response.json();
				window.postMessage({ type: 'QUERY_IPFS_RESPONSE', result }, '*');
			} catch (error) {
				console.log(error);
				throw new Error('Response body is empty.')
			}
		} catch(error) {
			throw new Error('Could not send HTTP request: ' + error);
		}
	}
	// PUBLISHER QUERIES
	if (event.data.type && (event.data.type === 'QUERY_PUBLISHER')) {
		try {
			const response = await fetch(event.data.url);
			if (response.status !== 200) { throw new Error(response); }
			try {
				const result = await response.json();
				window.postMessage({ type: 'QUERY_PUBLISHER_RESPONSE', result }, '*');
			} catch (error) {
				console.log(error);
				window.postMessage({ type: 'QUERY_PUBLISHER_RESPONSE', result: [] }, '*');
				// throw new Error('Response body is empty.')
			}
		} catch(error) {
			window.postMessage({ type: 'QUERY_PUBLISHER_RESPONSE', result: [] }, '*');
			// throw new Error('Could not send HTTP request: ' + error);
		}
	}
	// PUBLISHER POSTS
	if (event.data.type && (event.data.type === 'POST_PUBLISHER')) {
		try {
			const response = await fetch(
				event.data.url,
				{ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: event.data.body }
			);
			if (response.status !== 200) { throw new Error(response); }
			try {
				const result = await response.json();
				window.postMessage({ type: 'POST_PUBLISHER_RESPONSE', result }, '*');
			} catch (error) {
				console.log(error);
				throw new Error('Response body is empty.')
			}
		} catch (error) {
			throw new Error('Could not send HTTP request: ' + error);
		}
	}
}
