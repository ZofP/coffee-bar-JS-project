
eventListeners();

function eventListeners() {
  // preloader (hide preloader once all the images, scripts, links have finished loading)

  const ui = new UI();
  window.addEventListener("load", function () {
    ui.hidePreloader();
  })
  // nav btn
  document.querySelector(".navBtn").addEventListener("click", function () {
    ui.showNav();

  })

  // hide nav
  const navLinks = document.querySelectorAll(".nav__single-link")
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      ui.hideNav();

    })
  })

  // control the video
  document.querySelector(".video__switch").addEventListener("click", function () {
    ui.videoControls();
  })
  // submit the form
  document.querySelector(".drink-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.querySelector(".input-name").value;
    const lastName = document.querySelector(".input-lastname").value;
    const email = document.querySelector(".input-email").value;

    let value = ui.checkEmpty(name, lastName, email)

    if (value) {
      let customer = new Customer(name, lastName, email);
      ui.addCustomer(customer)
      ui.showFeedback("customer added to the list", "success")
      ui.clearFields();
    }
    else {
      ui.showFeedback("some form values empty", "error")
    }

  })
  // display modal
  const links = document.querySelectorAll(".work-item__icon");
  links.forEach(function (item) {
    item.addEventListener("click", function (event) {
      ui.showModal(event);
    })
  })
  // hide modal
  document.querySelector(".work-modal__close").addEventListener("click", function () {
    ui.closeModal();
  })

  // prev and next buttons
  btn = document.querySelectorAll(".btn");
  btn.forEach(function (item) {
    item.addEventListener("click", function (event) {
      // event.preventDefault();
      // console.log(event.target.parentElement);
      // console.log(event.target.parentElement.parentElement.nextSibling.nextElementSibling);
      ui.moveImg(event);
    })
  })



}

function UI() {
}

// hide preloader
UI.prototype.hidePreloader = function () {
  document.querySelector(".preloader").style.display = "none";
}
// show nav
UI.prototype.showNav = function () {
  document.querySelector(".nav").classList.toggle("nav--show");
}
// hide nav
UI.prototype.hideNav = function () {
  document.querySelector(".nav").classList.remove("nav--show");
}

// play/pause the video
UI.prototype.videoControls = function () {
  let btn = document.querySelector(".video__switch-btn");
  if (!btn.classList.contains("btnSlide")) {
    btn.classList.add("btnSlide");
    document.querySelector(".video__item").pause();
  }
  else {
    btn.classList.remove("btnSlide");
    document.querySelector(".video__item").play();
  }
}

// check for empty values
UI.prototype.checkEmpty = function (name, lastName, email) {
  let result;

  if (name === "" || lastName === "" || email === "") {
    result = false;
  }
  else {
    result = true;
  }
  return result;
}
// show feedback
UI.prototype.showFeedback = function (text, type) {
  const feedback = document.querySelector(".drink-form__feedback");
  if (type === "success") {
    feedback.classList.add(type);
    feedback.innerText = text;
    this.removeAlert(type);
  }
  else if (type === "error") {
    feedback.classList.add(type);
    feedback.innerText = text;
    this.removeAlert(type);
  }
}
// remove alert
UI.prototype.removeAlert = function (type) {
  setTimeout(function () {
    document.querySelector(".drink-form__feedback").classList.remove(type);
  }, 3000)
}

// add customer
UI.prototype.addCustomer = function (customer) {
  const images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `
 <img src="img/person-${random}.jpeg"
                alt="person"
                class="person__thumbnail"
              />
              <h4 class="person__name">${customer.name}</h4>
              <h4 class="person__last-name">${customer.lastName}</h4>
 
 `
  document.querySelector(".drink-card__list").appendChild(div);
}
// clear fields
UI.prototype.clearFields = function () {
  document.querySelector(".input-name").value = ""
  document.querySelector(".input-lastname").value = "";
  document.querySelector(".input-email").value = "";
}

// show modal
UI.prototype.showModal = function (event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains("work-item__icon")) {
    let id = event.target.parentElement.dataset.id;
    const modal = document.querySelector(".work-modal");
    const modalItem = document.querySelector(".work-modal__item");

    // added by Petya
    const navBtn = document.querySelector(".navBtn")
    navBtn.style.display = "none"
    const navbar = document.querySelector(".nav");
    navbar.style.display = "none"
    // end added by Petya
    modal.classList.add("work-modal--show");
    modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`
    modalItem.dataset.id = id;

  };
}
// hide modal

UI.prototype.closeModal = function () {
  document.querySelector(".work-modal").classList.remove("work-modal--show");
  // added by Petya
  const navBtn = document.querySelector(".navBtn")
  navBtn.style.display = "initial"
  const navbar = document.querySelector(".nav");
  navbar.style.display = "initial"
  // end added by Petya
}

// previous and next buttons
UI.prototype.moveImg = function (event) {
  event.preventDefault();
  const modalItem = document.querySelector(".work-modal__item");
  if (event.target.parentElement.classList.contains("prevBtn")) {
    const element = event.target.parentElement.parentElement.nextSibling.nextElementSibling
    let id = event.target.parentElement.parentElement.nextSibling.nextElementSibling.dataset.id

    if (parseInt(id) === 1) {
      id = 9;

    }
    else {
      id--
    }

    element.dataset.id = id
    console.log(id);
    element.style.backgroundImage = `url(img/work-${id}.jpeg)`;
    console.log(id);

    console.log(element);

  }
  else if (event.target.parentElement.classList.contains("nextBtn")) {
    const element = event.target.parentElement.parentElement.previousElementSibling

    let id = event.target.parentElement.parentElement.previousElementSibling.dataset.id

    console.log(id);


    if (parseInt(id) === 9) {
      id = 1;

    }
    else {
      id++;
    }
    let newId = id;
    element.style.backgroundImage = `url(img/work-${newId}.jpeg)`;
    element.dataset.id = newId
    console.log(newId);
    console.log(element);
    console.log(modalItem);

  }

}



function Customer(name, lastName, email) {
  this.name = name;
  this.lastName = lastName;
  this.email = email;
}