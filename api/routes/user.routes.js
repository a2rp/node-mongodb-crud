const express = require("express");
const router = express.Router();

const { getAll, addUser, findUser, getOneUser, deleteOneUser, updateUser, deleteAllUsers } = require("../controllers/user.controllers");

router.get("/api/v1/user", getAll);
router.post("/api/v1/user", addUser);
router.get("/api/v1/user/:id", findUser, getOneUser);
router.delete("/api/v1/user/:id", findUser, deleteOneUser);
router.patch("/api/v1/user/:id", findUser, updateUser);
router.delete("/api/v1/user", deleteAllUsers);

module.exports = router;

