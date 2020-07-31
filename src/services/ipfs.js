const IPFS_URL = 'https://gateway.pinata.cloud/ipfs';


export async function getAnnotationData(cid) {
    return new Promise((resolve) => {
        window.postMessage({ type: 'QUERY_IPFS', url: IPFS_URL + '/' + cid }, '*');
        window.addEventListener('message', (event) => {
            if (event.data.type && (event.data.type === 'QUERY_IPFS_RESPONSE')) {
                resolve(event.data.result);
            }
        });
    });
}
