const Employee = require('../models/enployee');

const employeeController = {
  createEmployee: async (req, res) => {
    try {
      const newEmployee = await Employee.create(req.body);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getIdEmployee: async(req,res) =>{
    try {
        const employees = await Employee.findById(req.params.id)
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  },

  getAllEmployees: async (req, res) => {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateEmployee: async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ message: 'Funcionário excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = employeeController;
