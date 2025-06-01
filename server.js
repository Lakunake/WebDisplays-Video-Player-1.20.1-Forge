// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files and /videos folder
app.use(express.static(__dirname));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// Global video state
let currentVideoState = {
  type: 'seek',
  time: 1555  // default start time (25:55)
};

// User tracking (no IPs, no coloring)
let userCounter = 0;
const users = {};

function generateUserID() {
  return String(++userCounter).padStart(3, '0');
}

io.on('connection', socket => {
  const userID = generateUserID();
  users[userID] = { id: userID };

  console.log(`User (${userID}) connected`);

  // Send current video state and assigned ID to client
  socket.emit('video-event', currentVideoState);
  socket.emit('user-assigned', { id: userID });

  // Relay any video-event to everyone else
  socket.on('video-event', data => {
    console.log(`Video event from ${userID}: ${data.type} @ ${data.time}`);
    currentVideoState = data;
    socket.broadcast.emit('video-event', data);
  });

  socket.on('disconnect', () => {
    console.log(`User (${userID}) disconnected`);
    delete users[userID];
  });
});

// Read port from config.txt if present
let PORT = 3000;
try {
  const raw = fs.readFileSync('config.txt', 'utf-8');
  const config = Object.fromEntries(
    raw
      .split(/\r?\n/)
      .filter(line => line && !line.startsWith('#'))
      .map(line => line.split('='))
  );
  if (config.port) {
    PORT = parseInt(config.port);
  }
} catch (e) {
  console.log('No config.txt found or malformed. Using default port 3000.');
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
