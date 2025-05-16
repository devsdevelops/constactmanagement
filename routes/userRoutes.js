const express = require("express");
const {registeUser,currentUser,loginUser}=require("../Controller/useController")
const router = express.Router();

// router.post

router.post("/register",registeUser);

router.post("/login",loginUser);

router.post("/current",currentUser);

module.exports = router;
