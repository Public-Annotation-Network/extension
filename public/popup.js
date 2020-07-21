var btn = document.getElementById('my-button')
function handleClick() {
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, "wohooo", function(response){
    //     });
    // });
    var sending = chrome.runtime.sendMessage({
        greeting: "Greeting from the content script"
      });
      console.log("1: Message SENT")
}

btn.addEventListener("click", handleClick);