const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['employees']
    const result = mongodb.getDatabase().db('project2').collection('employees').find();
    result.toArray().then(employees => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees);
    }).catch(err => {
       console.log(err);
    });
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid employee ID to find employee');

    //#swagger.tags=['employees']
    const employeeId = new ObjectId(req.params.id.toString());
    const result = mongodb.getDatabase().db('project2').collection('employees').find({ _id: employeeId });
    result.toArray().then(employees => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees[0]);
    }).catch(err => {
       console.log(err);
    });
};

const createEmployee = async (req, res) => {
    //#swagger.tags=['employees']
    const { name, employeeId, position, email, phone, department, hireDate, salary } = req.body;
    const employee = {     
        name,
        employeeId,
        position,
        email,
        phone,
        department,
        hireDate,
        salary
    };
    const result = await mongodb.getDatabase().db('project2').collection('employees').insertOne(employee);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while creating the employee');
    }
};

const updateEmployee = async (req, res) => {
    if (!ObjectId.isValid(req.params.id.toString())) res.status(400).json('Must use a valid employee ID to update employee');

    //#swagger.tags=['employees']
    const employeeDbId = new ObjectId(req.params.id);
    const { name, employeeId, position, email, phone, department, hireDate, salary } = req.body;
    const employee = {     
        name,
        employeeId,
        position,
        email,
        phone,
        department,
        hireDate,
        salary
    };
    const result = await mongodb.getDatabase().db('project2').collection('employees').replaceOne({ _id: employeeDbId }, employee);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while updating employee');
    }
};

const deleteEmployee = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid employee ID to delete employee');

    //#swagger.tags=['employees']
    const employeeDbId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project2').collection('employees').deleteOne({ _id: employeeDbId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while deleting the employee');
    }
};

module.exports = { 
    getAll,
    getSingle,
    createEmployee,
    updateEmployee,
    deleteEmployee
 };