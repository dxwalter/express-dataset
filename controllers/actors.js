
const EventModel = require('../models/eventModels');
 
const returnMethod = (statusCode, status, message, data = {}) => {
	return {
		statusCode, status, message, data
	}
}

const getAllActors = async () => {
	
	let getActors = await EventModel.GetAllEvents().then(data => { 
		return data 
	}).catch(err => { return err })


	if (getActors.error) return returnMethod (500, "error", "An error occurred getting all actors");

	if (getActors.result.length == 0) return returnMethod (200, "success", "No error was found");

	let actorsArray = [];

	for (const actor of getActors.result) {
		actorsArray.push(actor.actor)
	}

	return returnMethod(200, "success", "All events.", actorsArray)

}

var updateActor = async (actorsId, newObject) => {
	
	const checkExistence = await EventModel.CheckActorsExistence(actorsId);
	if (checkExistence.error === true) return returnMethod(500, "error", checkExistence.message)
	if (checkExistence.result === null) return returnMethod(404, "error", "This actor does not exist")

	const updateProfile = await EventModel.UpdateActorsProfile(actorsId, newObject);
	if (updateProfile.error) return returnMethod(500, "error", updateProfile.message)
	if (updateProfile.result === 0) return returnMethod(400, "error", "An error occurred update actor's profile")
	return returnMethod(200, "success", "Profile updated")
};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















