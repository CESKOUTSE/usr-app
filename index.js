//alert("je suis la");

//1- https://randomuser.me/api/?results=24 :On part chercher l'api. On a mis 24 users car c'est un multiple de 12. toujours prendre les multiples de 12

// 2- on lit la requete

//fetch("https://randomuser.me/api/?results=24").then((res) => console.log(res));

// 3- On transforme en json
/*fetch("https://randomuser.me/api/?results=24")
  .then((res) => res.json())
  .then((res) => console.log(res));*/

// 4- on va mettre dans une fonction et mettre les resultats dans une boites

let userData = []; // on va mettre les utulisateurs ici dans cette boite

/*
1- ecrire d'abord la fonction sans async et await: on verra que lorsqu'on log userData, on a rien à l'interieur. 
*/

const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((res) => (userData = res.results));

  console.log(userData);
};

// 5- on ecrit la fonction useDisplay pour afficher les données récupérées

// faire aussi d'abord sans async et await

/*
ici, fais d'abord:

1- le h3 sans le div pour montrer la puissance du map, ensuite tu injectes le div pour avoir un bon appercu

2- on ajoute img

3- ensuite p et em

4- la fonction dateParser
*/

const userDisplay = async () => {
  await fetchUser();

  // cette fonction va parser la date et on va l'utiliser sur res.dob.date. à en dernier (juste avant dayCalc)

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return newDate;
  };

  // cette fonction doit permettre de calculer le nombre de jour que l'utilisateur s'est enrégistré
  const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);

    return Math.ceil((todayTimestamp - timestamp) / 8.64e7); // stack overflow
  };

  document.body.innerHTML = userData
    .map(
      (res) => `<div class="card"> 

    <img src="${res.picture.large}" alt="photo de ${res.name.last}">

    <h3> ${res.name.first}, ${res.name.last}</h3>

    <p> ${res.location.city}, ${dateParser(res.dob.date)}</p>

    <em> Membre depuis: ${dayCalc(res.registered.date)} jours</em> 

    
    </div>`
    )
    .join(""); //la puissance du map: afficher plusieurs fois (vérifier dans le element de la console)
};

userDisplay();
