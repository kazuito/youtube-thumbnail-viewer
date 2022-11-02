async function injectThumbnail(videoId) {
  const imgBaseUrl = `https://img.youtube.com/vi/${videoId}/`;
  const imgFileNames = ["maxres", "mq", ""];

  let imgUrl = "";

  // Set valid thumbnail image url
  for (let imgFileName of imgFileNames) {
    let url = `${imgBaseUrl}${imgFileName}default.jpg`;
    let req = new Request(url);
    await fetch(req).then((res) => {
      console.log(res);
      if (res.status === 200) {
        imgUrl = url;
      }
    });
    if (imgUrl !== "") break;
  }

  let aTag = document.querySelector(".yt-thumb-link");
  let imgTag = document.querySelector(".yt-thumb-image");

  if (aTag && imgTag) {
    // Update href/src
    aTag.setAttribute("href", imgUrl);
    imgTag.setAttribute("src", imgUrl);
  } else {
    // Create Thumbnail Image
    const img = `
    <div class="yt-thumb-container">
      <a href="${imgUrl}" target="blank" class="yt-thumb-link">
        <img src="${imgUrl}" alt="Thumbnail Image preview" class="yt-thumb-image" />
        <div class="yt-thumb-interaction-fill"></div>
        <svg class="yt-thumb-open-icon" xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path d="M5.3 20.5q-.75 0-1.275-.525Q3.5 19.45 3.5 18.7V5.3q0-.75.525-1.275Q4.55 3.5 5.3 3.5h6.325V5H5.3q-.1 0-.2.1t-.1.2v13.4q0 .1.1.2t.2.1h13.4q.1 0 .2-.1t.1-.2v-6.325h1.5V18.7q0 .75-.525 1.275-.525.525-1.275.525Zm4.425-5.175-1.05-1.05L17.95 5H14V3.5h6.5V10H19V6.05Z" fill="#fff"/>
        </svg>
      </a>
    </div>
    `;
    document
      .querySelector("#description-inline-expander")
      .insertAdjacentHTML("afterbegin", img);

    // Create Tooltip
    const tooltip = `
    <div class="yt-thumb-tooltip">Thumbnail image</div>
    `;
    document
      .querySelector("#description-inner")
      .insertAdjacentHTML("beforeend", tooltip);
  }
}

function executeScript(url, tabId) {
  let videoIdMatch = url.match(/(?<=[?&]v=)(.{11})/);
  console.log(videoIdMatch);
  if (videoIdMatch && videoIdMatch[0]) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: injectThumbnail,
      args: [videoIdMatch[0]],
    });
  }
}

// Receive messages from content script
chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  switch (req.command) {
    case "injectionReq": {
      executeScript(sender.url, sender.tab.id);
    }
  }
});

// On page changed
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  executeScript(details.url, details.tabId);
});
