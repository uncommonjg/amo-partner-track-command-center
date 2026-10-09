const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CSP must allow unsafe-eval: dc-runtime uses new Function() to evaluate component scripts
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https:",
      "style-src 'self' 'unsafe-inline' https:",
      "font-src 'self' data: https:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https:",
    ].join('; ')
  );
  next();
});

app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`AMO Command Center running on port ${PORT}`);
});
