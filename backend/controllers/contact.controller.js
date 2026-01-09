const { validationResult } = require("express-validator");
const transporter = require("../config/mail");

const submitContact = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, service, message } = req.body;

    // Send mail to admin
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.ADMIN_MAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Service:</strong> ${service || "Not specified"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    // Auto reply to sender
    await transporter.sendMail({
      from: `"ADÉmaison Interiors" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting ADÉmaison",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We have received your message and will get back to you shortly view email or through the phone number you provided if available on WhatsApp.</p>
        <p>You can also reach out to us on WhatsApp at <a href="https://wa.me/2347075300493?text=I'm interested in your services">+234 707 530 0493</a> for faster response.</p>
        <br>
        <p>Best regards,</p>
        <p style="font-weight: bold;">The ADÉmaison Team</p>
        <p style="font-style: italic;">Do not reply to this email. This is an automated response.</p>
        `
    });

    res.status(200).json({ 
      success: true, 
      message: "Message sent successfully" 
    });

  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send message. Please try again later." 
    });
  }
};

module.exports = { submitContact };
