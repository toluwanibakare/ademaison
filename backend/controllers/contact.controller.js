// Send mail to admin
await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: process.env.ADMIN_MAIL,
    subject: `New Contact Form Submission from ${name}`,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Service: ${service}</p><p>Message: ${message}</p>`
  });
  
  // Auto reply to sender
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Thank you for contacting ADÉmaison",
    html: `<p>Hi ${name},</p><p>Thank you for reaching out. We have received your message and will contact you shortly.</p>`
  });
  