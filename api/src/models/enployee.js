const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    sobrenome: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    dataNascimento: {
        type: Date,
        required: true,
    },
    cargo: {
        type: String,
        required: true,
    },
    setor: {
        type: String,
        required: true,
    },
    salario: {
        type: Number,
        required: true,
    },
},{timestamps:true});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
