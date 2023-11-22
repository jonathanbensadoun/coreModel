const CoreModel = require('./coreModel');

class Question extends CoreModel {
  question;
  anecdote;
  wiki;
  status;
  levels_id;
  answers_id;
  quizzes_id;

  static tableName = "question";

  constructor(obj) {
    super(obj);
    this.question = obj.question;
    this.anecdote = obj.anecdote;
    this.wiki = obj.wiki;
    this.level_id = obj.level_id;
    this.answer_id = obj.answer_id;
    this.quizz_id = obj.quizz_id;
  };

};

// on exporte la class directement !
module.exports = Question;