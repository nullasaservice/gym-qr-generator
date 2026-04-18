require('dotenv').config();

const express = require('express');
const basicAuth = require('./auth');

const pages = require('./routes/pages');
const qrRoutes = require('./routes/qr');

const app = express();

// 🔐 protect everything
app.use(basicAuth);

// routes
app.use('/', pages);
app.use('/', qrRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});