const express = require("express");
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

const router = express.Router();

// =====================================
// EMAIL TRANSPORTER
// =====================================

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =====================================
// TEST ROUTE
// =====================================

router.get("/test", (req, res) => {

  res.json({

    success: true,
    message: "API working",
  });
});

// =====================================
// CONTACT API
// =====================================

router.post("/contact", async (req, res) => {

  try {

    // =====================================
    // GET FORM DATA
    // =====================================

    const {
      name,
      email,
      phone,
      query,
    } = req.body;

    // =====================================
    // SAVE TO DATABASE
    // =====================================

    await Contact.create({

      name,
      email,
      phone,
      query,
    });

    // =====================================
    // COMPANY EMAIL
    // =====================================

    const companyMailOptions = {

      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      subject: "New Contact Form Submission",

      html: `
        <h2>New Contact Request</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Query:</strong> ${query}</p>
      `,
    };

    // =====================================
    // USER EMAIL
    // =====================================

    const userMailOptions = {

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Thank You For Contacting Prayush Technology",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          padding: 20px;
          line-height: 1.7;
          color: #111827;
        ">

          <h2 style="color:#2563eb;">
            Thank You ${name}
          </h2>

          <p>
            We have successfully received your query.
          </p>

          <p>
            Our team will contact you shortly.
          </p>

          <br>

          <p>
            Regards,<br>
            Prayush Technology
          </p>

        </div>
      `,
    };

    // =====================================
    // SEND EMAILS
    // =====================================

    await transporter.sendMail(companyMailOptions);

    await transporter.sendMail(userMailOptions);

    // =====================================
    // SUCCESS RESPONSE
    // =====================================

    res.status(200).json({

      success: true,
      message: "Contact form submitted successfully",
    });

  } catch (error) {

    console.log("MAIL ERROR:");
    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message || "Server Error",
    });
  }
});

// =====================================
// EXPORT
// =====================================

module.exports = router;