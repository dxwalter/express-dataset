const Datastore = require('nedb')
const db = new Datastore({ filename: './dataStore/actors.db', autoload: true });

class ActorsModelFunction {
    constructor () {

    }

    returnMethod (statusCode, status, message, data = {}) {
        return {
            statusCode, status, message, data
        }
    }

    async CheckActorsExistence (actorId) { 
        return new Promise(
            (resolve, reject) => {
                db.findOne({ id: actorId }, function (err, doc) {
                    if (err) reject({
                        error: true,
                        message: err.message
                    })
                    resolve({
                        error: false,
                        result: doc
                    })
                });
            }
        )
    }

    async UpdateActorsProfile (actorId, newObject) { 
        return new Promise(
            (resolve, reject) => {
                db.update({ id: actorId }, { $set: newObject }, function (err, numReplaced) {
                    if (err) reject({
                        error: true,
                        message: err.message
                    })
                    resolve({
                        error: false,
                        result: numReplaced
                    })
                });
            }
        )
    }

    async AddActor (doc) {
        
        const actorId = doc.id;
        const checkExistence = await this.CheckActorsExistence(actorId);
        if (checkExistence.error) return this.returnMethod(500, "error", "A server error occurred")
        if (checkExistence.result !== null) return this.returnMethod(200, "success", "This actor exists")

        return new Promise(
            (resolve, reject) => {
                db.insert(doc, function (err, newDoc) { 
                    if (err) reject({
                        error: true,
                        message: err.message,
                        status: "error",
                    })
                    resolve({
                        status: "success",
                        message: "Actor created",
                        error: false,
                        result: doc
                    })
                });
            }
        )
    }
}

module.exports = ActorsModelFunction