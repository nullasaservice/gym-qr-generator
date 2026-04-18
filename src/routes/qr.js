const express = require('express');
const { exec } = require('child_process');
const QRCode = require('qrcode');

const router = express.Router();

router.get('/api/qr', (req, res) => {
  exec('echo "Hello-from-server-$(date +%s)"', async (err, stdout) => {
    if (err) {
      return res.status(500).send('Error generating QR');
    }

    const qrText = stdout.trim();
    const qrImage = await QRCode.toDataURL(qrText);

    res.json({ qrImage });
  });
});

module.exports = router;