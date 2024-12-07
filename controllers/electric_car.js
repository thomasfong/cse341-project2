const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  /* 
  #swagger.summary = 'Get all evCars' 
  */
 try{
    const result = await mongodb.getDatabase().db().collection('evCars').find();
    result.toArray().then((evCars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(evCars);
    });
  } catch(err) {
    res.status(404);
  }
};

const getSingle = async (req, res) => {
    /* 
  #swagger.summary = 'Get evCar by id' 
  */try{
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json({message: 'Invalid id'});
    }
    const evCarId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('evCars').find({ _id: evCarId });
    result.toArray().then((evCars) => {
      if (evCars.length == 0) {
        res.status(400).json('ID does not exist.')
        return;
      }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(evCars[0]);
    });
  } catch(err){
    res.status(404);
  }
};

const createEvCar = async (req, res) => {
    /* 
  #swagger.summary = 'Create a new evCar' 
  */
  try{
  const evCar = {
    name: req.body.name,
    screenSize: req.body.screenSize,
    cpuType: req.body.cpuType,
    memory: req.body.memory,
    storage: req.body.storage,
    resolution: req.body.resolution,
    price: req.body.price    
  };

  const response = await mongodb.getDatabase().db().collection('evCars').insertOne(evCar);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the product information.');
  }
  } catch(err) {
    res.status(500);
  }
};

const updateEvCar = async (req, res) => {
    /* 
  #swagger.summary = 'Update evCars by id' 
  */
  try {
  if (!ObjectId.isValid(req.params.id)){
    res.status(400).json({message: 'Invalid id'});
    }
    const evCarId = new ObjectId(req.params.id);
    const evCar = {
        name: req.body.name,
        screenSize: req.body.screenSize,
        cpuType: req.body.cpuType,
        memory: req.body.memory,
        storage: req.body.storage,
        resolution: req.body.resolution,
        price: req.body.price 
    };
    const response = await mongodb.getDatabase().db().collection('evCars').replaceOne({ _id: evCarId }, evCar);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the product information.');
    }
    } catch(err) {
      res.status(404);
    }
  };


const deleteEvCar = async (req, res) => {
      /* 
  #swagger.summary = 'Delete evCars by id' 
  */
  try {
  if (!ObjectId.isValid(req.params.id)){
    res.status(400).json({message: 'Invalid id'});
    }
    const evCarId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('evCars').deleteOne({ _id: evCarId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the product.');
    }
   } catch(err)  {
    res.status(404);
   }
  };

module.exports = {
    getAll,
    getSingle,
    createEvCar,
    updateEvCar,
    deleteEvCar
};