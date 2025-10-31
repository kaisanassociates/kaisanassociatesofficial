const express = require('express');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/register', require('./app/api/register.ts'));
app.use('/api/registrations', require('./app/api/registrations.ts'));
app.use('/api/ticket', require('./app/api/ticket/[ticketId].ts'));
app.use('/api/attendees', require('./app/api/attendees/[attendeeId].ts'));

// Serve static files from dist (production build)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Development proxy
if (process.env.NODE_ENV === 'development') {
  app.use('/', createProxyMiddleware({
    target: 'http://localhost:5173',
    changeOrigin: true,
  }));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});