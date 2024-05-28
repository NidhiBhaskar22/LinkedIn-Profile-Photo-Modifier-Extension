chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "replaceImages") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: replaceProfileImages
        });
      });
    }
});
  
function replaceProfileImages() {
    const replacementImagePath = chrome.runtime.getURL('replacement.jpg');
    function replaceImages() {
      const images = document.querySelectorAll('.ivm-view-attr__img--centered.EntityPhoto-circle-3.update-components-actor__avatar-image.evi-image.lazy-image.ember-view');
      
      images.forEach(img => {
        img.src = replacementImagePath;
      });
    }

    replaceImages();
}
