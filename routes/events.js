var express = require('express');
var router = express.Router();

const EventsController = require('../controllers/events')
const ActorsController = require('../controllers/actors')

// Create events
router.post('/', async(req, res) => {
    const body = req.body.id === undefined ? req.body.body : req.body
    const createEvent = await EventsController.addEvent(body);
    if (createEvent.status == "error") {
      return res.status(createEvent.statusCode).send({message: createEvent.message})
    }
    return res.status(createEvent.statusCode).send({message: createEvent.message})
})



// Get all events
router.get('/', async (req, res) => {
    const getAllEvents = await EventsController.getAllEvents();
    if (getAllEvents.status == "error") {
      return res.status(getAllEvents.statusCode).send({message: getAllEvents.message})
    }
    return res.status(getAllEvents.statusCode).json(getAllEvents.data)
})

// get event perfomed by actor
router.get('/actors/:id', async (req, res) => {
  const actorId = req.params.id
  const getEventsByActor = await EventsController.getByActor(actorId)
  if (getEventsByActor.status == "error") return res.status(getEventsByActor.statusCode).send({message: getEventsByActor.message})
  return res.status(getEventsByActor.statusCode).json(getEventsByActor.data)
})


module.exports = router;