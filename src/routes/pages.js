const express = require('express');
const path = require('path');

const router = express.Router();

const publicPath = path.join(__dirname, '../../public');

router.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

router.get('/qr', (req, res) => {
  res.sendFile(path.join(publicPath, 'qr.html'));
});

module.exports = router;