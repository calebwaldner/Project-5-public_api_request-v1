// ------------------------------------------
//  GLOBAL VARIABLES
// ------------------------------------------

// global variable used to hold current User Object 
let activeUser = null;

// used to hold all User Objects
let completeUserList = [];

const searchInput = document.getElementById("search-input");
const galleryDiv = document.getElementById("gallery");

// ------------------------------------------
//  FETCH
// ------------------------------------------

/**
 * Makes a request to the API, handles errors and unresolved promises, and returns a JSON object.
 * @param {string} url - API URL
 * @returns {json} 
 */
async function fetchData(url) {
  const response = await fetch(url)
    .then(res => checkStatus(res))
    .catch(error => console.log('Looks like there was a problem with fetching some data: ', error));
  return response.json();
}

/**
 * Gets a JSON object from fetchData, then does these things:
 * * creates User Objects
 * * uses User Objects to populate the Gallery
 */
fetchData('https://randomuser.me/api/?results=12&nat=us')
  .then(dataToLog => { // ! for logging only
    console.log(dataToLog);
    return dataToLog;
  })
  .then(data => createUsers(data.results))
  .then(users => {
    completeUserList = users;
    updateGallery(completeUserList, galleryDiv);
  });

/**
 * Takes a Promise Object and checks for a status of "OK"
 * @param {Promise} res - Promise object
 */
function checkStatus(res) { 
  if (res.ok) {
    return Promise.resolve(res)
  } else {
    console.log("Status not 'OK'");
    return Promise.reject(new Error(res.statusText))
  }
}

// ------------------------------------------
//  USERS
// ------------------------------------------

/**
 * Uses the passed-in data to instantiate the user objects and push to usersArr
 * @param {arr} allUsers - Array of users passed from fetch request
 */
function createUsers(allUsers) {
  const arr = [];
  allUsers.forEach((user, i) => {
    let newUser = new User(user, i);
    arr.push(newUser);
  })
  return arr;
}

// ------------------------------------------
//  GALLERY
// ------------------------------------------

/**
 * Uses the generateCard() method on each User Object to create div-cards that are appended to the gallery-div
 * @param {Array} arr - Array of all User Objects
 * @param {Element} div - Parent element to hold user div-cards, the gallery-div
 */
function updateGallery(arr, div) {
  while (div.children.length > 0) {
    div.removeChild(div.lastChild);
  }

  arr.forEach(userObject => {
    div.appendChild(userObject.generateCard());
  })
}

// ------------------------------------------
//  MODAL
// ------------------------------------------

document.addEventListener("click", e => {
  const clickedUserCard = e.target.closest(".card");
  const exitButton = e.target.closest("#modal-close-btn");
  const modalMainBox = e.target.closest(".modal");
  const modalButtonBox = e.target.closest(".modal-btn-container");
  const activeModal = document.querySelector(".modal-container");
  const previousButton = e.target.closest("#modal-prev");
  const nextButton = e.target.closest("#modal-next");

  // click outside the modal box to exit
  if (activeUser !== null && !modalMainBox && !modalButtonBox) { // the modal boxes use the closest() method. Closest() looks for the closes element specified from the click target. If the element is not found in relation to the click target, the closest() method returns null. So in this conditional statement, I'm wanting a TRUE if the boxes are null (aka the click wasn't within the border of the modal) 
    exitModal(activeModal);
  }

  // modal card click
  if (clickedUserCard) {
    showModal(clickedUserCard);
  }

  // modal exit button click
  if (exitButton) { 
    exitModal(activeModal);
  }

  if (previousButton) {
    console.log('previous');
  }

  if (nextButton) {
    console.log('next');
  }

});

/**
 * Takes the card div with the user property that holds the User Object and uses the User Object to populate a modal box.
 * @param {element} userCard - the ".card" div with the property containing the user Object
 */
function showModal(userCard) {
  const clickedUser = userCard.user;

  // if no active modal boxes
  if (clickedUser.modalActive === false) { 
    clickedUser.modalActive = true; 

    // creates modal box using the User Objects generateModal() method and appends the div inside the gallery.
    galleryDiv.appendChild(clickedUser.generateModal());

    activeUser = userCard.user; // sets the active user to the global variable
  }
}

/**
 * Takes the modal element as a parameter; removes it from the DOM.
 * @param {element} modalDiv - the active modal element
 */
function exitModal(modalDiv) {
  modalDiv.remove();
  activeUser.modalActive = false;
  activeUser = null; // empties global variable
}

function userScroll() {

  // use filteredUserList()


  // need to add event listeners for left right buttons

}


// ------------------------------------------
//  SEARCH
// ------------------------------------------

document.addEventListener("keydown", e => {
  if (isValidKey(e)) { 
    searchInput.focus(); // automatic focus on search box with keystroke
  }
});

document.addEventListener("keyup", e => {
  if (isValidKey(e)) {
    handleSearch(e);
  }
});

function handleSearch(e) {
  updateGallery(filteredUserList(e.target.value), galleryDiv);
  
  // if no results, display message
  showMessageNoResults();
}

/**
 * checks if keystroke is a letter character or the delete key
 * @param {event} e 
 */
const isValidKey = e => /^[\w]\b|\b(backspace)$/m.test(e.key.toLowerCase());// If any single letter a-z (excludes other key values like "tab" and "meta" since those are multi-letter)

/**
 * Returns a filtered list of users based off the search
 * @param {string} query - the search query
 */
const filteredUserList = query => completeUserList.filter(user => user.fullNameLower.indexOf(query.toLowerCase()) !== -1); 
// indexOf() uses the query to search the user-name string and returns the index value if query is found within the string, 0 for a result found or -1 if not found. In other words if the search query is found within the user-name string, then the index value of 0 is returned, if it is not found, then the index value of -1 is returned.

/**
 * Displays a message if no results are displayed in the gallery.
 */
function showMessageNoResults() {
  const existingMessage = document.getElementById("no-results-message"); // holds element or null if element doesn't exist
  const message = document.createElement("H2");
  message.innerText = "No users found...";
  message.className = "no-results-message";
  
  if (galleryDiv.children.length < 1) {
    galleryDiv.appendChild(message);
  } else if (galleryDiv.children.length >= 1 && existingMessage) { // including existingMessage variable to insure this runs only if the message already existed because removing a child that doesn't exit throws an error. 
    galleryDiv.removeChild(document.getElementById(existingMessage));
  }
}

