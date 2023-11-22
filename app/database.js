  
// SoC : Dans ce fichier, on va gérer la connexion à la base de données


// on require le module pour se connecter
// et  on instancie un Client qui représente notre connexion à la BDD

// Première version, on require pg et on instancie pg.Client
// const pg = require('pg');
// const client = new pg.Client(process.env.PG_URL);

// Deuxième version, on destructure le module pg, pour ne récupérer QUE la class Client
const { Client } = require('pg');

const client = new Client(process.env.PG_URL);


// on connecte le client
client.connect();


// on exporte le client déjà connecté
module.exports = client;