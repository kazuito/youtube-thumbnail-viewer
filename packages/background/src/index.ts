async function injectThumbnail(videoId: string) {
  function removeThumbnails() {
    document.querySelectorAll(".ytv-container").forEach((el) => el.remove());
  }

  const imgSrc = await (async () => {
    const imgBaseUrl = `https://img.youtube.com/vi/${videoId}/`;
    const imgFilenames = ["maxresdefault.jpg", "mqdefault.jpg"];

    for (const filename of imgFilenames) {
      const imgUrl = `${imgBaseUrl}${filename}`;
      const res = await fetch(imgUrl);
      if (res.ok) {
        return imgUrl;
      }
    }
    return null;
  })();

  if (!imgSrc) {
    removeThumbnails();
    return;
  }

  const el = `
  <div class="ytv-container">
    <a href="${imgSrc}" class="ytv-link" target="_blank">
      <img src="${imgSrc}" alt="Thumbnail image" class="ytv-img" />
    </a>
  </div>
  `;

  const attemptLimit = 1000;
  let attemptCount = 0;

  const interval = setInterval(() => {
    const target = document.getElementById("description-inline-expander");

    if (++attemptCount > attemptLimit) {
      clearInterval(interval);
      return;
    } else if (!target) {
      return;
    }

    removeThumbnails();
    target.insertAdjacentHTML("afterbegin", el);
    clearInterval(interval);
  }, 100);
}

function parseVideoUrl(url: string) {
  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get("v") || "";

  if (
    !url.startsWith("https://www.youtube.com/watch") ||
    videoId.length !== 11
  ) {
    return null;
  }

  return videoId;
}

function execute(url: string, tabId: number) {
  const videoId = parseVideoUrl(url);

  if (!videoId) return;

  chrome.scripting.executeScript({
    target: { tabId },
    func: injectThumbnail,
    args: [videoId],
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    execute(tab.url, tabId);
  }
});
