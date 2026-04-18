require('dotenv').config({ path: '../.env' });

function basicAuth(req, res, next) {
  const auth = req.headers.authorization;
  console.log("trying to authenticate")

  if (!auth) {
    res.setHeader('WWW-Authenticate', 'Basic realm="QR App"');
    return res.status(401).send('Authentication required');
  }

  const base64 = auth.split(' ')[1];
  const [user, pass] = Buffer.from(base64, 'base64')
    .toString()
    .split(':');

  if (
    user === process.env.BASIC_USER &&
    pass === process.env.BASIC_PASS
  ) {
    console.log("successful auth")
    return next();
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="QR App"');
  return res.status(401).send('Invalid credentials');
}

module.exports = basicAuth;