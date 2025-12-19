const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const cors = require('cors');

const app = express();

/* ---------- Middleware ---------- */
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

/* ---------- Database ---------- */
const db = mysql.createPool({
  host: '10.10.10.20',
  user: 'authuser',
  password: 'StrongPassword123!',
  database: 'authdb'
});

/* ---------- LOGIN ---------- */
app.post('/login', async (req, res) => {
  const { email, password, token } = req.body;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) return res.sendStatus(401);

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.sendStatus(401);

    const verified = speakeasy.totp.verify({
      secret: user.twofa_secret,
      encoding: 'base32',
      token
    });

    if (!verified) return res.sendStatus(403);

    const jwtToken = jwt.sign(
      { id: user.id },
      'SUPER_SECRET_KEY',
      { expiresIn: '1h' }
    );

    res.json({ token: jwtToken });

  } catch (err) {
    console.error('Login error:', err);
    res.sendStatus(500);
  }
});

/* ---------- REGISTER ---------- */
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Generate 2FA secret
    const secret = speakeasy.generateSecret();

    // Insert user
    await db.execute(
      'INSERT INTO users (email, password, twofa_secret) VALUES (?, ?, ?)',
      [email, hashed, secret.base32]
    );

    // Generate QR code
    const qr = await QRCode.toDataURL(secret.otpauth_url);

    res.status(201).json({ qr });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

/* ---------- SERVER ---------- */
app.listen(4000, '0.0.0.0', () => {
  console.log('Auth service running on port 4000');
});
