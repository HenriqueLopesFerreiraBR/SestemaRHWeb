const Config = require("../config/variable");
const mongoose = require("mongoose");

const connect = mongoose
    .connect(Config.ulrDb)
    .then(console.log("banco de dados conectado com sucesso"))
    .catch((error) => {
        console.log(error);
    });

module.exports = { connect };
