const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static and video files
app.use(express.static(__dirname));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// Store the current video state globally (if needed)
let currentVideoState = {
  type: 'seek', // Default event type
  time: 1555    // Default video start time (25:55)
};

// When a client connects, send them the current state
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the current video state to the new client
  socket.emit('video-event', currentVideoState);

  // Listen for video events and broadcast to other clients
  socket.on('video-event', (data) => {
    console.log(`Video event received: ${data.type} at ${data.time}`);
    
    // Update the global state
    currentVideoState = data;

    // Broadcast the event to all other clients (excluding the sender)
    socket.broadcast.emit('video-event', data);
  });

  // When a client disconnects, log it
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Server listening on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
