const express = require('express');
const { exec } = require('child_process');
const QRCode = require('qrcode');

const router = express.Router();

router.get('/api/qr', (_, res) => {
  exec(process.env.QR_COMMAND, async (err, stdout) => {
    if (err) {
        return res.status(500).send('Error generating QR');
    }

    const qrText = stdout.trim();

    const qrSvg = await QRCode.toString(qrText, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 2
    });

    res.json({ qrSvg, rotationTime: process.env.QR_INTERVAL });
  });
});

module.exports = router;