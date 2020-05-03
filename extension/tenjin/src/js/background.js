let isPaused = localStorage.getItem("pause-highlighting");
if (isPaused === null) isPaused = false;
else isPaused = isPaused == "true";

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
	id:"1",
	title: `${isPaused ? "Resume" : "Pause"} higlighting on all sites`,
	contexts: ["browser_action"]
});
chrome.contextMenus.onClicked.addListener(_ => {
    localStorage.setItem("pause-highlighting",isPaused ? "false" : "true");
})