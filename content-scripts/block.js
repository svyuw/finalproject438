let shouldShowPagePet = true;
const defaultImageUrl =
  "https://resources.construx.com/wp-content/uploads/2016/08/gif-placeholder.gif";
let tenorUrl = null;
// Create a block container div and append it to the document

function addPagePet() {
  const pagePetContainer = document.createElement("div");
  pagePetContainer.classList.add("page-pet__container");
  document.body.appendChild(pagePetContainer);

  const insideContainer = document.createElement("div");
  insideContainer.classList.add("inside-container");

  const pagePet = document.createElement("img");
  pagePet.src = tenorUrl !== null ? tenorUrl : defaultImageUrl;
  console.log(pagePet.src);
  pagePet.classList.add("page-pet");

  const removeBtn = document.createElement("div");
  removeBtn.classList.add("btn");
  removeBtn.classList.add("remove-btn");
  const xIcon = document.createElement("img");
  xIcon.src =
    "https://icons-for-free.com/download-icon-x+icon-1320166903649367557_512.png";
  xIcon.width = 25;
  xIcon.height = 25;
  removeBtn.appendChild(xIcon);
  removeBtn.addEventListener("click", () => {
    deleteElement(pagePetContainer);
  });

  // Add the delete button and drag handle to the block
  insideContainer.appendChild(pagePet);
  insideContainer.appendChild(removeBtn);
  pagePetContainer.appendChild(insideContainer);
  pagePetContainer.addEventListener("click", () => {
    if (
      pagePetContainer.classList.contains("x") &&
      insideContainer.classList.contains("y")
    ) {
      pagePetContainer.classList.remove("x");
      insideContainer.classList.remove("y");
    } else {
      pagePetContainer.classList.add("x");
      insideContainer.classList.add("y");
    }
  });
}

async function getTenorImage(query) {
  const url = `https://sessions.teleparty.com/search-gifs?q=${query}&locale=en-US`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function deleteElement(element) {
  element.remove();
}

// function makeDraggable(el) {
//   el.addEventListener("mousedown", function (e) {
//     const parentBlock = el.parentNode;
//     var offsetX =
//       e.clientX - parseInt(window.getComputedStyle(parentBlock).left);
//     var offsetY =
//       e.clientY - parseInt(window.getComputedStyle(parentBlock).top);

//     function mouseMoveHandler(e) {
//       parentBlock.style.top = e.clientY - offsetY + "px";
//       parentBlock.style.left = e.clientX - offsetX + "px";
//     }

//     function reset() {
//       window.removeEventListener("mousemove", mouseMoveHandler);
//       window.removeEventListener("mouseup", reset);
//     }

//     window.addEventListener("mousemove", mouseMoveHandler);
//     window.addEventListener("mouseup", reset);
//   });
// }

function renderPagePet(shouldShowPagePet) {
  const allPagePets = document.querySelectorAll(".page-pet__container");
  for (const element of allPagePets) {
    if (shouldShowPagePet) {
      element.classList.remove("invisible");
    } else {
      element.classList.add("invisible");
    }
  }
}

// Add a message listener that sets the value of "replace"
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  shouldShowPagePet = request["enable"];
  if (request["messageType"] === "ADDPET") {
    addPagePet();
  } else if (request["messageType"] === "CHANGEIMAGE") {
    let imageResponse = await getTenorImage(request["imageType"]);
    const randomNumber = Math.floor(Math.random() * 19) + 1;
    tenorUrl = imageResponse.results[randomNumber].media.fullMobile.url;
    console.log(tenorUrl);
  }
  renderPagePet(shouldShowPagePet);
});
