const db = require("../config/db");
const { validationResult } = require("express-validator");

// Get all approved testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT id, name, title, quote, rating, created_at FROM testimonials WHERE status = 'approved' ORDER BY created_at DESC"
    );
    res.json({ success: true, testimonials: rows });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
  }
};

// Get rating summary
exports.getRatingSummary = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT COUNT(*) as totalReviews, AVG(rating) as averageRating FROM testimonials WHERE status = 'approved'"
    );
    
    const summary = {
      totalReviews: rows[0].totalReviews || 0,
      averageRating: rows[0].averageRating ? parseFloat(rows[0].averageRating).toFixed(1) : "0.0"
    };
    
    res.json({ success: true, summary });
  } catch (error) {
    console.error("Error fetching rating summary:", error);
    res.status(500).json({ success: false, message: "Failed to fetch rating summary" });
  }
};

// Submit a new testimonial
exports.submitTestimonial = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, title, review, rating } = req.body;

  try {
    await db.promise().query(
      "INSERT INTO testimonials (name, title, quote, rating, status) VALUES (?, ?, ?, ?, 'pending')",
      [name, title, review, rating]
    );

    res.json({
      success: true,
      message: "Thank you! Your review has been submitted and will be reviewed by our team."
    });
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    res.status(500).json({ success: false, message: "Failed to submit testimonial" });
  }
};
