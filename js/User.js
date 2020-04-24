class User {
  constructor(userData) {
    this.firstName = userData.name.first;
    this.lastName = userData.name.last;
    this.picture = userData.picture.large;
    this.email = userData.email;
    this.city = userData.location.city;
    this.state = userData.location.state;
  }

  /**
   * Generates the HTML for the user card using the user properties
   * @returns {object} HTML code
   */
  generateCard() {
    const div = document.createElement("DIV");
    div.className = "card";

    const cardHTML = `
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
    div.innerHTML = cardHTML;

    return div;
  }
}