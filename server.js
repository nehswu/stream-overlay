const express = require('express');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');
const path = require('path');

// Serve static files
const rootPath = path.join(__dirname);
console.log(`Serving static files from: ${rootPath}`);
app.use(express.static(rootPath));

// WebSocket setup
const wss = new WebSocket.Server({ server: http });

wss.on('connection', (socket) => {
    console.log('WebSocket client connected');
});

// POST endpoint to trigger overlays
app.post('/trigger', express.json(), (req, res) => {
    const data = req.body;
    console.log('Received trigger:', data);

    // Broadcast message to all clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });

    res.send('Trigger broadcasted');
});

// Start server
const PORT = 3000;
http.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});