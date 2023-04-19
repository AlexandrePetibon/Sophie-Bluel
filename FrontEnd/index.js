function galleryImg () {

const gallery = document.querySelector('#gallery');
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    data.forEach(project => {
      const projectElement = document.createElement('div');
      const imgElement = document.createElement('img');
      const titleElement = document.createElement('h3');
      imgElement.src = `${project.imageUrl}`;
      titleElement.innerText = `${project.title}`;
      projectElement.appendChild(imgElement);
      projectElement.appendChild(titleElement);
      gallery.appendChild(projectElement);
    });
    console.log(data)
  })
  .catch(error => console.error(error));
}

galleryImg ()
  
  const buttonTous = document.querySelector('#buttonG');
  const buttonT = document.createElement('button');
  buttonT.innerText = 'Tous';
  buttonT.setAttribute('id', 'button');
  buttonT.addEventListener('click', () => {
    console.log('Vous avez cliqué sur le bouton');
  });
  buttonTous.appendChild(buttonT);
  

  const buttonParent = document.querySelector('#buttonG');

  function filter() {
    fetch("http://localhost:5678/api/categories")
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          const button = document.createElement('button');
          button.innerText = data[i].name;
          button.setAttribute('id', 'button');
          buttonParent.appendChild(button); 
        }
      });
  }
  
  filter();



fetch(`http://localhost:5678/api/works`)
.then(response => response.json())
.then(data => {
  if () {

  }
}) 
    
    
   
   
  {button.addEventListener('click', () => {
    if (categoryIDs[i] === 1) {
      fetch(`http://localhost:5678/api/categories`)
        .then(response => response.json())
        .then(data => {
          const filterData = data.filter(category => category.id === 1);
          console.log(filterData);
        })
        .catch(error => console.error(error));
    } else if (categoryIDs[i] === 2) {
      fetch(`http://localhost:5678/api/categories`)
        .then(response => response.json())
        .then(data => {
          const filterData = data.filter(category => category.id === 2);
          console.log(filterData);
        })
        .catch(error => console.error(error));
    } else if (categoryIDs[i] === 3) {
      fetch(`http://localhost:5678/api/categories`)
        .then(response => response.json())
        .then(data => {
          const filterData = data.filter(category => category.id === 3);
          console.log(filterData);
        })
        .catch(error => console.error(error));
    }
    console.log('Vous avez cliqué sur le bouton');
  });
  buttonParent.appendChild(button);
}