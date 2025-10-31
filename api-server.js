const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import API routes
const registerRoute = require('./app/api/register.ts');
const registrationsRoute = require('./app/api/registrations.ts');
const ticketRoute = require('./app/api/ticket/[ticketId].ts');
const attendeesRoute = require('./app/api/attendees/[attendeeId].ts');

// Use API routes
app.use('/register', registerRoute);
app.use('/registrations', registrationsRoute);
app.use('/ticket', ticketRoute);
app.use('/attendees', attendeesRoute);

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});