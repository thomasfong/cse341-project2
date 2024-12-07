const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  /* 
  #swagger.summary = 'Get all hdCars' 
  */
 try{
    const result = await mongodb.getDatabase().db().collection('hdCars').find();
    result.toArray().then((hdCars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(hdCars);
    });
  } catch(err) {
    res.status(404);
  }
};

const getSingle = async (req, res) => {
    /* 
  #swagger.summary = 'Get hdCar by id' 
  */try{
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json({message: 'Invalid id'});
    }
    const hdCarId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('hdCars').find({ _id: hdCarId });
    result.toArray().then((hdCars) => {
      if (hdCars.length == 0) {
        res.status(400).json('ID does not exist.')
        return;
      }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(hdCars[0]);
    });
  } catch(err){
    res.status(404);
  }
};

const createHdCar = async (req, res) => {
    /* 
  #swagger.summary = 'Create a new hdCar' 
  */
  try{
  const hdCar = {
    name: req.body.name,
    screenSize: req.body.screenSize,
    cpuType: req.body.cpuType,
    memory: req.body.memory,
    storage: req.body.storage,
    resolution: req.body.resolution,
    price: req.body.price    
  };

  const response = await mongodb.getDatabase().db().collection('hdCars').insertOne(hdCar);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the product information.');
  }
  } catch(err) {
    res.status(500);
  }
};

const updateHdCar = async (req, res) => {
    /* 
  #swagger.summary = 'Update hdCars by id' 
  */
  try {
  if (!ObjectId.isValid(req.params.id)){
    res.status(400).json({message: 'Invalid id'});
    }
    const hdCarId = new ObjectId(req.params.id);
    const hdCar = {
        name: req.body.name,
        screenSize: req.body.screenSize,
        cpuType: req.body.cpuType,
        memory: req.body.memory,
        storage: req.body.storage,
        resolution: req.body.resolution,
        price: req.body.price 
    };
    const response = await mongodb.getDatabase().db().collection('hdCars').replaceOne({ _id: hdCarId }, hdCar);
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


const deleteHdCar = async (req, res) => {
      /* 
  #swagger.summary = 'Delete hdCars by id' 
  */
  try {
  if (!ObjectId.isValid(req.params.id)){
    res.status(400).json({message: 'Invalid id'});
    }
    const hdCarId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('hdCars').deleteOne({ _id: hdCarId }, true);
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
    createHdCar,
    updateHdCar,
    deleteHdCar
};