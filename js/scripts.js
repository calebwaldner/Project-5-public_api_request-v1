

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
fetchData('https://randomuser.me/api/?results=12')
  .then(dataToLog => { // ! for logging only
    console.log(dataToLog);
    return dataToLog;
  })
  .then(data => createUsers(data.results))
  .then(dataToLog => { // ! for logging only
    console.log(dataToLog);
    return dataToLog;
  })
  .then(users => populateGallery(users, document.getElementById("gallery")));

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
function populateGallery(arr, div) {
  arr.forEach(userObject => {
    div.appendChild(userObject.generateCard());
  })
}

// ------------------------------------------
//  MODAL
// ------------------------------------------

// global variable used to hold current User Object 
let activeUser = null;

document.addEventListener("click", e => {
  const clickedUserCard = e.target.closest(".card");
  const exitButton = e.target.closest("#modal-close-btn");
  const modalMainBox = e.target.closest(".modal");
  const modalButtonBox = e.target.closest(".modal-btn-container");
  const activeModal = document.querySelector(".modal-container");

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
    document.getElementById("gallery").appendChild(clickedUser.generateModal());

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




