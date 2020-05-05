class User {
  constructor(userData, i) {
    this.firstName = userData.name.first;
    this.lastName = userData.name.last;
    this.fullNameLower = `${this.firstName.toLowerCase()} ${this.lastName.toLowerCase()}`; //used for search
    this.dob = userData.dob.date;
    this.picture = userData.picture.large;
    this.email = userData.email;
    this.cellNumber = userData.phone;
    this.addressStreet = userData.location.street.name;
    this.addressNumber = userData.location.street.number;
    this.city = userData.location.city;
    this.state = userData.location.state;
    this.zipCode = userData.location.postcode;
    this.country = userData.location.country;
    this.modalActive = false;
  }

  get birthDay() {
    return this.dob.slice(0, 10);
  }

  /**
   * Generates the HTML for the user card using the user properties
   * @returns {object} HTML code
   */
  generateCard() {
    const div = document.createElement("DIV");
    div.classList.add("card");
    div.user = this;

    div.innerHTML = `
      <div class="card-img-container">
        <img 
          class="card-img" 
          src="${this.picture}" 
          alt="profile picture"
        >
      </div>
      <div class="card-info-container">
        <h3 
          id="name" 
          class="card-name cap"
          >${this.firstName} ${this.lastName}</h3>
        <p 
          class="card-text"
          >${this.email}</p>
        <p 
          class="card-text cap"
          >${this.city}, ${this.state}</p>
      </div>
    `

    return div;
  }

    /**
   * Generates the HTML for the modal box using the user properties
   * @returns {object} HTML code
   */
  generateModal(listLength) {
    const div = document.createElement("DIV");
    div.className = "modal-container";
    
    div.innerHTML = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src="${this.picture}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${this.firstName} ${this.lastName}</h3>
        <p class="modal-text">${this.email}</p>
        <p class="modal-text cap">${this.city}</p>
        <hr>
        <p class="modal-text">${this.cellNumber}</p>
        <p class="modal-text">${this.addressNumber} ${this.addressStreet}<br>
          ${this.city}, ${this.state} ${this.zipCode}</p>
        <p class="modal-text">Birthday: ${this.birthDay}</p>
      </div>
    </div>
    `

    // div holding scroll button html
    const scrollHTMLDiv = document.createElement("DIV");
    scrollHTMLDiv.className = "modal-btn-container";
    scrollHTMLDiv.innerHTML = `
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
    `
    // if the list isn’t over 1, scroll buttons are not included
    if (listLength > 1) {div.appendChild(scrollHTMLDiv)}

    return div;
  }


}