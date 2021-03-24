var express = require('express');
var router = express.Router();
const ActorsController = require('../controllers/actors')
// Routes related to actor.

// update actor's avatar
router.put("/", async (req, res) => {
    const body = req.body.id === undefined ? req.body.body : req.body
    const actorsId = Number(body.id);
    const newAvatar = { avatar_url: body.avatar_url }
    const updateAvatar = await ActorsController.updateActor(actorsId, newAvatar)
    if (updateAvatar.status == "error") {
        return res.status(updateAvatar.statusCode).send({message: updateAvatar.message})
      }
      return res.status(updateAvatar.statusCode).send({message: updateAvatar.message})
})

router.get("/", async (req, res) => {
  const getAllActors = await ActorsController.getAllActors()
  if (getAllActors.status == "error") {
    return res.status(getAllActors.statusCode).send({message: getAllActors.message})
  }
  return res.status(getAllActors.statusCode).send({message: getAllActors.message})
})

router.get("/streak", async (req, res) => {
  return res.status(200).send()
})

module.exports = router;