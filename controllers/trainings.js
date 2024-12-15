const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['trainings']
    const result = mongodb.getDatabase().db('project2').collection('training').find();
    result.toArray().then(trainings => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(trainings);
    }).catch(err => {
       console.log(err);
    });
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid traning ID to find employee');

    //#swagger.tags=['trainings']
    const trainingId = new ObjectId(req.params.id.toString());
    const result = mongodb.getDatabase().db('project2').collection('training').find({ _id: trainingId });
    result.toArray().then(trainings => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(trainings[0]);
    }).catch(err => {
       console.log(err);
    });
};

const createTraining = async (req, res) => {
    //#swagger.tags=['trainings']
    const { trainingId, employeeId, courseName, provider, completionDate, certificateLink } = req.body;
    const training = {     
        trainingId,
        employeeId,
        courseName,
        provider,
        completionDate,
        certificateLink
    };
    const result = await mongodb.getDatabase().db('project2').collection('training').insertOne(training);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while creating the training');
    }
};

const updateTraining = async (req, res) => {
    if (!ObjectId.isValid(req.params.id.toString())) res.status(400).json('Must use a valid employee ID to update employee');

    //#swagger.tags=['trainings']
    const trainingDbId = new ObjectId(req.params.id);
    const { trainingId, employeeId, courseName, provider, completionDate, certificateLink } = req.body;
    const training = {     
        trainingId,
        employeeId,
        courseName,
        provider,
        completionDate,
        certificateLink
    };
    const result = await mongodb.getDatabase().db('project2').collection('training').replaceOne({ _id: trainingDbId }, training);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while updating training');
    }
};

const deleteTraining = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid Training ID to delete training');

    //#swagger.tags=['trainings']
    const trainingDbId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project2').collection('training').deleteOne({ _id: trainingDbId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while deleting the training');
    }
};

module.exports = { 
    getAll,
    getSingle,
    createTraining,
    updateTraining,
    deleteTraining
 };