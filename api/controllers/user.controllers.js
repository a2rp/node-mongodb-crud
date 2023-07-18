const express = require("express");
const router = express.Router();
const User = require("../models/users.model");

const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    const user = await User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findUser = async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "cannot find user" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    console.log(user);
    res.user = user;
    next();
};

const getOneUser = (req, res) => {
    res.json(res.user);
};

const deleteOneUser = async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: "user deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.phone != null) {
        res.user.phone = req.body.phone;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany();
        res.json({ message: "all users deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAll, addUser, findUser, getOneUser, deleteOneUser, updateUser, deleteAllUsers };

