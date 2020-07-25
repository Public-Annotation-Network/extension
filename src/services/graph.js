import fetch from 'cross-fetch';

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/public-annotation-network/subgraph';


async function sendQuery (query) {
    try {
        const response = await fetch(
            SUBGRAPH_URL,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) }
        );

        if (response.status !== 200) { throw new Error(response); }

        let body;
        try {
            body = await response.json();
        } catch (error) {
            throw new Error('Response body is empty.')
        }

        return body;
    } catch (error) {
        throw new Error('Could not query subgraph: ' + error);
    }
}

export async function getAnnotationBatchCIDs(first, skip) {
    const result = await sendQuery(
        `
            {
                annotationBatches(first: ${first}, skip: ${skip}) {
                    cid
                }
            }
        `
    );

    if (!result || !result.data || !result.data.annotationBatches) {
        throw new Error('Unexpected response format.');
    }

    return result.data.annotationBatches.map(({ cid }) => cid);
}

export async function getAnnotationCIDs(first, skip) {
    const result = await sendQuery(
        `
            {
                annotations(first: ${first}, skip: ${skip}) {
                    cid
                    ref
                }
            }
        `
    );

    if (!result || !result.data || !result.data.annotations) {
        throw new Error('Unexpected response format.');
    }

    return result.data.annotations.map(({ cid }) => cid);
}

export  async function getAnnotationCIDsByReference(first, skip, reference) {
    const result = await sendQuery(
        `
            {
                annotations(first: ${first}, skip: ${skip}, where: { ref_contains: "${reference}" }) {
                    cid
                    ref
                }
            }
        `
    );

    if (!result || !result.data || !result.data.annotations) {
        throw new Error('Unexpected response format.');
    }

    return result.data.annotations.map(({ cid }) => cid);
}
