const express = require("express");
const { Resend } = require("resend");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const resend = new Resend(process.env.RESEND_API_KEY);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/send-email", async (req, res) => {
  const { email, body } = req.body;
  if (!email || !body) {
    return res.status(400).json({ message: "Email and body are required" });
  }
  try {
    const response = await resend.emails.send({
      from: "Yuvraj Bal <Hi@yuvrajbal.com>",
      to: email,
      subject: "Thank you for reaching out to Yuvraj",
      html: `<strong> Thank you for contacting me through my website , I am excited to work with you !</strong><p>Your message: ${body}</p>`,
    });
    res.status(200).json({
      message: "Email sent succesfully",
      response,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to send email", err });
  }
});

app.listen(port, () => {
  console.log("server is listening on port", port);
});
