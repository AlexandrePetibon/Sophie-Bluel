// Etape 1 : Création de la page de présentation des travaux

const gallery = document.querySelector("#gallery")
const btnG = document.querySelector("#buttonG");
const gallerieTous = document.querySelectorAll("#gallery > div");
const btn = document.getElementsByClassName("button");

// Création du bouton générique "Tous"

const buttonT = document.createElement("button");
buttonT.setAttribute("categoryId", "0");
buttonT.innerText = "Tous";
buttonT.setAttribute("class", "button");
buttonT.addEventListener("click", () => {
  gallerieTous.forEach((div) => (div.style.display = "block"));
});
btnG.appendChild(buttonT);

// Création des boutons générés en JS

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
}

button();

// Appel de l'API
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
  return dataCategories;
}

// Affichage des projets dans l'interface

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

projet();

// Mise en place du tri sur l'inteface (en dehors du bouton "Tous")

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

filtreTravaux();

// Etape 3 : Ajout de la modale

// Affichage de l'interface en mode login / logout

const banner = document.querySelector(".mode-edition");
const modifierUn = document.querySelector(".modifier1");
const modifierDeux = document.querySelector(".minibloch2");
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

// Mise en place des modals

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

// Modal1 remplissage

const galleryModal = document.querySelector("#gallery-modal");

async function projetModal() {
  const dataProjetAPIModal = await works();
  console.log(dataProjetAPIModal);
  dataProjetAPIModal.forEach((galleryImgModal) => {
    const imgProjet = document.createElement("div");
    const imgContainer = document.createElement("div");
    const imgSophie = document.createElement("img");
    const titleEditer = document.createElement("div");
    const trashIcon = document.createElement("i");
    const trashIconBox = document.createElement("div");
    const arrowFour = document.createElement("i");
    const arrowFourBox = document.createElement("div");
    imgSophie.src = galleryImgModal.imageUrl;
    titleEditer.textContent = "éditer";
    trashIcon.className = "fa-solid fa-trash-can";
    trashIconBox.className = "box-trash";
    arrowFour.className = "fa-solid fa-arrows-up-down-left-right";
    arrowFourBox.className = "box-arrow";
    imgProjet.className = "delProj";
    trashIconBox.appendChild(trashIcon);
    imgContainer.appendChild(imgSophie);
    imgContainer.appendChild(trashIconBox);
    arrowFourBox.appendChild(arrowFour);
    imgContainer.appendChild(arrowFourBox);
    imgProjet.appendChild(imgContainer);
    imgProjet.appendChild(titleEditer);
    trashIconBox.setAttribute("id", galleryImgModal.id);
    console.log(galleryImgModal.id);
    galleryModal.appendChild(imgProjet);
    imgContainer.className = "img-container";
  });
  deleteProject();
}

projetModal();

// Alternance Modal1 et Modal2

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

// Retour en arrière de Modal 2 à Modal1

const arrowLeft = document.querySelector(".fa-arrow-left");

arrowLeft.addEventListener("click", function () {
  modalDue.style.display = "none";
  modalUno.style.display = "flex";
});

// Mise en place de la liste déroulante pour le choix de Catégorie Modal2

const listeDeroul = document.querySelector("select");

async function modalDeuxCategorie() {
  const modalCategories = await categories();
  modalCategories.forEach((modalCategorie) => {
    const elementListe = document.createElement("option");
    elementListe.innerText = modalCategorie.name;
    elementListe.setAttribute("value", modalCategorie.id);
    listeDeroul.appendChild(elementListe);
  });
}

modalDeuxCategorie();

// Ajout de photo dans Modal2

const buttonAjoutPhoto = document.querySelector(".button-ajout-photo");
const input = document.createElement("input");
input.type = "file";

buttonAjoutPhoto.addEventListener("click", (event) => {
  event.preventDefault();
  input.click();
});

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
});

// Validation bouton dans Modal2 pour poster le projet

const imageInput = document.querySelector(".selected-image");
console.log(imageInput);
const titleInput = document.querySelector(".textUn");
const categoryInput = document.querySelector(".catUn");
const validerButton = document.getElementById("validerButton");

function validateForm() {
  const titleValid = titleInput.value !== "";
  console.log(titleValid);
  const categorySelected = categoryInput.value !== "";
  console.log(categorySelected);
  const boxPhoto = document.querySelector(".box-modal2-photo");
  if (
    boxPhoto.querySelector(".selected-image") &&
    titleValid &&
    categorySelected
  ) {
    validerButton.classList.add("green-button");
    return true;
  } else {
    validerButton.classList.remove("green-button");
    return false;
  }
}
validateForm();

titleInput.addEventListener("input", validateForm);
categoryInput.addEventListener("change", validateForm);

validerButton.addEventListener("click", async (event) => {
  event.preventDefault();

  if (validateForm() == true) {
    const file = input.files[0];
    const formData = new FormData();
    formData.append("title", titleInput.value);
    formData.append("image", file);
    formData.append("category", categoryInput.value);
    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          "Acces-Control-Allow-Origin": "*",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });
      if (response.ok) {
        const projet = await response.json();
        console.log("Projet ajouté avec succès:", projet);
      } else {
        console.error("Erreur lors de l'ajout du projet:", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  }
});

// Suppression d'un porjet dans Modal1

function deleteProject() {
  const deleteProjectDiv = document.querySelectorAll(".box-trash");
  console.log(deleteProjectDiv);
  deleteProjectDiv.forEach((icon) => {
    icon.addEventListener("click", function (event) {
      event.preventDefault();
      const id = icon.getAttribute("id");
      try {
        const response = fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          console.log("Projet supprimé avec succès.");
        } else if (response.status === 401) {
          console.error("Non autorisé à effectuer cette action.");
        } else {
          console.error(
            "Erreur lors de la suppression du projet:",
            response.status
          );
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    });
  });
}
