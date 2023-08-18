const express = require("express");
const routes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Config = require("../config/variable");

const UserModel = require("../models/User");

const secret = Config.secretKey;

//resgiste
routes.post("/register", async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;

        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);

        const nweUser = new UserModel({
            username,
            email,
            password: newPassword,
            isAdmin,
        });

        await nweUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//login
routes.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const DescPassword = await bcrypt.compare(password, user.password);
        if (!DescPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { 
                _id: user._id,
                isAdmin: user.isAdmin,
            }
            , secret,
            {expiresIn:"1d"});
        res.status(200).json({ message: "Login efetuado com sucesso", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = routes;
