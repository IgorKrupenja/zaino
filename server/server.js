const path = require('path');
const express = require('express');
const app = express();
const distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is up!');
});
