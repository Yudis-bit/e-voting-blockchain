const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const kycRoutes = require('./routes/kyc');
const votingRoutes = require('./routes/voting');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/kyc', kycRoutes);  // Pastikan rute ini ada
app.use('/voting', votingRoutes);

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
