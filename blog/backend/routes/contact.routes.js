const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { submitContact } = require("../controllers/contact.controller");

// Validation middleware
const contactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").optional().trim(),
  body("service").optional().trim(),
  body("message").trim().notEmpty().withMessage("Message is required")
];

router.post("/", contactValidation, submitContact);

module.exports = router;
