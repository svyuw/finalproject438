const checkbox = document.getElementById("enable");
const addPagePet = document.getElementById("add-block");
const select = document.getElementById("category");

// Add event listeners to the checkbox and button
checkbox.addEventListener("change", (e) => updateContentScript("NOSHOW"));
addPagePet.addEventListener("click", (e) => updateContentScript("ADDPET"));
select.addEventListener("change", (e) => updateContentScript("CHANGEIMAGE"));

async function updateContentScript(messageType) {
  // Sends a message to the content script with an object that has the
  // current value of the checkbox and a boolean (whether to add a block)
  const message = {
    enable: checkbox.checked,
    messageType: messageType,
    imageType: select.value,
  };
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // You can do something with response from the content script here
  console.log(response);
}
