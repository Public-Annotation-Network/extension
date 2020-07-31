const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/public-annotation-network/subgraph';


async function sendQuery(query) {
    return new Promise(async (resolve) => {
        window.postMessage({ type: 'QUERY_SUBGRAPH', url: SUBGRAPH_URL, query: JSON.stringify({ query }) }, '*');
        window.addEventListener('message', async (event) => {
            if (event.data.type && (event.data.type === 'QUERY_SUBGRAPH_RESPONSE')) {
                resolve(event.data.result);
            }
        });
    });
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

export async function getAnnotationCIDs({ first = 10, skip = 0 }) {
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

export async function getAnnotationCIDsByReference({ first = 10, skip = 0, reference }) {
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
