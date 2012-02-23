// perform all whippage here.
// listen for whip commands from the extension script.

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "whipit")
    whipit();
});

chrome.extension.sendRequest({method: "getStatus"}, function(response) {
  if (response.status == "true")
    whipit();
});


function whipit() {
  [].slice.call(document.querySelectorAll('body, body *')).forEach(function(t) { t.style.setProperty('background-color','papayaWhip',null) } );
}
