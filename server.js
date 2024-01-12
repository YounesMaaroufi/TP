const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
const PORT = 8080;

const database_url = process.env.DATABASE_URL;

app.listen(PORT, () => {
  console.log(`server is running in http://localhost:${8080}`);
  console.log(`DATABASE ==> ${database_url}`);
});

app.get("/", async (req, res) => {
  const { data: players } = await axios(database_url + "/joueurs/");

  res.send(players);
});

// displaying the player by it's name
app.get("/players/", async (req, res) => {
  try {
    // searching by name query
    const query = req.query.nom;
    const { data: player } = await axios(
      database_url + "/joueurs?nom=" + query
    );
    res.send(player);
  } catch (error) {
    res.status(404).send("Sorry, the page you're looking for doesn't exist.");
  }
});

// by it's id
app.get("/players/:id", async (req, res) => {
  try {
    const { data: player } = await axios(
      database_url + "/joueurs/" + req.params.id
    );
    res.send(player);
  } catch (error) {
    res.status(404).send("Sorry, the page you're looking for doesn't exist.");
  }
});

// not found!
app.use((req, res, next) => {
  res.status(404).send("Sorry, the page you're looking for doesn't exist.");
});
