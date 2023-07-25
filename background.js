chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("twitter.com")) {
      console.log(tab.url);
      chrome.tabs.sendMessage(tabId, {
        type: "PageLoad",
      });
    }
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete') {
        chrome.tabs.executeScript(tabId, {
            code: 'document.querySelector(\'link[rel*="icon"]\').href = ' + chrome.runtime.getURL("assets/TwitterLogo.png")
        });
    }
});