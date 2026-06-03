fetch("https://zelda.fanapis.com/api/games")

  .then(response => response.json())
  .then(data => {
    console.log("Juegos de Zelda:");
    console.log(data.data);
  })
  .catch(error => {
    console.error("Error:", error);
  });

  fetch("https://zelda.fanapis.com/api/characters")
  .then(response => response.json())
  .then(data => {
    console.log("Personajes:");
    console.log(data.data);
  })
  .catch(error => {
    console.error("Error:", error);
  });