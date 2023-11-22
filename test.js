// on charge les env vars
const dotenv = require('dotenv');
dotenv.config();

const Level = require('./app/models/level');

/**
 * Level.getAll
 */

/* Première version, non statique */
// const test = new Level({});
// test.getAll( (err, results) => {
//   console.log(results.rows);
// });


/* Deuxième version, rendue statique */
/*Level.getAll( (err, results) => {
  console.log(results);
});*/


/**
 * Level.getOne
 */

// Level.getOne(1, (err, result) => {
//    console.log(err, result);
// });


/**
 * Level.insert
 */

// let newLevel = new Level({});

// newLevel.setName("Super dur");
// newLevel.setStatus(1);

// newLevel.insert( (err, res) => {
//   console.log(err, res);
// });


/**
 * Level.update
 */

//1. récupérer le "level"
// Level.getOne(7, (err, level) => {
//   //2. modifier ses données
//   level.setName("Vraiment très dur");

//   //3. lancer la sauvegarde !
//   level.update( (err, res) => {
//     console.log(err, res);
//   });

// });

/**
 * Level.delete
 */

//1. récupérer un "level"
// Level.getOne(6, (err, level) => {
//   console.log(level);
//   if (level) {
//     //2. le supprimer !
//     level.delete((err, res) => {
//       if (res) {
//         console.log("Le level à bien été supprimé");
//       } else {
//         console.log("Le level n'a pas| été supprimé");
//       }
//     });
//   }
// });


/**
 * Model.findBy
 */

const User = require('./app/models/user');

User.findBy({firstname: "Philippe"}, (err, users) => {
  console.log(err, users);
});


const Question = require('./app/models/question');
Question.findBy({quizz_id: 1}, (err, questions) => {
  console.log(err, questions);
});
