const express = require("express")
const router = new express.Router();
const employeesController = require('../controllers/employees');
const validate = require('../middleware/validation-middleware');
const { isAuthenticated } = require('../middleware/authenticate');

router.get("/", employeesController.getAll);
router.get("/:id", employeesController.getSingle);
router.post(
    '/',
    isAuthenticated,
    validate.saveEmployee,
    employeesController.createEmployee
);
router.put(
    '/:id',
    isAuthenticated,
    validate.saveEmployee,
    employeesController.updateEmployee
);
router.delete(
    '/:id',
    isAuthenticated,
    employeesController.deleteEmployee);

module.exports = router;