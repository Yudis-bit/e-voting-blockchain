const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrasi Pengguna
router.post('/register', async (req, res) => {
    const { username, password, role = 'user' } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await pool.connect();
    try {
        await client.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [username, hashedPassword, role]);
        res.send('User registered');
    } finally {
        client.release();
    }
});

// Login Pengguna
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ username: username, role: user.role }, 'secretkey');
                res.json({ token, role: user.role });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(401).send('Invalid credentials');
        }
    } finally {
        client.release();
    }
});

module.exports = router;
