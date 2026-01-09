const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const testimonialsController = require("../controllers/testimonials.controller");

// Get all approved testimonials
router.get("/", testimonialsController.getAllTestimonials);

// Get rating summary (for homepage)
router.get("/summary", testimonialsController.getRatingSummary);

// Submit a new testimonial
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required").trim().escape(),
    body("title").notEmpty().withMessage("Title is required").trim().escape(),
    body("review").notEmpty().withMessage("Review is required").trim().escape(),
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
  ],
  testimonialsController.submitTestimonial
);

module.exports = router;
