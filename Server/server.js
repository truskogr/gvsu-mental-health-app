const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 2600;
const app = express();

app.use(bodyParser.json());
let data = require('./data.json');
dataArr = [data];

app.get('/', (req, res) => {
    res.status(200).send(dataArr);
});

app.patch('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    
    page = dataArr.find((element) => {
        return element.title === id;
    });
    if (page === undefined)
        res.status(404).send("Couldn't find page");
    else {
        page.body = body;
        newData = JSON.stringify(dataArr[0]);
        fs.writeFile('data.json', newData, (err) => {
            if(err) throw err;
            console.log("Updated data file")
        });
        res.status(200).send("Updated successfully");
    }
});

app.listen(port, () => {
    console.log(`Running on port ${port}"`);
});