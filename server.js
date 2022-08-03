const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const validator = require('validator');
const app = express();
const PORT = 3000;
const connection = require('./db');
const router = require('./routes');

app.use(cors());
app.use(bodyParser.json());

//fine inizializzazione
app.use('/', routes);

app.listen(PORT, function() {
    console.log("Il server è in esecuzione sulla porta: " + PORT);
});

//evita che node si chiuda su un errore
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});

