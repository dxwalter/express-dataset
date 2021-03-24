
const EventModel = require('../models/eventModels');
 
const returnMethod = (statusCode, status, message, data = {}) => {
	return {
		statusCode, status, message, data
	}
}

var getAllEvents = async () => {
	let getEvents = await EventModel.GetAllEvents().then(data => { 
		return data 
	}).catch(err => { return err })

	if (getEvents.error) return returnMethod (500, "error", "An error occurred getting all events");

	return returnMethod(200, "success", "All events.", getEvents.result)

};

var addEvent = async (body) => {
	let eventId = body.id

	let checkIfEventExists = await EventModel.CheckEventExistence(eventId).then(data => { 
		return data 
	}).catch(err => { return err })

	if (checkIfEventExists.error) return returnMethod (500, "error", "A server error occurred")

	if (checkIfEventExists.result !== null) return returnMethod(400, "error", "Event already exists")

	let newEvent = {
		id: body.id,
		type: body.type,
		actor: body.actor,
		repo: body.repo,
		created_at: body.created_at
	}

	const createNewEvent = await EventModel.AddNewEvent(newEvent);

	if (createNewEvent.error) return returnMethod (500, "error", "An error occurred creating event");

	return returnMethod (201, "success", "Event created successfully");

};


var getByActor = async (actorId) => {
	let getEvents = await EventModel.GetAllEventsByActor(actorId).then(data => { 
		return data 
	}).catch(err => { return err })

	if (getEvents.error) return returnMethod (500, "error", "An error occurred getting all events");

	if (getEvents.result.length == 0) return returnMethod (400, "error", "No event was found for this actor");

	return returnMethod(200, "success", "All events by actor.", getEvents.result)

};


var eraseEvents = async () => {
	let removeAllData = await EventModel.RemoveAllData().then(data => { 
		return data 
	}).catch(err => { return err })

	if (removeAllData.error) return returnMethod (500, "error", "An error occurred deleting all events");

	if (!removeAllData.result)  return returnMethod (400, "error", "An internal server error occurred");

	return returnMethod(200, "success", "All events deleted successfully.")

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents,
};

















