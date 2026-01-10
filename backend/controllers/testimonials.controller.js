const db = require("../config/db");
const transporter = require("../config/mail");
const { validationResult } = require("express-validator");

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "adeleyetola@yahoo.com";
const SITE_URL = process.env.SITE_URL || "http://localhost:5000";

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
    const [result] = await db.promise().query(
      "INSERT INTO testimonials (name, title, quote, rating, status) VALUES (?, ?, ?, ?, 'pending')",
      [name, title, review, rating]
    );

    const testimonialId = result.insertId;

    // Send email notification to admin
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: ADMIN_EMAIL,
      subject: "New Testimonial Submitted - ADÉmaison",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">New Testimonial Submitted</h2>
          <p>A new testimonial has been submitted and is awaiting your approval.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Rating:</strong> ${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)</p>
            <p><strong>Review:</strong></p>
            <p style="font-style: italic;">"${review}"</p>
          </div>
          
          <p>To approve or reject this testimonial, please access your admin panel or update the database directly.</p>
          
          <div style="margin-top: 30px;">
            <a href="${SITE_URL}/api/testimonials/${testimonialId}/approve" 
               style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-right: 10px;">
              Approve
            </a>
            <a href="${SITE_URL}/api/testimonials/${testimonialId}/reject" 
               style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Reject
            </a>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This email was sent from ADÉmaison Interior Design website.
          </p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending admin notification email:", error);
      } else {
        console.log("Admin notification email sent:", info.response);
      }
    });

    res.json({
      success: true,
      message: "Thank you! Your review has been submitted and will be reviewed by our team."
    });
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    res.status(500).json({ success: false, message: "Failed to submit testimonial" });
  }
};

// Approve a testimonial
exports.approveTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query(
      "UPDATE testimonials SET status = 'approved' WHERE id = ?",
      [id]
    );
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #22c55e;">✓ Testimonial Approved</h1>
          <p>The testimonial has been approved and is now visible on the website.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error approving testimonial:", error);
    res.status(500).send("Failed to approve testimonial");
  }
};

// Reject a testimonial
exports.rejectTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query(
      "UPDATE testimonials SET status = 'rejected' WHERE id = ?",
      [id]
    );
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #ef4444;">✗ Testimonial Rejected</h1>
          <p>The testimonial has been rejected and will not be displayed.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error rejecting testimonial:", error);
    res.status(500).send("Failed to reject testimonial");
  }
};
