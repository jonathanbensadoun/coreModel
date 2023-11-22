const CoreModel = require('./coreModel');

class Answer extends CoreModel {
  description;
  status;
  question_id;

  // on surcharge le nom de la table !
  static tableName = "answer";

  constructor(obj) {
    super(obj);
    this.description = obj.description;
    this.status = obj.status;
    this.question_id = obj;
  };

};

module.exports = Answer;