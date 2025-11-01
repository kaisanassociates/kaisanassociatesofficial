# 🔧 Troubleshooting Guide - Quick Fixes

## Issues Fixed

### 1. Vite Proxy Configuration ✅
**Problem**: API calls were being rewritten incorrectly  
**Fix**: Updated `vite.config.ts` to properly proxy `/api/*` requests to Express server

**You need to restart the dev server for this to take effect:**
```powershell
# Stop current server (Ctrl+C in terminal)
npm run dev
```

---

## Testing Each Feature

### Test 1: Admin Login

**Steps:**
1. Go to: http://localhost:8080/admin
2. Enter: `admin123`
3. Click "Login"

**Expected Result**: Dashboard with all registrations

**If it fails:**
- Open browser console (F12)
- Check Network tab
- Look for `/api/registrations` request
- Should return 200 status with data

---

### Test 2: Ticket Access (E-Pass Retrieval)

**Steps:**
1. Go to: http://localhost:8080/ticket-access
2. Enter an email you registered with
3. Enter the date of birth you used
4. Click "Access E-Pass"

**Expected Result**: Redirect to ticket page

**If it fails:**
- Check browser console for errors
- Verify the email and DOB match a registration
- Check Network tab for `/api/registrations` request

---

### Test 3: Ticket Verification

**Current Implementation**: Tickets are displayed from localStorage after registration

**To test:**
1. Complete a registration
2. You'll be redirected to `/ticket` automatically
3. Your ticket should display with QR code

**If ticket doesn't show:**
- Check browser console
- Open DevTools → Application → Local Storage
- Look for key `attendee`
- Should have your registration data

---

## Quick API Tests

### Test Admin Endpoint
```powershell
# Open PowerShell and run:
curl http://localhost:3000/api/registrations -H "Authorization: Bearer admin123"
```

**Expected**: JSON with all registrations

### Test Health Check
```powershell
curl http://localhost:3000/health
```

**Expected**: `{"status":"OK","timestamp":"...","mongodb":"configured"}`

### Test Registration Endpoint
```powershell
$body = @{
  fullName = "Test User"
  email = "test@test.com"
  contactNumber = "1234567890"
  business = "Test Co"
  designation = "CEO"
  experience = "5 years"
  sectors = @("Technology / IT")
  futurePlan = "Detailed 5-year plan with specific goals and objectives for business growth"
  dateOfBirth = "1990-01-01"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/register" -Method POST -Body $body -ContentType "application/json"
```

**Expected**: Success response with registration data

---

## Common Issues & Solutions

### Issue: "401 Unauthorized" on Admin Login
**Cause**: Authorization header not sent or incorrect  
**Fix**: Admin key must be exactly `admin123`  
**Check**: Browser console Network tab → Headers → Authorization

### Issue: "Failed to fetch registrations"
**Cause**: API server not running or CORS issue  
**Fix**: 
1. Verify server is running: `http://localhost:3000/health`
2. Restart dev server: `npm run dev`

### Issue: Ticket Access returns "No registration found"
**Cause**: Email/DOB don't match any registration  
**Fix**: 
1. Go to admin panel first
2. Check what registrations exist
3. Use exact email and DOB from registration

### Issue: Vite proxy not working
**Cause**: Old configuration cached  
**Fix**: 
1. Stop dev server (Ctrl+C)
2. Clear Vite cache: `rm -r node_modules/.vite`
3. Restart: `npm run dev`

---

## Restart Development Server

**IMPORTANT**: After the Vite config fix, you MUST restart:

```powershell
# In your terminal where dev server is running:
# 1. Press Ctrl+C to stop
# 2. Run again:
npm run dev
```

**Wait for both servers to start:**
```
✅ Local API Server running on http://localhost:3000
➜  Local:   http://localhost:8080/
```

---

## Verify Everything Works

After restarting, test in this order:

1. ✅ **Health Check**: http://localhost:3000/health
2. ✅ **Registration**: http://localhost:8080 → Register
3. ✅ **Ticket Display**: Should auto-redirect after registration
4. ✅ **Admin Login**: http://localhost:8080/admin → `admin123`
5. ✅ **Ticket Access**: http://localhost:8080/ticket-access → email + DOB

---

## Still Having Issues?

### Check Console Logs
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Check Network tab for failed requests

### Check Server Logs
Look at terminal where `npm run dev` is running:
- Should see "✅ MongoDB connected successfully"
- Should NOT see connection errors
- Should show API requests when you use the app

### Debug API Calls
In browser console, test directly:
```javascript
// Test admin endpoint
fetch('/api/registrations', {
  headers: { 'Authorization': 'Bearer admin123' }
}).then(r => r.json()).then(console.log)

// Test health
fetch('/health').then(r => r.json()).then(console.log)
```

---

## Emergency Reset

If nothing works:

```powershell
# Stop all servers
# Press Ctrl+C in terminals

# Clear caches
rm -r node_modules/.vite
rm -r dist

# Restart
npm run dev
```

---

**After restarting the dev server, everything should work!** 🚀
