import { getVideoId } from "./utils";

async function injectThumbnail(videoId: string) {
  async function getAvailableThumbnail(videoId: string) {
    const baseUrl = `https://img.youtube.com/vi/${videoId}/`;
    const imgFilenames = ["maxresdefault.jpg", "mqdefault.jpg"];

    for (const filename of imgFilenames) {
      const imgUrl = `${baseUrl}${filename}`;
      const res = await fetch(imgUrl);
      if (res.ok) {
        return imgUrl;
      }
    }
    return null;
  }
  function removeThumbnails() {
    document.querySelectorAll(".ytv-container").forEach((el) => el.remove());
  }

  const imgSrc = await getAvailableThumbnail(videoId);

  if (!imgSrc) {
    removeThumbnails();
    return;
  }

  const el = `
  <div class="ytv-container">
    <a href="${imgSrc}" class="ytv-link" target="_blank">
      <img src="${imgSrc}" alt="Thumbnail image" class="ytv-img" />
    </a>
  </div>`;

  const intervalDuration = 100;
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
  }, intervalDuration);
}

function perform(url: string, tabId: number) {
  const videoId = getVideoId(url);

  if (!videoId) return;

  chrome.scripting.executeScript({
    target: { tabId },
    func: injectThumbnail,
    args: [videoId],
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    perform(tab.url, tabId);
  }
});
