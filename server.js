import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import connectDB, { isMongoDBConnected } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route Imports
import adminRoutes from './routes/adminRoutes.js';
import siteContentRoutes from './routes/siteContentRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import mapRoutes from './routes/mapRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Setup Socket.io for optional persistent WebSocket deployment
const allowedOrigin = process.env.CLIENT_URL || '*';
const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
  },
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected to Socket.io:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected from Socket.io:', socket.id);
  });
});

// Middleware to attempt DB connection per request (Vercel Serverless optimization)
app.use(async (req, res, next) => {
  try {
    if (process.env.MONGO_URI) {
      await connectDB();
    }
  } catch (error) {
    console.warn('DB connection attempt warning:', error.message);
  }
  next();
});

// Health check endpoint
app.get(['/api/health', '/health'], (req, res) => {
  const dbConnected = isMongoDBConnected();
  res.json({
    status: 'ok',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      connected: dbConnected,
      mode: dbConnected ? 'MongoDB Atlas' : 'Local File Storage',
      message: dbConnected
        ? 'MongoDB Atlas is connected and active.'
        : 'MongoDB is offline. Running in persistent fallback mode.',
    },
  });
});

// API Routes - Supports both /api/* and /* paths seamlessly
app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);

app.use('/api', siteContentRoutes);
app.use('/', siteContentRoutes);

app.use('/api', bannerRoutes);
app.use('/', bannerRoutes);

app.use('/api', teamRoutes);
app.use('/', teamRoutes);

app.use('/api', mapRoutes);
app.use('/', mapRoutes);

app.use('/api', enquiryRoutes);
app.use('/', enquiryRoutes);

app.use('/api', notificationRoutes);
app.use('/', notificationRoutes);

app.use('/api', uploadRoutes);
app.use('/', uploadRoutes);

app.use('/api', serviceRoutes);
app.use('/', serviceRoutes);

app.use('/api', blogRoutes);
app.use('/', blogRoutes);

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`🚀 Labradorite Motto Server running on port ${PORT}`);
  });
}

export default app;
