//Etape 2 : La page de connexion

const form = document.querySelector('#envoyer');
console.log (form)
form.addEventListener("click", (e) => {
  e.preventDefault();

const email = document.querySelector("#email").value;
const password = document.querySelector("#pass").value;
console.log(email)
console.log(password)

fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    else {
      throw new Error("Mauvais e-mail et/ou mot de passe");
    }
  })
  .then(data => {
    localStorage.setItem("token", data.token);
    window.location.href="index.html"
  })
  .catch(error => {
    alert(error.message);
    console.error(error);
  });
});