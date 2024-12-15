const express = require("express")
const router = new express.Router();
const trainingsController = require('../controllers/trainings');
const validate = require('../middleware/validation-middleware');
const { isAuthenticated } = require('../middleware/authenticate');

router.get("/", trainingsController.getAll);
router.get("/:id", trainingsController.getSingle);
router.post(
    '/',
    isAuthenticated,
    validate.saveTraining,
    trainingsController.createTraining
);
router.put(
    '/:id',
    isAuthenticated,
    validate.saveTraining,
    trainingsController.updateTraining
);
router.delete(
    '/:id',
    isAuthenticated,
    trainingsController.deleteTraining);

module.exports = router;