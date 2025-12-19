const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

const db = mysql.createPool({
  host: '10.10.10.20',
  user: 'authuser',
  password: 'StrongPassword123!',
  database: 'authdb'
});

app.post('/login', async (req, res) => {
  const { email, password, token } = req.body;

  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (rows.length === 0) return res.sendStatus(401);

  const user = rows[0];

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.sendStatus(401);

  // ===========================
  // ADDITION: ENFORCE MANDATORY 2FA
  // ===========================
  if (!user.twofa_secret) {
    return res.status(403).json({ message: '2FA not configured for this account' });
  }

  const verified = speakeasy.totp.verify({
    secret: user.twofa_secret,
    encoding: 'base32',
    token,
    window: 1
  });

  if (!verified) return res.sendStatus(403);

  // ===========================
  // ORIGINAL JWT ISSUANCE
  // ===========================
  const jwtToken = jwt.sign(
    { id: user.id },
    'SUPER_SECRET_KEY',
    { expiresIn: '1h' }
  );

  res.json({ token: jwtToken });
});

app.listen(4000, () => {
  console.log('Auth service running on port 4000');
});
