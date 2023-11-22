
const CoreModel = require('./coreModel');

class Level extends CoreModel {
  name;
  status;

  // on surcharge le nom de la table !
  static tableName = "level";

  constructor(obj) {
    super(obj);
    this.name = obj.name;
    this.status = obj.status;
  };

};

// on exporte la class directement !
module.exports = Level;