const router = require('express').Router();
const { userValidationRules, validate } = require('../middleware/validator');
const evCarsController = require('../controllers/electric');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', evCarsController.getAll);
router.get('/:id', evCarsController.getSingle);
router.post('/', isAuthenticated, userValidationRules(), validate, evCarsController.createEvCar);
router.put('/:id', isAuthenticated, userValidationRules(), validate, evCarsController.updateEvCar);
router.delete('/:id', isAuthenticated, evCarsController.deleteEvCar);

module.exports = router;