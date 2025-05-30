// Nodemailer 2FA feature
const nodemailer = require('nodemailer');
const {authenticator} = require('otplib');
authenticator.options = { digits: 6, step: 300 }; // Set the OTP to be 6 digits and valid for 5 minutes
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', //Replace with your chosen email service
    auth: {
        user: process.env.EMAIL_USER, // Replace with your email
        pass: process.env.EMAIL_PASS // Replace with your email password or app password
         
        }
    });
const generateSecret = () => {
  const secret = authenticator.generateSecret();
  return secret;
}
const generateToken = (secret) => {
  const token = authenticator.generate(secret);
  return token;
}
const sendEmail = (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your 2FA Token',
    text: `Your 2FA token is ${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
const verifyToken = (token, secret) => {
  const isValid = authenticator.check(token, secret);
  return isValid;
}

loginBtn.addEventListener('click', () => {
  const email = document.getElementById('loginEmail').value;

  if (!email) {
    alert('Please enter your email address.');
    return;
  }

  // Step 1: Generate a secret
  const secret = generateSecret();

  // Step 2: Generate a TOTP using the secret
  const token = generateToken(secret);

  // Step 3: Send the TOTP to the user's email
  sendEmail(email, token);

  // Inform the user
  alert('A 2FA token has been sent to your email. Please check your inbox.');
});
