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
async function projet(dataProjet) {
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

//utiliser la const modifierDeux pour la modale

let modal = null

const openModal = function(e) {
  e.preventDefault()
  const modalOpen = document.querySelector(e.target.getAttribute('href'))
  console.log(modalOpen)
  modalOpen.style.display = 'flex'
  modal = modalOpen
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-close-modal').addEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function(e) {
  if (modal === null) return
  e.preventDefault()
  modal.style.display = "none"
  modal.removeEventListener('click', closeModal)
  modal.querySelector('.js-close-modal').removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
  modal = null
}

const stopPropagation = function (e) {
  e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal)
  
})