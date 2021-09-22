const express = require('express');
const app = require('../app');
const router = express.Router();
const db = require('./../modules/dbConnection');



// all routes are relative to /
router.get('/',function (req,res) {
    res.render("Home/index");
});

// about page
router.get('/about',function (req,res) {
    res.render("Home/about");
});

// parameter  page
router.get('/parameter',function (req,res) {
    res.render("Home/parameter");
});

// documents page
router.get('/documents',function (req,res) {
    res.render("Home/documents");
});

// ranking page
router.get('/ranking',function (req,res) {
    res.render("Home/ranking");
});

// notification/advt page
router.get('/notification',function (req,res) {
    res.render("Home/notification");
});

// contact page
router.get('/contact',function (req,res) {
    res.render("Home/contact");
});

// document page
router.get('/document',function (req,res) {
    res.render("Home/document");
});

// advertisement page
router.get('/advertisement',function (req,res) {
    res.render("Home/advertisement");
});

module.exports = router;
