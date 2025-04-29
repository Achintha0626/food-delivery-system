// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// configure your SMTP transport (here: Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your gmail address
    pass: process.env.EMAIL_PASS, // app-specific password
  },
});

// POST /api/orders
app.post("/api/orders", async (req, res) => {
  try {
    const { email, restName, orderItems, total, address } = req.body;

    // 1) TODO: Save order to your database here...

    // 2) Send confirmation email
    const itemsHtml = orderItems
      .map(
        (i) =>
          `<li>${i.name} × ${i.quantity} — Rs. ${(i.price * i.quantity).toFixed(
            2
          )}</li>`
      )
      .join("");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Order Confirmation — ${restName}`,
      html: `
        <h2>Thanks for your order at ${restName}!</h2>
        <p><strong>Delivery Address:</strong> ${address}</p>
        <p><strong>Order Summary:</strong></p>
        <ul>${itemsHtml}</ul>
        <p><strong>Total:</strong> Rs. ${total.toFixed(2)}</p>
        <p>We’ll dispatch your food shortly. Enjoy!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Order placed and email sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to place order." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
