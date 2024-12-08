const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    body('model').isLength({ min: 4}),
    body('batteryCapacity').isLength({ min: 2 }),
    body('EnduranceDistance').isLength({ min: 5 }),
    body('MaximumHorsepower').isLength({ min: 3 }),
    body('MaximumTorque').isLength({ min: 3 }),
    body('DriveSystem').isLength({ min: 5 }),
    body('cargoSpace').isLength({ min: 4 }),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}