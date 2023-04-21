function galleryImg() {
  const gallery = document.querySelector('#gallery');
  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      data.forEach(gallerieImg => {
        const gallerie = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('h3');
        img.src = `${gallerieImg.imageUrl}`;
        title.innerText = `${gallerieImg.title}`;
        gallerie.appendChild(img);
        gallerie.appendChild(title);
        gallery.appendChild(gallerie);
      });
      console.log(data);
    })
    .catch(error => console.error(error));
}

galleryImg();

const buttonTous = document.querySelector('#buttonG');
const buttonT = document.createElement('button');
buttonT.innerText = 'Tous';
buttonT.setAttribute('id', 'button');
buttonTous.appendChild(buttonT);


function btn () {
    const boutonG = document.querySelector("#buttonG")
    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
        data.forEach(bouton => {    
            const btns = document.createElement("button")
            btns.innerText = `${bouton.name}`
            btns.setAttribute('id', "button")
            boutonG.appendChild(btns)
        })
    console.log(bouton)})
    .catch(error => console.error(error));
}

btn()

function filter () {
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      data.forEach(filtreProjet => {

})})}