

// ------------------------------------------
//  FETCH
// ------------------------------------------

async function fetchData(url) {
  const response = await fetch(url)
    .then(res => checkStatus(res))
    .catch(error => console.log('Looks like there was a problem with fetching some data: ', error));
  return response.json();
  }

fetchData('https://randomuser.me/api/?results=12')
  .then(data => createUsers(data.results))
  .then(arr => populateGallery(arr, document.getElementById("gallery")));

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
  allUsers.forEach(user => {
    arr.push(new User(user));
  })
  return arr;
}


// ------------------------------------------
//  GALLERY
// ------------------------------------------

function populateGallery(arr, div) {
  arr.forEach(userObject => {
    div.appendChild(userObject.generateCard());
  })
}

// ------------------------------------------
//  MODAL
// ------------------------------------------