//Etape 1 : Création de la page de présentation des travaux

//Rangement des constantes et/ou variables
const gallery = document.querySelector("#gallery");
const btnG = document.querySelector("#buttonG");
const gallerieTous = document.querySelectorAll("#gallery > div");

const buttonT = document.createElement("button");
buttonT.setAttribute("categoryId", "0");
buttonT.innerText = "Tous";
buttonT.setAttribute("class", "button");
buttonT.addEventListener("click", () => {
  gallerieTous.forEach((div) => (div.style.display = "block"));
});

btnG.appendChild(buttonT);

async function button() {
  const dataButton = await categories();
  console.log(dataButton);
  dataButton.forEach((btn) => {
    const btnSite = document.createElement("button");
    btnSite.innerText = `${btn.name}`;
    btnSite.setAttribute("class", "button");
    btnSite.setAttribute("categoryId", `${btn.id}`);
    btnG.appendChild(btnSite);
  });
  //console.log(dataButton);
}

//Création du bouton générique "Tous"

const btn = document.getElementsByClassName("button");

console.log(btn);

//Appel de l'API
async function works() {
  const response = await fetch(
    "http://" + window.location.hostname + ":5678/api/works"
  );
  const dataWorks = await response.json();
  console.log(dataWorks);
  return dataWorks;
}

async function categories() {
  const response = await fetch(
    "http://" + window.location.hostname + ":5678/api/categories"
  );
  const dataCategories = await response.json();
  //console.log(dataCategories);
  return dataCategories;
}

//Mise en place des fonctions
async function projet() {
  const dataProjetAPI = await works();
  dataProjetAPI.forEach((galleryImg) => {
    const imgProjet = document.createElement("div");
    const imgSophie = document.createElement("img");
    const titleSophie = document.createElement("h3");
    imgSophie.src = `${galleryImg.imageUrl}`;
    titleSophie.innerText = `${galleryImg.title}`;
    imgProjet.appendChild(imgSophie);
    imgProjet.appendChild(titleSophie);
    gallery.appendChild(imgProjet);
  });
}

async function filtreTravaux() {
  const dataFiltreTravaux = await works();
  const buttonBis = await categories();
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      console.log(btn[i]);
      let ctgId = btn[i].getAttribute("categoryId");
      console.log(ctgId);
      if (ctgId == 0) {
        gallery.innerHTML = "";
        projet();
      } else {
        gallery.innerHTML = "";
        dataFiltreTravaux.forEach((galleryImg) => {
          if (galleryImg.categoryId == ctgId) {
            const imgProjet = document.createElement("div");
            const imgSophie = document.createElement("img");
            const titleSophie = document.createElement("h3");
            imgSophie.src = `${galleryImg.imageUrl}`;
            titleSophie.innerText = `${galleryImg.title}`;
            imgProjet.appendChild(imgSophie);
            imgProjet.appendChild(titleSophie);
            gallery.appendChild(imgProjet);
          }
        });
      }
    });
  }
}

//Appel des fonctions
projet();
filtreTravaux();
button();

//Etape 3 : Ajout de la modale

// utiliser display none et block pour le login

const banner = document.querySelector(".mode-edition");
const modifierUn = document.querySelector(".modifier1");
const modifierDeux = document.querySelector(".minibloch2");
const loginButton = document.querySelector("#login-button");
const logInOut = document.querySelector(".log-in-out");
const link = document.querySelector("#link");

function editMode() {
  if (localStorage.getItem("token")) {
    banner.style = "display:flex";
    btnG.style = "display:none";
    modifierUn.style = "display:flex";
    modifierDeux.style = "display:flex";
    logInOut.innerText = "logout";
    logInOut.addEventListener("click", () => {
      localStorage.removeItem("token");
      link.href = "index.html";
    });
    console.log("Check");
  } else {
    banner.style = "display:none";
    btnG.style = "display:flex";
    modifierUn.style = "display:none";
    modifierDeux.style = "display:none";
    console.log("No check");
  }
}

editMode();

let modal = null;
let previousModal = null;

const openModal = function (e) {
  e.preventDefault();
  const modalOpen = document.querySelector(e.target.getAttribute("href"));
  console.log(modalOpen);
  previousModal = modal;
  modalOpen.style.display = "flex";
  modal = modalOpen;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-close-modal").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  if (modal !== previousModal) {
    modal.style.display = "none";
    modal.removeEventListener("click", closeModal);
    modal
      .querySelector(".js-close-modal")
      .removeEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-stop")
      .removeEventListener("click", stopPropagation);
    modal = previousModal;
    previousModal = null;
  }
  modal.style.display = "none";
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-close-modal")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = previousModal;
  previousModal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

document.querySelectorAll(".js-modal2").forEach((a) => {
  a.addEventListener("click", openModal);
});

const galleryModal = document.querySelector("#gallery-modal");

async function projetModal() {
  const dataProjetAPIModal = await works();
  dataProjetAPIModal.forEach((galleryImgModal) => {
    const imgProjet = document.createElement("div");
    const imgContainer = document.createElement("div");
    const imgSophie = document.createElement("img");
    const titleEditer = document.createElement("div");
    const trashIcon = document.createElement("i");
    const trashIconBox = document.createElement("div");
    const arrowFour = document.createElement("i")
    const arrowFourBox = document.createElement("div")
    imgSophie.src = `${galleryImgModal.imageUrl}`;
    titleEditer.innerText = "éditer";
    trashIcon.className = "fa-solid fa-trash-can";
    trashIconBox.className = "box-trash";
    arrowFour.className = "fa-solid fa-arrows-up-down-left-right"
    arrowFourBox.className = "box-arrow"
    trashIconBox.appendChild(trashIcon);
    imgContainer.appendChild(imgSophie);
    imgContainer.appendChild(trashIconBox);
    arrowFourBox.appendChild(arrowFour)
    imgContainer.appendChild(arrowFourBox)
    imgProjet.appendChild(imgContainer);
    imgProjet.appendChild(titleEditer);
    galleryModal.appendChild(imgProjet);
    imgContainer.className = "img-container";
  });
}

projetModal();

const modalUno = document.querySelector("#modal");
const modalDue = document.querySelector("#modal2");
const buttonModalUno = document.querySelector(".js-modal2");

function modalDeux() {
  buttonModalUno.addEventListener("click", function () {
    modalDue.style.display = "flex";
    modalUno.style.display = "none";
  });
}

modalDeux();

const listeDeroul = document.querySelector("select");

async function modalDeuxCategorie() {
  const modalCategories = await categories();
  modalCategories.forEach((modalCategorie) => {
    const elementListe = document.createElement("option");
    elementListe.innerText = modalCategorie.name;
    listeDeroul.appendChild(elementListe);
  });
}

modalDeuxCategorie();

const arrowLeft = document.querySelector(".fa-arrow-left");

arrowLeft.addEventListener("click", function () {
  modalDue.style.display = "none";
  modalUno.style.display = "flex";
});

const buttonAjoutPhoto = document.querySelector(".button-ajout-photo");

buttonAjoutPhoto.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const imgElement = document.createElement("img");
    imgElement.classList.add("selected-image");
    const boxModal2Photo = document.querySelector(".box-modal2-photo");
    boxModal2Photo.innerHTML = "";
    boxModal2Photo.appendChild(imgElement);
    const reader = new FileReader();
    reader.onload = function (e) {
      imgElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
    fetch("http://" + window.location.hostname + ":5678/api/works", {
      method: "POST",
      body: formData,
    })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  });
  input.click();
});


const imageInput = document.querySelector(".logo-ajout-photo");
const titleInput = document.querySelector(".textUn");
const categoryInput = document.querySelector(".catUn");
const validerButton = document.getElementById("validerButton");

function validateForm() {
  const imageLoaded = imageInput.classList.contains("selected-image");
  const titleValid = titleInput.value !== "";
  const categorySelected = categoryInput.value !== "";
  if (imageLoaded && titleValid && categorySelected) {
    validerButton.classList.add("green-button");
  } else {
    validerButton.classList.remove("green-button");
  }
}

validateForm();