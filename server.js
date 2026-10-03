const https = require('https');
const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/status', (req, res) => {
  const hasCertificates = fs.existsSync(path.join(__dirname, 'ssl', 'cert.pem')) && fs.existsSync(path.join(__dirname, 'ssl', 'key.pem'));

  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    secure: hasCertificates,
    features: ['webcam-streaming', 'dual-stream', 'local-preview']
  });
});

app.get('/api/cameras', async (req, res) => {
  try {
    const deviceList = [];
    const cameraNames = ['Camera 1', 'Camera 2'];
    for (let i = 0; i < 2; i += 1) {
      deviceList.push({ id: i + 1, name: cameraNames[i], status: 'available' });
    }
    res.json({ cameras: deviceList });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch camera metadata' });
  }
});

app.get('/stream/:cameraId', (req, res) => {
  res.json({
    message: 'Stream endpoint for camera ' + req.params.cameraId,
    info: 'WebRTC or MJPEG stream would be served here.'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const certPath = path.join(__dirname, 'ssl', 'cert.pem');
const keyPath = path.join(__dirname, 'ssl', 'key.pem');

let httpsOptions = {};

if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  httpsOptions = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
  };
  console.log('✓ SSL certificates found');
} else {
  console.warn('⚠️  SSL certificates not found. Starting in local HTTP mode so the webcam UI still works on localhost.');
  console.warn('Generate them with:');
  console.warn('mkdir -p ssl && openssl req -x509 -newkey rsa:2048 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes');
}

const PORT = process.env.PORT || 3000;

if (Object.keys(httpsOptions).length > 0) {
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('');
    console.log('╔════════════════════════════════════════╗');
    console.log('║   🎥 DualStream HTTPS Server Started   ║');
    console.log('╚════════════════════════════════════════╝');
    console.log('');
    console.log(`🔒 Secure HTTPS: https://localhost:${PORT}`);
    console.log(`📊 Status API:   https://localhost:${PORT}/api/status`);
    console.log(`📹 Cameras API:  https://localhost:${PORT}/api/cameras`);
    console.log('');
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════╗');
    console.log('║   🎥 DualStream Local Server Started    ║');
    console.log('╚══════════════════════════════════════════╝');
    console.log('');
    console.log(`🌐 Local HTTP: http://localhost:${PORT}`);
    console.log(`📊 Status API: http://localhost:${PORT}/api/status`);
    console.log(`📹 Cameras API: http://localhost:${PORT}/api/cameras`);
    console.log('');
  });
}
