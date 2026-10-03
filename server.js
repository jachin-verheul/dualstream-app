const https = require('https');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    secure: true,
    features: ['webcam-streaming', 'dual-stream', 'mjpeg']
  });
});

app.get('/api/cameras', (req, res) => {
  res.json({
    cameras: [
      { id: 1, name: 'Camera 1', status: 'available' },
      { id: 2, name: 'Camera 2', status: 'available' }
    ]
  });
});

// Placeholder for camera stream endpoints
app.get('/stream/:cameraId', (req, res) => {
  res.json({
    message: 'Stream endpoint for camera ' + req.params.cameraId,
    info: 'WebRTC or MJPEG stream would be served here'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Check for SSL certificates
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
  console.warn('⚠️  SSL certificates not found.');
  console.warn('Generate them with:');
  console.warn('mkdir -p ssl && openssl req -x509 -newkey rsa:2048 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes');
}

const PORT = process.env.PORT || 3000;

// Start HTTPS server if certificates exist
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
  console.error('❌ Cannot start server without SSL certificates.');
  process.exit(1);
}
