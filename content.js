chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "replaceImages") {
    chrome.storage.local.get(['replacementImage'], (result) => {
      const replacementImageBase64 = result.replacementImage;
      if (replacementImageBase64) {
        replaceProfileImages(replacementImageBase64);
        observeDOMChanges(replacementImageBase64);
        sendResponse({ status: "success" });
      } else {
        sendResponse({ status: "failure" });
      }
    });
    return true;  // Keeps the message channel open for async response
  }
});

function replaceProfileImages(replacementImageBase64) {
  const images = document.querySelectorAll('.ivm-view-attr__img--centered.EntityPhoto-circle-3.update-components-actor__avatar-image.evi-image.lazy-image.ember-view');
  
  images.forEach(img => {
    img.src = replacementImageBase64;
  });
}

function observeDOMChanges(replacementImageBase64) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        replaceProfileImages(replacementImageBase64);
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
