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

window.addEventListener("message", function (event) {
  if (event.source !== window) return;
  onDidReceiveMessage(event);
});

async function getAnnotationData(cid) {
  try {
      const response = await fetch('https://gateway.pinata.cloud/ipfs' + '/' + cid);
      
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

async function onDidReceiveMessage(event) {
  // we should probably add a switch here to handle multiple types of requests
  if (event.data.type && (event.data.type === "GET_ANNOTATIONS")) {
    // TODO: this data is hardcoded, it has to come from the event
    var data = JSON.stringify({ "query": "\n            {\n                annotations(first: 10, skip: 0, where: { ref_contains: \"1281904943700619265\" }) {\n                    cid\n                    ref\n                }\n            }\n        " });
    // I used XMLHttpRequest instead of fetch just because it was the first example on Postman, 
    // on the getAnnotationData above we're using fetch, so we should refactor this function to also use fetch.
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", async function () {
      if (this.readyState === 4) {
        console.log(this.responseText)
        const {data: annotations} = JSON.parse(this.responseText)
        const documents = await Promise.all(annotations.annotations.map(({cid}) => getAnnotationData(cid)))
        // Components.Reader.js has an event listener which handles this message
        window.postMessage({type:"GET_ANNOTATIONS_RESPONSE" , documents}, "*");
      }
    });

    xhr.open("POST", "https://api.thegraph.com/subgraphs/name/public-annotation-network/subgraph");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = false
    xhr.send(data);
  }
}


