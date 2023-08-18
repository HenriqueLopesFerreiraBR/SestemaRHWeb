const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/Authetication");
const bcrypt = require("bcrypt");

const UserModel = require("../models/User");

//GetAll
router.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error);
    }
});

//GetId
router.get("/:id", authMiddleware.verifyToken, async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id, "-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put("/:id", authMiddleware.verififyTokenAndAuthorization,async (req, res) => {
    const id = req.params.id;
    const { username, email, password, picture, isAdmin } = req.body;

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    try {
        var userUpdated = {
            username,
            email,
            password: newPassword,
            picture,
            isAdmin,
        };
        var update = await UserModel.findByIdAndUpdate(id, userUpdated, {
            new: true,
        });

        res.status(200).json({ message: "Usuario Atualizado" });
    } catch (error) {
        res.status(401).json(error);
    }
});

router.delete("/:id",authMiddleware.verififyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
});

module.exports = router;
