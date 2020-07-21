/* global chrome */

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, { message: 'load' });
  // chrome.browserAction.setPopup({ popup: "./popup.html" })
});


// chrome.runtime.onMessage.addListener(
//   function (message, sender, sendResponse) {
//     window.postMessage(message,"*")
//   }
// );

function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
    request.greeting);
  // sendResponse({response: "Response from background script"});
  var sending = chrome.runtime.sendMessage({
    greeting: "FORWARDING: Greeting from the content script"
  });
  console.log("2: Message SENT")
}

chrome.runtime.onMessage.addListener(handleMessage);