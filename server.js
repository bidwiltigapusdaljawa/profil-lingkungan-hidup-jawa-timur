import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const prototypeFile = path.join(__dirname, 'prototype', 'peta-lingkungan-jatim-v0.5.html');
const publicDir = path.join(__dirname, 'public');

// Serve static assets from public folder if present
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

// Serve files from prototype directory
app.use('/prototype', express.static(path.join(__dirname, 'prototype')));

// Root route and fallback serves the main HTML prototype
app.get('*', (req, res) => {
  const publicIndex = path.join(publicDir, 'index.html');
  const rootIndex = path.join(__dirname, 'index.html');
  if (fs.existsSync(publicIndex)) {
    res.sendFile(publicIndex);
  } else if (fs.existsSync(rootIndex)) {
    res.sendFile(rootIndex);
  } else if (fs.existsSync(prototypeFile)) {
    res.sendFile(prototypeFile);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
