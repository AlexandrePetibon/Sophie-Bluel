//Etape 1 : Création de la page de présentation des travaux

//Rangement des constantes et/ou variables
const gallery = document.querySelector('#gallery');
const btnG = document.querySelector('#buttonG');
const gallerieTous = document.querySelectorAll('#gallery > div');
const btn = document.querySelectorAll('#buttonG > button');
const imgProjet = document.querySelectorAll('#gallery > div > img');

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
  console.log(dataProjet)
}

async function button () {
  const dataButton = await categories ();
  dataButton.forEach(btn => {
    const btnSite = document.createElement('button')
    btnSite.innerText = `${btn.name}`
    btnSite.setAttribute('id', 'button');
    btnG.appendChild(btnSite)
       });
  console.log(dataButton)
}

async function filtreTous () {
  const dataFiltreTous = await works()
  dataFiltreTous.forEach(tous => {
      buttonT.addEventListener('click', () => {
      gallerieTous
  })});
  console.log(dataFiltreTous)
}

async function filtreTravaux() {
  const dataFiltreTravaux = await works();
  const buttonBis = await button();
  const monSet = new Set(works())
  dataFiltreTravaux.forEach(objet => {
    btnG.addEventListener('click', () => {
      if (dataFiltreTravaux.filter(obj => obj.categoryId === 1)){
        set.prototype.add(categoryId===1)
        set.prototype.delete(categoryId!=1)
}
else if (dataFiltreTravaux.filter(obj => obj.categoryId === 2)){
  set.prototype.add(categoryId===2)
  set.prototype.delete(categoryId!=2)
}
else if (dataFiltreTravaux.filter(obj => obj.categoryId === 3)){
  set.prototype.add(categoryId===3)
  set.prototype.delete(categoryId!=3)
}
})})}



//Appel des fonctions
projet();
filtreTous ();
filtreTravaux ()

//Etape 3 : Ajout de la modale