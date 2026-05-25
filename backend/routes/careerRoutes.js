const express = require("express");
const router = express.Router();
const Career = require("../models/Career");

const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");

// ======================================
// MULTER STORAGE
// ======================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

// ======================================
// NODEMAILER
// ======================================

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======================================
// CAREER ROUTE
// ======================================

router.post(
  "/career",
  upload.single("resume"),

  async (req, res) => {

    try {

      // ======================================
      // GET FORM DATA
      // ======================================

      const {
        name,
        email,
        phone,
        message,
      } = req.body;

      const resumeFile = req.file;

      // ======================================
      // SAVE TO DATABASE
      // ======================================

      await Career.create({

        name,
        email,
        phone,
        message,

        resumePath: resumeFile.path,
      });

      // ======================================
      // ADMIN EMAIL
      // ======================================

      await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: process.env.EMAIL_USER,

        subject: "New Career Application",

        html: `
          <h2>Career Application</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone}</p>

          <p><strong>Message:</strong> ${message}</p>
        `,

        attachments: [
          {
            filename: resumeFile.originalname,
            path: resumeFile.path,
          },
        ],
      });

      // ======================================
      // USER CONFIRMATION EMAIL
      // ======================================

      await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: email,

        subject: "Application Received - Prayush Technology",

        html: `

          <div style="
            font-family: Arial, sans-serif;
            padding: 20px;
            line-height: 1.7;
            color: #111827;
          ">

            <h2 style="color:#2563eb;">
              Thank You for Applying
            </h2>

            <p>
              Dear ${name},
            </p>

            <p>
              We have successfully received your application at
              <strong>Prayush Technology</strong>.
            </p>

            <p>
              Our recruitment team will review your profile and
              contact you if your skills match our requirements.
            </p>

            <p>
              We appreciate your interest in joining our team.
            </p>

            <br>

            <p>
              Regards,<br>
              Prayush Technology
            </p>

          </div>
        `,
      });

      // ======================================
      // SUCCESS RESPONSE
      // ======================================

      res.status(200).json({

        success: true,
        message: "Application submitted successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,
        message: "Something went wrong",
      });
    }
  }
);

// ======================================
// EXPORT
// ======================================

module.exports = router;