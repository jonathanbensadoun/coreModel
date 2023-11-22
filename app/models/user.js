const emailValidator = require('email-validator');
const CoreModel = require('./coreModel');

class User extends CoreModel {
  email;
  password;
  firstname;
  lastname;
  status;

  // on surcharge le nom de la table !
  static tableName = "app_user";

  constructor(obj) {
    super(obj);
    this.email = obj.email;
    this.password = obj.password;
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
    this.status = obj.status;
  };

  getFullName() {
    return this.firstname + ' ' + this.lastname;
  };

};

module.exports = User;