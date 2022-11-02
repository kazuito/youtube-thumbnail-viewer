// Send injection request on parent loaded
const initInjectionInterval = setInterval(() => {
  const parent = document.querySelector("#description-inline-expander");

  if (parent) {
    chrome.runtime.sendMessage({ command: "injectionReq" });
    clearInterval(initInjectionInterval);
  }
}, 500);
