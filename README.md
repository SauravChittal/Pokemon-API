# Pokemon-API

Run `extractor.py` to update the json file.
**Note: It can take quite a long time for all the information to be extracted. Also, the json file will need to be updated everytime extra information about Pokemon is scrapped**

After downloading the files, type in `node Poke-API.js` in the command line to start the server.

### GET Requests

To access information about a certain pokemon, type in http://localhost:3000/(pokemon). It returns a json describing information about said pokemon.

For example, typing in http://localhost:3000/Alakazam yields: ![image](https://user-images.githubusercontent.com/73107662/126216037-70f301ad-a506-409c-bdee-9b70a7399ea6.png).

### POST Requests

Posting information about a new pokemon would require an external service such as Postman. You post in the format: name/Pokemon Type/Actual Type of Pokemon.

For example, entering in information about Alakazam would be: alakazam/Psi Pokemon/Psychic.

### DELETE Requests

This again requires and external service and allows you to delete certain pokemon, in case extra were entered or wrong information was entered. The format is the exact same as Get Requests.
