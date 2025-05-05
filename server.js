const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
// Nodemailer 2FA feature
const nodemailer = require('nodemailer');
const {authenticator} = require('otplib');
authenticator.options = { digits: 6, step: 300 }; // Set the OTP to be 6 digits and valid for 5 minutes
require('dotenv').config();

//Nodemailer 2FA feature
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

//end nodemailer

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());



app.use(express.json());
app.use(cors())
// Connect to the database
const db = new sqlite3.Database('./groupevaluation.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database: groupevaluation.db');
  }
});

//create tblUsers if it doesn't exist:
db.run(`
    CREATE TABLE IF NOT EXISTS tblUsers (
      UserID INTEGER PRIMARY KEY AUTOINCREMENT,
      FirstName TEXT,
      LastName TEXT,
      Email TEXT UNIQUE,
      Password TEXT,
      CreationDateTime TEXT,
      LastLoginDateTime TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating tblUsers table:', err.message);
    } else {
      console.log('tblUsers table ensured.');
    }
  });
// Register a new user
app.post('/register', async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  if (!FirstName || !LastName || !Email || !Password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    const query = `
      INSERT INTO tblUsers (FirstName, LastName, Email, Password, CreationDateTime)
      VALUES (?, ?, ?, ?, datetime('now'))
    `;
    db.run(query, [FirstName, LastName, Email, hashedPassword], function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'User registered successfully', UserID: this.lastID });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error hashing password' });
  }
});

// Login a user
app.post('/login', (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ error: 'Email and Password are required' });
  }

  const query = `SELECT * FROM tblUsers WHERE Email = ?`;
  db.get(query, [Email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    try {
      // Compare the hashed password
      const isMatch = await bcrypt.compare(Password, user.Password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
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

      res.json({ message: 'Login successful', UserID: user.UserID });
    } catch (err) {
      res.status(500).json({ error: 'Error validating password' });
    }
  });
});

// Fetch all users
app.get('/users', (req, res) => {
  const query = `SELECT UserID, FirstName, LastName, Email, CreationDateTime, LastLoginDateTime FROM tblUsers`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//ADDED THIS USER TO THE DB FOR TESTING:
// fetch('http://localhost:3000/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       FirstName: 'John',
//       LastName: 'Doe',
//       Email: 'john.doe@example.com',
//       Password: 'password123',
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.error('Error:', error));