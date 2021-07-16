// Creating a web server in express
const { json } = require("body-parser");
var express = require("express");
var app = express();

let json_read = require('/Users/a/hello/My-API/Pokemon-To-JSON/json.json');
console.log(json_read["Audino"], ' This is the JSON');

// runs express server by running 'node app.js' on terminal
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

app.get("/", (req, res) => {
    res.send("Welcome to the Pokemon API. Hopefully, you can get some information about certain Pokemon from here");
})

app.get("/:pokemon", (req, res) => {
    if (json_read[req.params.pokemon] === null) {
        return res.status(404).send("This is not a Pokemon");
    }
    res.send(json_read[req.params.pokemon]);
})

app.post("/:pokemon/:variation/:type", (req, res) => {
    json_read[req.params.pokemon] = [req.params.variation, req.params.type];
    res.send("This Pokemon and it's information has been added");
})

app.delete("/:pokemon", (req, res) => {
    if (json_read(req.params.pokemon) === null) {
        return res.status(404).send("The Pokemon entered doesn't exist");
    }
    json_read.delete(req.params.pokemon);
    res.send("The Said Pokemon has been deleted");
})