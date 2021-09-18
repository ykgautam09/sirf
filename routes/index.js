const express = require('express');
const app = require('../app');
const router = express.Router();
const db = require('./../modules/dbConnection');



// all routes are relative to /
router.get('/',function (req,res, next) {
    res.render("Home/index");
});

module.exports = router;
