// CONSTANTS FOR SELECTORS

const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const galleryArea = document.querySelector(".gallery");
const deleteBtn = document.querySelector(".search-box .fa-xmark");
const enlargedBox = document.querySelector(".enlarged-box");
const closeBtn = document.querySelector(".enlarged-box .fa-xmark");
const downloadBtn = document.querySelector(".enlarged-box .fa-download");
const wrapper = document.querySelector(".enlarged-box .wrapper");


// API KEY, NUMBER OF IMAGES AND PAGES, SEARCH WORDS  

const apiKey = "BPMzMqljebkGhOZlvLsfHAuJLyyjbDnrsXaO8tiUaPJgTQY0VYUMX0QV";
const perPage = 15;
const loadedImageIds = [];
let currentPage = 1;
let searchWords = null;


// FUNCTION FOR GENERATING IMAGES

const generateHTML = (images) => {
  if (images.length === 0) {
    // if the array is empty, display a message indicating that there are no images
    setNoImgMessage();
  } else {
    images.forEach((img) => {
      // check if the photo's id is already in the array of loaded photos
      if (!loadedImageIds.includes(img.id)) {
        // if the id is not found, add the photo
        const cardHTML = `
          <li class="card" onclick="enlargeImage('${img.photographer}&nbsp;', '&nbsp;${img.width}x${img.height}', '${img.src.large2x}', '${img.alt.replaceAll("'", "\\'").replaceAll('"', '\\"') || "Photo"}')">
            <img src="${img.src.large2x}" alt="${img.alt.replaceAll("'", "\\'").replaceAll('"', '\\"') || 'Photo'}">
            <div class="details">
              <div class="photographer">
                <i class="fa-solid fa-camera"></i>
                <span>${img.photographer}</span>
              </div>
              <button onclick="downloadImage('${img.src.original}');event.stopPropagation();">
                <i class="fa-solid fa-download" title="Download"></i>
              </button>
            </div>
          </li>
        `;
        
        // add the photo's id to the array of already loaded photos
        loadedImageIds.push(img.id);

        // add the photo to the gallery
        imagesWrapper.innerHTML += cardHTML;
      }
    });
  }
};


// FUNCTION FOR FETCHING IMAGES FROM THE SERVER

// The first option:
const getImages = (apiURL) => {
  // Declares the getImages function, which takes apiURL argument.

  setLoadingState();
  // Set the loading state on the button

  fetch(apiURL, { headers: { Authorization: apiKey } })
    // An HTTP request is made to the specified URL (apiURL) using the fetch function. In this request, an Authorization header is also sent with the apiKey value to access protected data.

    .then(result => result.json())
    // The result of the request is processed, and the .json() method is called, which converts the response into JSON format. This creates and returns a new promise that will resolve with the JSON data when it's ready.

    .then(data => {
      // JSON data that was resolved in the previous promise is processed. The callback function takes this data as an argument.

      console.log(data);
      // The data is logged to the console to inspect the data received from the request.

      generateHTML(data.photos);
      // The generateHTML function is called with data.photos as an argument. In this function, HTML code for images is generated based on data.photos and added to the specified element on the web page. This way, the images will be displayed on the page.

      setLoadMoreState();
      // Change the button state back to normal
    })
    .catch(() => {
      // alert("Failed to load images. Enter a search query.");
      // autoReloadPage(3); 
      setErrorMessage();
    });
};


// The second option:
// const getImages = async (apiURL) => {
//   try {
//     const response = await fetch(apiURL, {
//       headers: { Authorization: apiKey },
//     });
//     const data = await response.json();
//     generateHTML(data.photos);
//   } catch (error) {
//     console.error("Error when fetching images:", error);
//   }
// };


// FUNCTION FOR LOADING MORE IMAGES

const loadMoreImages = () => {
  currentPage++; // Increase currentPage by 1 before each request
  let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  apiUrl = searchWords ? `https://api.pexels.com/v1/search?query=${searchWords}&page=${currentPage}&per_page=${perPage}` : apiUrl;
  getImages(apiUrl);
};


// Initial request upon page load
const initialApiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
getImages(initialApiUrl);


loadMoreBtn.addEventListener("click", loadMoreImages);


// FUNCTION FOR CHANGING BUTTON STATE TO LOADING WHILE THE IMAGES ARE FETCHING

// Change the button state to loading
function setLoadingState() {
  loadMoreBtn.innerText = "Loading...";
  loadMoreBtn.classList.add("disabled");
};

// Change the button state back to normal
function setLoadMoreState() {
  loadMoreBtn.innerText = "Load More";
  loadMoreBtn.classList.remove("disabled");
};

// Add html code for a message that there is no keywords in the search field
function setErrorMessage() {
  searchInput.blur();
  searchInput.style.pointerEvents = "none";
  searchInput.removeAttribute("autofocus");
  galleryArea.innerHTML =
    `     <p class="error-message">Oops! No images were found for your query.</p>
          <button class="reload-btn" onclick="autoReloadPage()">OK</button>`;
};

// Add html code for a message that images were not found
function setNoImgMessage() {
  searchInput.blur();
  searchInput.style.pointerEvents = "none";
  searchInput.removeAttribute("autofocus");
  galleryArea.innerHTML =
    `     <p class="no-images-message">Sorry, no images were found for this search.</p>
          <button class="reload-btn" onclick="autoReloadPage()">OK</button>`;
};


// FUNCTION FOR RELOADING THE PAGE

function autoReloadPage(timeInSeconds) {
  setTimeout(function() {
    location.reload();
  }, timeInSeconds * 1000);
};


// FUNCTION FOR SEARCHING IMAGES

const loadSearchImages = (e) => {
  // if pressed `Enter`, update the current page, search words and call the getImages func
  if (e.key === "Enter") {
    currentPage = 1;
    searchWords = e.target.value;
    imagesWrapper.innerHTML = "";
    getImages(`https://api.pexels.com/v1/search?query=${searchWords}&page=${currentPage}&per_page=${perPage}`);
  }
  // if the search input is empty, set the search words to null and return from here
  if (e.target.value.trim() === "") return searchWords = null;
};

searchInput.addEventListener("keyup", loadSearchImages);


// FUNCTION FOR DOWNLOADING IMAGES

const downloadImage = (imgUrl) => {
  console.log(imgUrl);

  // converte img to blob, create download link, and download the image
  fetch(imgUrl)
    .then(result => result.blob())
    .then(file => {
      console.log(file);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
      console.log("The file was downloaded");
    })
    .catch(() => console.log("Failed to download image!"));
};


// FUNCTION TO DELETE THE ENTERED VALUE IN THE SEARCH INPUT FIELD

const deleteSearchValue = () => {
  searchInput.value = "";
  searchInput.focus();
};

deleteBtn.addEventListener("click", deleteSearchValue);


// FUNCTIONS FOR MODAL BOX WITH ENLARGED IMAGE, DATA, BUTTONS 

const enlargeImage = (name, size, image, alt) => {
  enlargedBox.querySelector("img").src = image;
  enlargedBox.querySelector("img").alt = alt;
  enlargedBox.querySelector(".name").innerText = name;
  enlargedBox.querySelector(".size").innerText = size;
  downloadBtn.setAttribute("data-image", image);
  enlargedBox.classList.add("show");
  document.body.style.overflow = "hidden";
};

const closeEnlargedImage = () => {
  enlargedBox.classList.remove("show");
  document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeEnlargedImage);

// for download button on modal box with enlarged image
downloadBtn.addEventListener("click", (e) => downloadImage(e.target.dataset.image));

// Closing `enlarged image` on click outside a `wrapper`
enlargedBox.addEventListener("click", function(event) {
  // Get the element that was clicked
  const target = event.target;
  // Check if enlarged-box contains a wrapper element inside it, then remove `show` class
  if (target !== wrapper && !wrapper.contains(target)) {
    enlargedBox.classList.remove("show");
    document.body.style.overflow = "auto";
  }
});
