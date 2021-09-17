const express = require('express');
const app = require('../app');
const router = express.Router();
const db = require('./../modules/dbConnection');



// all routes are relative to /
router.get('/',(req,res)=>{
    res.send("No Home Page")
})

module.exports = router;
