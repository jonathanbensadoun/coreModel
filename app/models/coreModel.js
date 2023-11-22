// on récupère la connexion à la db
const client = require('../database');

class CoreModel {
  id;
  created_at;
  updated_at;

  // Afin de pouvoir y accéder avec les méthodes static il faut définir tableName en static
  // Attention on commence par le faire en non-static avec delete
  static tableName = null;

  constructor(obj) {
    this.id = obj.id;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
  };

  /**
   * Méthode Active Record
   */

  static getAll(callback) {
    const query = `SELECT * FROM "${this.tableName}"`;
    /* Version rapide, mais un peu trop !
     problème : on ne récupère pas des instances de User. */
    // client.query(query, callback);

    /* On améliore donc la méthode en bouclant pour instancier des Model */
    client.query(query, (err, results) => {
      // 1er cas de figure: une erreur => on la passe au callback (return est là pour arrêter la fonction)
      if (err) {
        return callback(err, null);
      }

      // 2 ème cas de figure : résultat vide => on passe une liste vide au callback
      if (!results.rowCount) {
        return callback(null, []);
      } else {
        // 3 ème cas de figure : on a des résultats !
        // on fait une boucle pour instancier des Model
        // on peut utiliser `new this` ! car on est dans une méthode statique, donc this représente la classe !
        let trueResult = [];
        for (let obj of results.rows) {
          trueResult.push(new this(obj));
        }
        // et on transmet les instances de Model au callback !
        callback(null, trueResult);
      }

    });
  };

  static getOne(id, callback) {
    // Note : on s'embête pas avec les requêtes préparées (trop de travail dans DBConnection)
    // Mais c'est exceptionnel : c'est mal !
    const query = {
      text: `SELECT * FROM ${this.tableName} WHERE id=$1`,
      values: [id]
    };
    client.query(query, (err, result) => {
      // on refait les meme cas de figure...
      if (err) {
        return callback(err, null);
      }

      if (!result.rowCount) {
        return callback(null, null);
      } else {
        //... sauf qu'on fait pas de boucle : on prend que le premier résultat
        let trueResult = new this(result.rows[0]);
        callback(null, trueResult);
      }
    });
  };

  insert(callback) {
    /**
     * Note:  en l'état, la méthode ne modifie que l'id de l'objet courant
     * on pourrait l'améliorer en rajoutant "returning created_at, updated_at"
     * et ainsi mettre à jour les timestamps
     * A FAIRE EN BONUS SI LE TEMPS LE PERMET
     */

    /**
     * Note 2:  On ne connais pas à l'avance les propriétés de l'instance qui appellera cette fonction.
     * Mais grâce à Object.keys, on peut récupérer les nom des propriétés d'un objet !
     * On se sert de cette fonction pour créer la requête.
     * @see : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/keys
     * @see : https://zellwk.com/blog/looping-through-js-objects/
     */
    // On peut égelement utiliser for…in…
    let properties = Object.keys(this);

    let fields = [];
    let values = [];
    let placeholders = [];
    let indexPlaceholder = 1;

    for (let prop of properties) {
      // on filtre "id", "created_at" et "updated_at"
      if (['id', 'created_at', 'updated_at'].includes(prop)) {
        continue;
      }
      // au passage, on rajoute les ""
      fields.push(`"${prop}"`);
      values.push(this[prop]);
      placeholders.push('$' + indexPlaceholder);
      indexPlaceholder++;
    }

    const query = {
      text: `
        INSERT INTO "${this.constructor.tableName}" 
        (${fields})
        VALUES (${placeholders}) 
        RETURNING id, created_at
      `,
      values
    }

    client.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      }

      if (result.rowCount) {
        // grace à "RETURNING id, created_at", on peut récupérer les champs de l'objet nouvellement inséré
        // on a plus qu'à le mettre dans l'objet courant
        this.id = result.rows[0].id;
        this.created_at = result.rows[0].created_at;
        // puis on appelle le callback en lui passant l'instance courante
        callback(null, this);

      } else {
        // si pas de retour, il s'est passé quelquechose de bizarre...
        callback('Insert did not return any id.', this);
      }
    });
  };


  update(callback) {
    /**
     * Même reflexion que pour insert : impossible de connaitre les props à l'avance.
     * Ici encore, on se sert de Object.keys.
     */

    const properties = Object.keys(this);

    let sets = [];
    let values = [];
    let indexPlaceholder = 1;

    for (let prop of properties) {
      // on filtre "id", "created_at" et "updated_at"
      if (['id', 'created_at', 'updated_at'].includes(prop)) {
        continue;
      }
      // au passage, on rajoute les ""
      sets.push(`"${prop}"=$${indexPlaceholder}`);
      values.push(this[prop]);
      indexPlaceholder++;
    }
    // pour updated_at, on utilise la valeur auto!
    sets.push(`"updated_at"=NOW()`);

    //Il faut rajouter l'id dans les values pour le where
    // on utilisera l'index placeholder dernièrement mis à jour par la dernière boucle
    values.push(this.id);

    const query = {
      text: `
        UPDATE "${this.constructor.tableName}"
        SET ${sets}
        WHERE "id"=$${indexPlaceholder}
        RETURNING id, updated_at
      `,
      values
    }

    client.query(query, (err, result) => {
      if (err) {
        callback(err, null);
      }

      if (result.rowCount) {
        // au moins une ligne a été modifié => tout va bien !
        callback(null, this);
      } else {
        callback('Update did not target any rows', this);
      }
    });
  };

  delete(callback) {
    const query = {
      text: `DELETE FROM ${this.constructor.tableName} WHERE id=$1`,
      values: [this.id]
    };
    client.query(query, (err, result) => {
      if (err) {
        callback(err, null);
      }
      if (result.rowCount) {
        // au moins une ligne a été supprimé => tout va bien !
        callback(null, true);
      } else {
        callback('Delete did not target any rows', this);
      }
    });
  };


  /**
   * Méthodes AR poussées
   * (correction du challenge S5E4)
   */

  static findBy(params, callback) {

    // allez hop, version moderne, on arrête les Object.keys
    const conditions = [];
    let indexPlaceholder = 1;
    const values = [];
    for (let prop in params) {
      conditions.push(`"${prop}" = $${indexPlaceholder}`);
      values.push(params[prop]);
      indexPlaceholder++;
    }

    // On gère le cas ou aucune conditions n'est défini
    let conditionSQL = '';
    if (conditions.length > 0) {
      conditionSQL = `WHERE ${conditions.join(' AND ')}`;
    }

    let query = {
      text: `SELECT * FROM ${this.tableName} ${conditionSQL} `,
      values
    }

    // et la, même traitement que dans les autres "find"
    client.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }

      if (!results.rowCount) {
        return callback(null, []);
      } else {
        let trueResult = [];
        for (let obj of results.rows) {
          trueResult.push(new this(obj));
        }
        callback(err, trueResult);
      }
    });
  };

  save(callback) {
    // ici, il "suffit" de tester si l'instance courante a déjà un id
    // si c'est le cas, on update
    // sinon, on insert !
    if (this.id) {
      return this.update(callback);
    } else {
      return this.insert(callback);
    }
    // et c'est tout !
  };

};



module.exports = CoreModel;