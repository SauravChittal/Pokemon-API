// Creating a web server in express
const { json } = require('body-parser');
var express = require('express');
var app = express();

var cors = require('cors');

app.use(cors());

// This import is for reading and converting json into an object with properties
let json_read = require('/Users/a/hello/My-API/Pokemon-To-JSON/json.json');

// This is for IO so I can read the json file scraped
let inputOutput = require('fs');
const { METHODS } = require("http");

// runs express server by running 'node app.js' on terminal
app.listen(2999, () => {
    console.log("Server running on http://localhost:2999");
});

app.get("/", (req, res) => {
    res.send("Welcome to the Pokemon API. Hopefully, you can get some information about certain Pokemon from here");
})

// Get Request to get information about a specific Pokemon
app.get("/:pokemon", (req, res) => {
    if (json_read[req.params.pokemon] == null) {
        res.status(404).send("This is not a Pokemon");
    } else {
        res.send(json_read[req.params.pokemon]);
    }
})

// This is Posting Pokemon with the type of Pokemon and it's type. If the python script is modified to scrape more data,
// this Post request can be changed.
app.post("/:pokemon/:variation/:type", (req, res) => {
    json_read[req.params.pokemon] = [req.params.variation, req.params.type];
    res.send("This Pokemon and it's information has been added");
    inputOutput.writeFile('./Pokemon-To-JSON/json.json', JSON.stringify(json_read), (err) => {
        if (err) throw err;
    })
})

// This request is for deleting a specific Pokemon.
app.delete("/:pokemon", (req, res) => {
    if (json_read[req.params.pokemon] == null) {
        return res.status(404).send("The Pokemon entered doesn't exist");
    }
    let pokemonName = req.params.pokemon;
    console.log(pokemonName);
    delete json_read.pokemonName;
    res.send("The Said Pokemon has been deleted");
    inputOutput.writeFile('./Pokemon-To-JSON/json.json', JSON.stringify(json_read), (err) => {
        if (err) throw err;
    })
})