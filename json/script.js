async function populate() {
  const requestUrl =
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
  const request = new Request(requestUrl);

  const response = await fetch(request);
  const superHeroes = await response.json();

  populateHeader(superHeroes);
  populateHeroes(superHeroes);
}

function populateHeader(obj) {
  const header = document.querySelector("header");
  const h1 = document.createElement("h1");
  const myH1 = document.createElement("h1");
  myH1.textContent = obj["squadName"];
  header.appendChild(myH1);

  const myPara = document.createElement("p");
  myPara.textContent = `Hometown: ${obj["homeTown"]} // Formed: ${obj["formed"]}`;
  header.appendChild(myPara);
}

function populateHeroes(obj) {
  const section = document.querySelector("section");
  const heros = obj["members"];

  for (const hero of heros) {
    const myArticle = document.createElement("article");
    const myH2 = document.createElement("h2");
    const mypara1 = document.createElement("p");
    const mypara2 = document.createElement("p");
    const mypara3 = document.createElement("p");
    const myList = document.createElement("ul");

    myH2.textContent = hero.name;
    mypara1.textContent = `Secret identity: ${hero.secretIdentity}`;
    mypara2.textContent = `Age: ${hero.age}`;
    mypara3.textContent = `SuperPowers:`;

    const superPowers = hero.powers;
    for (const power of superPowers) {
      const listItem = document.createElement("li");
      listItem.textContent = power;
      myList.appendChild(listItem);
    }

    myArticle.appendChild(myH2);
    myArticle.appendChild(mypara1);
    myArticle.appendChild(mypara2);
    myArticle.appendChild(mypara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}

populate();
