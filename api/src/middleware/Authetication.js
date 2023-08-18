const jwt = require("jsonwebtoken");
const Config = require("../config/variable");
const User = require('../models/User')

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: " Acesso negado" });
    }
    try {
        jwt.verify(token, Config.secretKey, (error, user) => {
            if (error) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: " Token invalido" });
    }
}

function verififyTokenAndAuthorization(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json({ message: "Você não tem autorização" }); 
        }

    })
}

module.exports = {
    verifyToken,
    verififyTokenAndAuthorization
};
