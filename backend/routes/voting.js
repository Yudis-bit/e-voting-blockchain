// backend/routes/voting.js
const express = require('express');
const router = express.Router();
const { web3, election } = require('../config/web3Config');
const pool = require('../config/dbConfig'); // Assuming you're using PostgreSQL

// Check if user has voted
router.get('/hasVoted/:address', async (req, res) => {
    const { address } = req.params;
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM voters WHERE address = $1', [address]);
        if (result.rows.length > 0) {
            res.json({ hasVoted: true });
        } else {
            res.json({ hasVoted: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    } finally {
        client.release();
    }
});

// Store voting information
router.post('/vote', async (req, res) => {
    const { voterAddress, candidateId } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query(
            'INSERT INTO voters (address, candidate_id) VALUES ($1, $2)',
            [voterAddress, candidateId]
        );
        res.status(200).send('Vote recorded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    } finally {
        client.release();
    }
});

module.exports = router;
