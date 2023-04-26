//Etape 1 : Création de la page de présentation des travaux

//Rangement des constantes et/ou variables
const gallery = document.querySelector('#gallery');
const btnG = document.querySelector('#buttonG');
const gallerieTous = document.querySelectorAll('#gallery > div');

const buttonT = document.createElement('button');
buttonT.innerText = 'Tous';
buttonT.setAttribute('class', 'button');
btnG.appendChild(buttonT);

async function button () {
  const dataButton = await categories ();
  console.log(dataButton)
  dataButton.forEach(btn => {
    const btnSite = document.createElement('button')
    btnSite.innerText = `${btn.name}`
    btnSite.setAttribute('class', 'button');
    btnG.appendChild(btnSite)
       });
  console.log(dataButton)
}

//Création du bouton générique "Tous"

button()

const btn = document.querySelector('#buttonG > button');
 console.log(btn + button()) 

//Appel de l'API
async function works() {
  const response = await fetch("http://" + window.location.hostname + ":5678/api/works");
  const dataWorks = await response.json();
  console.log(dataWorks)
  return dataWorks;
}

async function categories() {
  const response = await fetch("http://" + window.location.hostname + ":5678/api/categories");
  const dataCategories = await response.json();
   console.log(dataCategories)
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
  const buttonBis = await categories();
  console.log(btn)
  const monSet = new Set()
  monSet.add(works.categoryId) 
  for (let i = 0 ; i < buttonBis.length ; i++){
     
   
    btn[i].addEventListener('click', () => {
      if (dataFiltreTravaux.filter(obj => obj.categoryId === [i])){
        set.add(works.categoryId===[i])
        set.delete(works.categoryId!=[i])
      }})}}
 
//Appel des fonctions
projet();
filtreTous ();
filtreTravaux ()

//Etape 3 : Ajout de la modale