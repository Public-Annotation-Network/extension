import fetch from 'cross-fetch';

const IPFS_URL = 'https://gateway.pinata.cloud/ipfs';


export async function getAnnotationData(cid) {
    try {
        const response = await fetch(IPFS_URL + '/' + cid);
        
        if (response.status !== 200) { throw new Error(response); }

        try {
            return await response.json();
        } catch (error) {
            throw new Error('Response body is empty.')
        }
    } catch (error) {
        throw new Error('Could not query IPFS node: ' + error);
    }
}
