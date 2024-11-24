import nodemailer from "nodemailer";
import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD, } from "../config/env.config.js";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const srcPath = path.resolve(__dirname, "../");


export const customizeFooter = (recipientEmail) => {
  const emailPath = path.join(
    srcPath,
    "utils",
    "emails",
    "footer.html"
  );
  const footerContent = fs.readFileSync(emailPath);
  const dom = new JSDOM(footerContent, { resources: "usable" });
  const footerDoc = dom.window.document;
  // const email = footerDoc.querySelector(".email") ;

  const logo = footerDoc.getElementById("cybtekk");
  logo.href = "https://cybtekk.com/";

  // const stonetekk = footerDoc.getElementById("stonetekk");
  // stonetekk.href = "https://www.stonetekk.in/";

  // const facebook = footerDoc.getElementById("facebook") ;
  // facebook.href = "https://www.facebook.com/stonetekk";

  const twitter = footerDoc.getElementById("twitter");
  twitter.href =
    "https://x.com/CybTEKK_";

  const instagram = footerDoc.getElementById("instagram");
  instagram.href = "https://www.instagram.com/CybTEKK/";

  const linkedin = footerDoc.getElementById("linkedin");
  linkedin.href = "https://in.linkedin.com/company/cybtekk";

  const apple = footerDoc.getElementById("apple");
  apple.href = "https://www.stonetekk.in/comingsoon?platform=AppStore";

  const google = footerDoc.getElementById("google");
  google.href = "https://www.stonetekk.in/comingsoon?platform=GooglePlay";

  const contact = footerDoc.getElementById("contact");
  contact.href = "https://www.stonetekk.in/contact";

  const privacy = footerDoc.getElementById("privacy");
  privacy.href = "https://www.stonetekk.in/policy";

  const terms = footerDoc.getElementById("terms");
  terms.href = "https://www.stonetekk.in/terms";


  const footer = dom.serialize();
  return footer;
};
const sendMail = async (mailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    transporter.verify((error, success) => {
      if (error) {
        console.log('SMTP Error:', error);
      } else {
        console.log('SMTP Server Ready:', success);
      }
    });
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(error.message || 'Failed to send email');
  }
};

/**
 * Controller to handle sending emails.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} - The response object with status and message.
 */
export const sendEmailController = async (req, res) => {
  const { to, subject } = req.body;

  // Validate input
  if (!to || !subject) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: 'to' and/or 'subject'"
    });
  }

  try {
    // Read and customize email template
    const emailPath = path.join(srcPath, 'utils', 'emails', 'email.html');
    const htmlContent = fs.readFileSync(emailPath, 'utf8');
    const dom = new JSDOM(htmlContent, { resources: "usable" });
    const customizeHtml = dom.serialize();
    const customizedFooter = customizeFooter(to); // Assuming customizeFooter is a valid function

    // Prepare mail options
    const mailOptions = {
      from: NODEMAILER_EMAIL,
      bcc: to,
      subject: subject,
      html: customizeHtml + customizedFooter,
      attachments: [
        {
          filename: "stonetekk.png",
          path: path.join(srcPath, "static", "images", "stonetekk.png"),
          cid: "logo",
        },
        {
          filename: "Slap.png",
          path: path.join(srcPath, "static", "images", "Slap.png"),
          cid: "slap",
        },
        {
          filename: "twitter.png",
          path: path.join(srcPath, "static", "images", "twitter.png"),
          cid: "twitter",
        },
        {
          filename: "instagram.png",
          path: path.join(srcPath, "static", "images", "instagram.png"),
          cid: "instagram",
        },
        {
          filename: "linkedin.png",
          path: path.join(srcPath, "static", "images", "linkedin.png"),
          cid: "linkedin",
        },
        {
          filename: "cybtekk.png",
          path: path.join(srcPath, "static", "images", "cybtekk.png"),
          cid: "cybtekk",
        },
        {
          filename: "apple.png",
          path: path.join(srcPath, "static", "images", "apple.png"),
          cid: "apple",
        },
        {
          filename: "google.png",
          path: path.join(srcPath, "static", "images", "google.png"),
          cid: "google",
        },
      ],
    };

    // Send email
    const result = await sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      details: result.info,
    });

  } catch (error) {
    console.error("Failed to send email:", error.message);

    return res.status(500).json({
      success: false,
      error: "Failed to send email",
      details: error.message,
    });
  }
};

export const testApi = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
      user: NODEMAILER_EMAIL,
      pass: NODEMAILER_PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });
  return res.status(200).json({ "body": req.body, })
} 