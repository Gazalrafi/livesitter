// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const overlayRoutes = require('./routes/overlayRoutes');
const dotenv=require('dotenv');
dotenv.config();
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: 'C:\\ffmpeg-2024-09-12-git-504c1ffcd8-full_build\\ffmpeg-2024-09-12-git-504c1ffcd8-full_build\\bin\\ffmpeg.exe', // Path to your FFmpeg binary
    tasks: [
      {
        app: 'live',
        vc: 'copy',
        ac: 'aac',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true
      }
    ]
  }
};

const nms = new NodeMediaServer(config);
nms.run();


const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from the frontend
  }));
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', overlayRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
