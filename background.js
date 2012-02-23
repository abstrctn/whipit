// background page javascript.
// interfaces with Whip It's localStorage.whipit activation toggle

var red = [255, 0, 0, 180];
var green = [0, 255, 20, 240];

function is_whipit() {
  return localStorage.whipit == "true";
}

function updateBadge(color) {
  chrome.browserAction.setBadgeBackgroundColor({color: color});
}

if (is_whipit())
  updateBadge(green);
else
  updateBadge(red);

chrome.browserAction.setBadgeText({text: " "});

// When the Whip It! toolbar button is pressed, toggle whether Whip It! is active.
// When turning Whip It! on, run the whippifyer script.
// When turning Whip It! off, reload the page to clear the whip.
chrome.browserAction.onClicked.addListener(function(tab) {
  if (is_whipit()) {
    // Turn Whip It! off, reload page
    localStorage.whipit = "false";
    badgeColor = red;
    updateBadge(red);
    chrome.tabs.update(tab.id, {url: tab.url});
  } else {
    // Turn Whip It! on, run Whip It!
    localStorage.whipit = "true";
    updateBadge(green);
    // Execute whipit() in content.js
    chrome.tabs.sendRequest(tab.id, {method: "whipit"}, function(response) {});
  }
});
