// Send injection request on parent loaded
const initInjectionInterval = setInterval(() => {
  const parent = document.querySelector("#description-inline-expander");

  if (parent) {
    chrome.runtime.sendMessage({ command: "injectionReq" });
    clearInterval(initInjectionInterval);
  }
}, 500);

// Set translation for user's YouTube lang
const localeInterval = setInterval(() => {
  // localeMatch
  //   [0] = en_US
  //   [1] = en
  //   [2] = US
  let localeMatch = document
    .querySelector("head")
    ?.innerHTML.match(/(?<="GAPI_LOCALE":")(.*?)(?:_(.*?))?(?=")/);

  if (localeMatch && localeMatch[0]) {
    chrome.runtime.sendMessage({
      command: "setLocale",
      lang: localeMatch[1],
      country: localeMatch[2],
      fullLang: localeMatch[0],
    });
    clearInterval(localeInterval);
  }
}, 500);
