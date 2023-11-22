const CoreModel = require('./coreModel');

class Quizz extends CoreModel {
  title;
  description;
  status;
  app_user_id;

  // on surcharge le nom de la table !
  static tableName = "quizz";

  constructor(obj) {
    super(obj);
    this.title = obj.title;
    this.description = obj.description;
    this.status = obj.status;
    this.app_user_id = obj.app_user_id;
  };
};

module.exports = Quizz;