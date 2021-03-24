var express = require('express');
var router = express.Router();

const EventsController = require('../controllers/events')

// Route related to delete events
router.delete('/', async (req, res) => {
    let eraseAllEvents = await EventsController.eraseEvents();
    if (eraseAllEvents.status == "error") {
      return res.status(eraseAllEvents.statusCode).send({message: eraseAllEvents.message})
    }
    return res.status(eraseAllEvents.statusCode).send({message: eraseAllEvents.message})
})

module.exports = router;