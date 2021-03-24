const Datastore = require('nedb')
const db = new Datastore({ filename: './dataStore/events.db', autoload: true });
const ActorsModel = require('./actorsModel')

class EventModelFunctions extends ActorsModel{
    constructor () {
        super()
    }

    async GetAllActors () {

    }

    async CheckEventExistence (eventId) { 
        return new Promise(
            (resolve, reject) => {
                db.findOne({ id: eventId }, function (err, doc) {
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

    async GetAllEvents () {
        return new Promise(
            (resolve, reject) => {
                db.find({}, {_id: 0}).sort({id: 1}).exec(function (err, docs) {
                    if (err) reject({
                        error: true,
                        message: err.message
                    })
                    resolve({
                        error: false,
                        result: docs
                    })
                });
            }
        )
    }
    // "actor" : actorId 
    async GetAllEventsByActor (actorId) {
        return new Promise(
            (resolve, reject) => {
                db.find({"actor.id" : Number(actorId)}, function (err, docs) {
                    if (err) reject({
                        error: true,
                        message: err.message
                    })

                    resolve({
                        error: false,
                        result: docs
                    })
                });
            }
        )
    }

    async AddNewEvent (doc) {
        return new Promise(
            (resolve, reject) => {
                db.insert(doc, function (err, newDoc) { 
                    if (err) reject({
                        error: true,
                        message: err.message
                    })
                    resolve({
                        error: false,
                        result: newDoc
                    })
                });
            }
        )
    }

    async RemoveAllData () {
        // Removing all documents with the 'match-all' query
        return new Promise(
            (resolve, reject) => {
                db.remove({}, { multi: true }, function (err, numRemoved) {
                    if (err) reject({
                        error: true,
                        message: err.message
                    })
                    resolve({
                        error: false,
                        result: numRemoved
                    })
                });
            }
        )
    }
}

const EventModel = new EventModelFunctions()

module.exports = EventModel