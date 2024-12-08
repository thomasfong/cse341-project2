const router = require('express').Router();
const { userValidationRules, validate } = require('../middleware/validator');
const hdCarsController = require('../controllers/hydrogen_car');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', hdCarsController.getAll);
router.get('/:id', hdCarsController.getSingle);
router.post('/', isAuthenticated, userValidationRules(), validate, hdCarsController.createHdCar);
router.put('/:id', isAuthenticated, userValidationRules(), validate, hdCarsController.updateHdCar);
router.delete('/:id', isAuthenticated, hdCarsController.deleteHdCar);


module.exports = router;