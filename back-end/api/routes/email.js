const express = require('express');

const router = express.Router();


const nodemailer = require("nodemailer");

router.post("/", (req, res) => {
    console.log('boooody',req.body)
  const transport = {
    service: "gmail",
    auth: {
      user: "prefab.houses.lb@gmail.com",
      pass: "Pass4prefab"
    }
  };

  const transporter = nodemailer.createTransport(transport);
  const option = {
    from: `${req.body.name} : ${req.body.email}`, // sender address
    to: "basharfrancis16@gmail.com", // list of receivers
    subject: `${req.body.subject}`, // Subject line
    html: `<h3>Message content</h3>
    <ul>
    <li>Name :${req.body.name}</li>
    <li>Email :${req.body.email}</li>
    <li>Subject :${req.body.subject}</li>
    
          </ul>
           <h3>Message</h3>
    <p>${req.body.message}</p>` // plain text body
  };

  transporter.sendMail(option, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
});

module.exports = router;