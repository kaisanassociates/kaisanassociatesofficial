const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import API route handlers from app/api/ directory (CommonJS versions)
const registerHandler = require('./app/api/register.cjs');
const registrationsHandler = require('./app/api/registrations.cjs');
const attendeesHandler = require('./app/api/attendees/[attendeeId].cjs');
const ticketHandler = require('./app/api/ticket/[ticketId].cjs');

// API Routes - matching Vercel structure
app.post('/api/register', registerHandler);
app.get('/api/registrations', registrationsHandler);

// Attendee routes - support both PUT and DELETE
app.put('/api/attendees/:attendeeId', (req, res, next) => {
  console.log('PUT /api/attendees - params:', req.params);
  console.log('PUT /api/attendees - query before:', req.query);
  req.query = { ...req.query, attendeeId: req.params.attendeeId };
  console.log('PUT /api/attendees - query after:', req.query);
  attendeesHandler(req, res);
});

app.delete('/api/attendees/:attendeeId', (req, res, next) => {
  console.log('DELETE /api/attendees - params:', req.params);
  req.query = { ...req.query, attendeeId: req.params.attendeeId };
  attendeesHandler(req, res);
});

app.get('/api/ticket/:ticketId', (req, res) => {
  req.query = { ...req.query, ticketId: req.params.ticketId };
  ticketHandler(req, res);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mongodb: process.env.MONGODB_URI ? 'configured' : 'not configured'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Local API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🗄️  MongoDB: ${process.env.MONGODB_URI ? 'Connected' : 'Not configured'}`);
});