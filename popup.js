document.getElementById('replaceButton').addEventListener('click', () => {
  const fileInput = document.getElementById('imageInput');
  const button = document.getElementById('replaceButton');

  if (fileInput.files.length === 0) {
    alert('Please select an image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const imageBase64 = event.target.result;
    chrome.storage.local.set({ replacementImage: imageBase64 }, () => {
      button.disabled = true;
      button.classList.add('loading');
      button.innerHTML = 'Replacing...<div class="loading-spinner"></div>';

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "replaceImages" }, response => {
          if (response && response.status === 'success') {
            button.innerHTML = 'Replaced Images';
            button.style.backgroundColor = '#28a745';  // Change to a green color
          } else {
            button.innerHTML = 'Failed to Replace';
            button.style.backgroundColor = '#dc3545';  // Change to a red color
          }
          button.classList.remove('loading');
          button.disabled = false;  // Re-enable button after operation
        });
      });
    });
  };

  reader.readAsDataURL(fileInput.files[0]);
});

document.getElementById('imageInput').addEventListener('change', (event) => {
  const fileName = event.target.files[0].name;
  const label = document.querySelector('.custom-file-label');
  label.textContent = fileName;
});
