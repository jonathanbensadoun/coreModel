const CoreModel = require('./coreModel');

class Tag extends CoreModel {
  name;
  status;

  static tableName = "tag";

  constructor(obj) {
    super(obj);
    this.name = obj.name;
    this.status = obj.status;
  };

};

// on exporte la class directement !
module.exports = Tag;