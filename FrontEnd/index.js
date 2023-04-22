//Etape 1 : Création de la page de présentation des travaux

//Rangement des constantes et/ou variables
const gallery = document.querySelector('#gallery');
const btnG = document.querySelector('#buttonG');
const gallerieTous = document.querySelectorAll('#gallery > div');
const btn = document.querySelectorAll('#buttonG > button');
const btnProjet = document.querySelector('#button')

//Création du bouton générique "Tous"
const buttonT = document.createElement('button');
buttonT.innerText = 'Tous';
buttonT.setAttribute('id', 'button');
btnG.appendChild(buttonT);

//Appel de l'API
async function works() {
  const response = await fetch("http://" + window.location.hostname + ":5678/api/works");
  const dataWorks = await response.json();
  return dataWorks;
}

async function categories() {
  const response = await fetch("http://" + window.location.hostname + ":5678/api/categories");
  const dataCategories = await response.json();
  return dataCategories;
}

//Mise en place des fonctions
async function projet() {
  const dataProjet = await works();
  dataProjet.forEach(galleryImg => {
    const imgProjet = document.createElement('div');
    const imgSophie = document.createElement('img');
    const titleSophie = document.createElement('h3');
    imgSophie.src = `${galleryImg.imageUrl}`;
    titleSophie.innerText = `${galleryImg.title}`;
    imgProjet.appendChild(imgSophie);
    imgProjet.appendChild(titleSophie);
    gallery.appendChild(imgProjet);
  });
}

async function button () {
  const dataButton = await categories ();
  dataButton.forEach(btn => {
    const btnSite = document.createElement('button')
    btnSite.innerText = `${btn.name}`
    btnSite.setAttribute('id', 'button');
    btnG.appendChild(btnSite)
       }
  );
}

async function filtreTous () {
  const dataFiltreTous = await works()
  dataFiltreTous.forEach(tous => {
      buttonT.addEventListener('click', () => {
      gallerieTous.forEach(div => div.style.display = 'block');
  })});
}

async function filtreTravaux () {
  const dataFiltreTravaux = await works()
  dataFiltreTravaux.forEach(travaux => {
    for (let i = 0; i < dataFiltreTravaux.length; i++) 
    btnProjet.addEventListener('click', () => {
    if (dataFiltreTravaux.name === 'objets') {
      btnProjet.forEach(button => button.style.display = 'block')
    }
    })})
  }

//Appel des fonctions
projet();
button();
filtreTous ();
filtreTravaux ()

//Etape 3 : Ajout de la modale