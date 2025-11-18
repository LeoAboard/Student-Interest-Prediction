const express = require("express");
const path = require("path");
const router = express.Router();

const frontendPath = path.join(__dirname, "..", "Frontend");

router.get("/login", (req, res) => {
    res.sendFile(path.join(frontendPath, "login.html"));
});

router.get("/home", (req, res) => {
    res.sendFile(path.join(frontendPath, "home.html"));
});

// router.get("/adm", (req, res) => {
//     res.sendFile(path.join(frontendPath, "adm.html"));
// });

router.get("/formulario", (req, res) => {
    res.sendFile(path.join(frontendPath, "formulario.html"));
});

router.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "home.html"));
});

module.exports = router;
