const fetch = require('cross-fetch');


const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/public-annotation-network/subgraph';

async function sendQuery (query) {
  try {
    const response = await fetch(
      SUBGRAPH_URL,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) }
    );
    const body = await response.json();

    if (response.status !== 200 || (body.errors && body.errors.length > 0)) {
      throw new Error(JSON.stringify(body.errors));
    }

    return body;
  } catch (error) {
    console.error(error);      
    throw new Error('Could not query subgraph: ' + error);
  }
}

async function getAnnotationBatches(first, skip) {
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
    throw new Error('No annotation batches found.');
  }

  return result.data.annotationBatches;
}

async function getAnnotations(first, skip) {
  const result = await sendQuery(
    `
      {
        annotations(first: ${first}, skip: ${skip}) {
          cid
          batchCID
        }
      }
    `
  );

  if (!result || !result.data || !result.data.annotations) {
    throw new Error('No annotations found.');
  }

  return result.data.annotations;
}

(async () => {
  console.log(await getAnnotationBatches(10, 0));
  console.log(await getAnnotations(10, 0));
})();