// CONSTANTS FOR URL AND SELECTORS

const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const apiKey = "BPMzMqljebkGhOZlvLsfHAuJLyyjbDnrsXaO8tiUaPJgTQY0VYUMX0QV";
const perPage = 15;
let currentPage = 1;


// FUNCTION FOR GENERATING IMAGES

const generateHTML = (images) => {
  imagesWrapper.innerHTML += images.map((img) =>
    `<li class="card">
        <img src="${img.src.large2x}" alt="photo">
        <div class="details">
          <div class="photographer">
            <i class="fa-solid fa-camera"></i>
            <span>${img.photographer}</span>
          </div>
          <button>
            <i class="fa-solid fa-file-arrow-up"></i>
          </button>
        </div>
      </li>`
  ).join("");
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
  const apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
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
}

// Change the button state back to normal
function setLoadMoreState() {
  loadMoreBtn.innerText = "Load More";
  loadMoreBtn.classList.remove("disabled");
}
