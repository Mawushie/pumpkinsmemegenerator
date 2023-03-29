//importing catsData
import { catsData } from "./data.js";

const emotionsRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const closeModal = document.getElementById("meme-modal-close-btn");

//event listener to get the id of the radio clicked
emotionsRadios.addEventListener("change", highlightCheckedOption);
//event listener for the get button image
// getImageBtn.addEventListener("click", renderCat);

closeModal.addEventListener("click", function () {
  memeModal.style.display = "none";
});

document.addEventListener("click", function (e) {
  if (e.target.id === "get-image-btn") {
    renderCat();
  } else {
    memeModal.style.display = "none";
  }
});

//highlight the radio clicked
function highlightCheckedOption(e) {
  //remove the highlight class from others except the one higlighted
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

//render cats to the modal
function renderCat() {
  const catObjects = getCatObject();
  if (catObjects.length > 1) {
    catObjects.forEach(function (cat) {
      memeModalInner.innerHTML += `   <img
            class="cat-img"
            src="./images/${cat.image}"
            alt="${cat.alt}"
            >
            `;
    });
  } else {
    memeModalInner.innerHTML = `   <img
            class="cat-img"
            src="./images/${catObjects.image}"
            alt="${catObjects.alt}"
            >
            `;
  }

  memeModal.style.display = "flex";
}

function getCatObject() {
  const catsArray = getMatchingCatsArray();
  if (catsArray.length === 1) {
    console.log("one item", catsArray);
    return catsArray[0];
  } else {
    // const randomNumber = Math.floor(Math.random() * catsArray.length);
    return catsArray;
  }
}

//get matching cats from the array of objects based on what is selected
function getMatchingCatsArray() {
  const selectedEmotion = document.querySelector(
    'input[type="radio"]:checked'
  ).value;
  //check if anything was clicked before getting a match
  if (selectedEmotion) {
    //check if gif only option is selected
    const isGif = gifOnlyOption.checked;
    //filter to get the matching arrays
    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

//get cat emotions from the data provided
function getEmotionsArray(cats) {
  //array to contain all the emotions from each individual cat
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) emotionsArray.push(emotion);
    }
  }
  return emotionsArray;
}

//render the emotions
function renderEmotionsRadios(cats) {
  let radioItems = "";
  const emotions = getEmotionsArray(cats); //this gets the emotions from the cats data.
  for (let emotion of emotions) {
    radioItems += `
            <div class = 'radio'>
               <label >${emotion}</label>
                <input type= 'radio' id='${emotion}' value= '${emotion}' name = 'emotions'>
            </div>
        `;
  }
  emotionsRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
