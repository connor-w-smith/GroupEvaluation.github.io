const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to the database
const db = new sqlite3.Database('./groupevaluation.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database: groupevaluation.db');
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