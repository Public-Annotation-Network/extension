/* global chrome */

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.tabs.sendMessage(tab.id, { message: 'load' });
});

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