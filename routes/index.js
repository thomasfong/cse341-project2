const express = require("express")
const router = new express.Router();
const employees = require('./employees');
const trainings = require('./trainings')
const swaggerRoute = require('./swagger');
const passport = require('passport');

router.use('/', swaggerRoute);
/*
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});
*/
router.use('/employees', employees);
router.use('/trainings', trainings);
router.get("/login", passport.authenticate('github'), (req, res) => {});

router.get("/logout", function(req, res, next) {
	req.logout(function(err) {
		if (err) return next(err);
		res.redirect('/')
	})
});

module.exports = router;