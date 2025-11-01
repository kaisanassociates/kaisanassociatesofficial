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
  console.log('\n========== PUT /api/attendees ==========');
  console.log('Original URL:', req.originalUrl);
  console.log('URL:', req.url);
  console.log('Params:', req.params);
  console.log('Query before:', req.query);
  console.log('Body:', req.body);
  
  // Set the query parameter from the URL param
  req.query = { ...req.query, attendeeId: req.params.attendeeId };
  
  console.log('Query after:', req.query);
  console.log('==========================================\n');
  
  attendeesHandler(req, res);
});

app.delete('/api/attendees/:attendeeId', (req, res, next) => {
  console.log('\n========== DELETE /api/attendees ==========');
  console.log('Params:', req.params);
  req.query = { ...req.query, attendeeId: req.params.attendeeId };
  console.log('==========================================\n');
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