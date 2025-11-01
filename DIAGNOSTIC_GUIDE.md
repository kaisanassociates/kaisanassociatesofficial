# 🔧 QR Scanning Diagnostic Guide

## Current Issue
**Error**: "Attendee ID is required" when scanning QR codes

## What I Just Added

### Enhanced Logging
I've added detailed console logging to help diagnose the issue:

**Frontend (Staff.tsx)**:
- 🔍 Shows full attendee object when found
- 🆔 Shows extracted attendeeId
- 🆔 Shows type of attendeeId
- 📡 Shows the exact API call being made

**Backend (server.cjs)**:
- Shows original URL, params, query, and body
- Shows query before and after setting attendeeId

**API Handler (app/api/attendees/[attendeeId].cjs)**:
- Shows full request details with separators
- Shows exactly what's in query, params, and body

## How to Diagnose

### Step 1: Restart Server
```powershell
# Stop current server (Ctrl+C)
npm run dev
```

### Step 2: Open Browser DevTools
- Press F12
- Go to Console tab
- Clear the console (trash icon)

### Step 3: Try Scanning
1. Go to http://localhost:8080/staff
2. Login with any staff key
3. Enter a QR code (e.g., `INFLUENCIA2025-6904c16ae5f7c2def4a40b4f`)
4. Click "Mark Attendance"

### Step 4: Check Console Logs

**In Browser Console**, you should see:
```
🔍 Attendee found: {_id: "...", name: "...", ...}
🆔 Extracted attendeeId: 6904c16ae5f7c2def4a40b4f
🆔 Type of attendeeId: string
📡 About to call PUT /api/attendees/6904c16ae5f7c2def4a40b4f
```

**In Server Terminal**, you should see:
```
========== PUT /api/attendees ==========
Original URL: /api/attendees/6904c16ae5f7c2def4a40b4f
Params: { attendeeId: '6904c16ae5f7c2def4a40b4f' }
Query after: { attendeeId: '6904c16ae5f7c2def4a40b4f' }
==========================================

========================================
Attendee handler - Method: PUT
Attendee handler - attendeeId: 6904c16ae5f7c2def4a40b4f
========================================
```

## Possible Issues & Solutions

### Issue 1: attendeeId is undefined in browser console
**Problem**: The registration data doesn't have `_id` or `id` field

**Solution**: Check the `/api/registrations` endpoint response
```javascript
// In browser console
fetch('/api/registrations', {
  headers: {'Authorization': 'Bearer admin123'}
}).then(r => r.json()).then(console.log)
```

Look for the `_id` field in the response. If it's missing or malformed, the issue is in `app/api/registrations.cjs`.

### Issue 2: attendeeId is an object
**Problem**: MongoDB ObjectId isn't being converted to string

**Solution**: Already handled in code with:
```javascript
if (typeof attendeeId === 'object' && attendeeId.$oid) {
  attendeeId = attendeeId.$oid;
}
```

If you see `Type of attendeeId: object`, check what the object looks like.

### Issue 3: Server doesn't show PUT request
**Problem**: The request isn't reaching the Express server

**Check**:
1. Vite dev server running on port 8080? ✓
2. Express server running on port 3000? ✓
3. Vite proxy configured? ✓

**Solution**: Check Network tab in DevTools:
- URL should be: `http://localhost:8080/api/attendees/...`
- Status should NOT be 404
- If 404, the Vite proxy isn't working

### Issue 4: Server shows params but query is empty
**Problem**: The route handler isn't setting `req.query` properly

**Solution**: Check server.cjs has:
```javascript
req.query = { ...req.query, attendeeId: req.params.attendeeId };
```

This should set `attendeeId` before calling the handler.

## Quick Test

### Test 1: Get Registrations
```javascript
// In browser console
fetch('/api/registrations', {
  headers: {'Authorization': 'Bearer admin123'}
})
  .then(r => r.json())
  .then(data => {
    console.log('First registration:', data.data[0]);
    console.log('Has _id?', !!data.data[0]._id);
    console.log('Has id?', !!data.data[0].id);
  });
```

### Test 2: Manual API Call
```javascript
// Replace with actual ID from test 1
const testId = '6904c16ae5f7c2def4a40b4f';

fetch(`/api/attendees/${testId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer admin123'
  },
  body: JSON.stringify({
    attended: true,
    checkInTime: new Date().toISOString()
  })
})
  .then(r => r.json())
  .then(console.log);
```

If this works, the issue is in the Staff.tsx QR code handling.
If this fails, the issue is in the server route or handler.

## Camera Issue

**Error**: "HTML Element with id=qr-reader not found"

**Cause**: The camera mode is trying to initialize before the DOM element exists.

**Solution**: Make sure the `<div id="qr-reader">` exists in the JSX when `scanMode === 'camera'`.

Check Staff.tsx around line 200-250 for:
```tsx
{scanMode === 'camera' && (
  <div id="qr-reader" className="w-full max-w-md mx-auto"></div>
)}
```

## Next Steps

1. **Restart server** with logging enabled
2. **Try scanning** a QR code
3. **Copy ALL console output** (both browser and server)
4. **Share the logs** so we can see exactly where it's failing

The detailed logging will show us:
- ✅ Is the attendee found in the database?
- ✅ Is the ID being extracted correctly?
- ✅ Is the API call being made with the right URL?
- ✅ Is the server receiving the request?
- ✅ Is the query parameter being set?
- ✅ Is the handler receiving the attendeeId?

This will pinpoint the exact failure point!
