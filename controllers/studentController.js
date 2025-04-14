const db = require(`../util/db-connection`);
const Student = require('../models/students');

const addEntries = async (req, res) => {
    try{
        const { name, email } = req.body;
        const student = await Student.create({
            name: name,
            email: email
        });
        res.status(201).send(`Student with name ${name} has been created!`)
    }catch (error) {
        res.status(500).send('Unable to make entry.');
    }
};

const getEntries = async (req, res) => {
    try{
        const students = await Student.findAll();
        if (!students || students.length === 0) {
            return res.status(404).send('No student info is available');
        }
        res.status(200).json(students);
    } catch (error) {
        res.status(500).send('Student info cannot be found');
    }
};

const getEntriesById = async (req, res) => {
    try{
        const { id } = req.params;
        const student = await Student.findByPk(id);
        if (!student || student.length === 0) {
            res.status(404).send(`Student with id ${id} is not available`);
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).send('Student info cannot be found');
    }
};

const updateEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const student = await Student.findByPk(id);
        if (!student) {
            res.status(404).send('Student not found');
        }
        student.name = name;
        await student.save();
        res.status(200).send('Student info has been updated');
    } catch (error) {
        res.status(500).send('Student info cannot be updated')
    }
};

const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.destroy({
            where: { id: id }
        });
        if (!student) {
            res.status(404).send(`Student with id ${id} not found`)
        }
        res.status(200).send(`Student with id ${id} is deleted`)
    } catch (error) {
        res.status(500).send('Error encountered while deleting')
    }
};


module.exports = {
    addEntries,
    getEntries,
    getEntriesById,
    updateEntry,
    deleteEntry
};