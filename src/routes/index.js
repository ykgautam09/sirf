const express = require("express");
const router = express.Router();
const db = require("./../db/models/index");

// all routes are relative to /
router.get("/", (req, res) => {
  res.render("Home/index");
});

// about page
router.get("/about", (req, res) => {
  res.render("Home/about");
});
// faq page
router.get("/faq", (req, res) => {
  res.render("Home/faq");
});

// parameter  page
router.get("/parameter", (req, res) => {
  res.render("Home/parameter");
});

// ranking page
router.get("/ranking", (req, res) => {
  res.render("Home/ranking1");
});

// notification/advt page
router.get("/notification", (req, res) => {
  res.render("Home/notification");
});

// contact page
router.get("/contact", (req, res) => {
  res.render("Home/contact");
});

// document page
router.get("/document", (req, res) => {
  res.render("Home/document");
});

// advertisement page
router.get("/advertisement", (req, res) => {
  res.render("Home/advertisement");
});

// advertisement page
router.get("/rank", (req, res) => {
  res.render("Home/ranking");
});

// error page
router.get("/error", (req, res) => {
  res.render("Home/error");
});

module.exports = router;
