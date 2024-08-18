const express = require('express');
const router = express.Router();
const multer = require('multer');
const pool = require('../config/dbConfig');
const fs = require('fs');
const path = require('path');

// Pastikan direktori uploads ada
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log(`Directory 'uploads' created.`);
}

// Konfigurasi Multer untuk menyimpan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Pastikan path di sini sesuai
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Rute untuk menangani upload KYC
router.post('/upload', upload.single('file'), async (req, res) => {
    const client = await pool.connect();
    try {
        const { username } = req.body;
        let filePath = req.file.path;

        if (!username) {
            return res.status(400).send('Username is required');
        }

        // Ganti backslashes dengan forward slashes
        filePath = filePath.replace(/\\/g, "/");

        // Simpan informasi KYC ke database
        await client.query('INSERT INTO kyc_requests (username, document_path, status) VALUES ($1, $2, $3)', 
            [username, filePath, 'pending']);

        res.status(200).send('File uploaded successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    } finally {
        client.release();
    }
});

// Rute untuk mengambil semua permintaan KYC yang pending
router.get('/requests', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM kyc_requests WHERE status = $1', ['pending']);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching KYC requests:', error);
        res.status(500).send('Server error');
    } finally {
        client.release();
    }
});

// Rute untuk memverifikasi KYC
router.post('/verify', async (req, res) => {
    const { id } = req.body;
    const client = await pool.connect();
    try {
        await client.query('UPDATE kyc_requests SET status = $1 WHERE id = $2', ['verified', id]);
        res.status(200).send('KYC verified successfully!');
    } catch (error) {
        console.error('Error verifying KYC request:', error);
        res.status(500).send('Server error');
    } finally {
        client.release();
    }
});

// Rute untuk menolak KYC
router.post('/reject', async (req, res) => {
    const { id } = req.body;
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM kyc_requests WHERE id = $1', [id]);
        res.status(200).send('KYC rejected successfully!');
    } catch (error) {
        console.error('Error rejecting KYC request:', error);
        res.status(500).send('Server error');
    } finally {
        client.release();
    }
});

// Rute baru untuk mendapatkan status KYC berdasarkan username
router.get('/status/:username', async (req, res) => {
    const client = await pool.connect();
    const { username } = req.params;
    try {
        const result = await client.query('SELECT status FROM kyc_requests WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            res.json({ status: result.rows[0].status });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching KYC status:', error);
        res.status(500).send('Server error');
    } finally {
        client.release();
    }
});

// Serve static files (uploads folder)
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = router;
