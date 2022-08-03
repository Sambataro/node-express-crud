import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
const validator = require('validator');
const app = express();
const PORT = 3000;
import connection from './db';
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

