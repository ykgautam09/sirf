const express = require('express');
const app = require('../app');
const router = express.Router();
const db = require('./../modules/dbConnection');


// college login
router.get('/login', function (req, res) {
    res.render("College/login");
});

// college register
router.get('/register', function (req, res) {
    res.render("College/register");
});

// dashboard
router.get('/dashboard', function (req, res) {
    res.render("College/dashboard");
});


module.exports = router;
