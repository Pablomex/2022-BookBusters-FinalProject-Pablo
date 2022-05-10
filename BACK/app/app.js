const express = require('express');
const cors = require('cors');
const router = require('./routers');

const app = express();

require('./helpers/docHelper')(app);

// On ajoute le dossier public à nos routes
app.use(express.static('public'));

app.use(express.json());

// j'indique à mon serveur que j'accepte de recevoir des requêtes POST avec du texte
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: process.env.CORS_DOMAINS ?? true,
};
app.use(cors(corsOptions));

app.use(router);

module.exports = app;
