const axios = require('axios');
const fs = require('fs');
const server = "localhost:2600";

export function getData() {
    axios.get(server)
    .then(response => {
        fs.writeFile('data.json', response, (err) => {
        });
    });
}