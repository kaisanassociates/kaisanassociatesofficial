# 🔑 Application Access Credentials & Usage Guide

## ✅ Current Status
- **MongoDB Atlas**: ✅ Connected
- **Local Server**: http://localhost:3000
- **Frontend**: http://localhost:8080
- **Admin Key**: `admin123`

---

## 🎫 User Flow (Registration → Ticket)

### 1. Register as Attendee
1. Go to: http://localhost:8080
2. Click: **"Register Now"** button
3. Fill out the **3-step form**:
   - **Step 1**: Personal Information (name, email, phone, DOB)
   - **Step 2**: Professional Information (designation, business, sectors)
   - **Step 3**: Additional Information (achievements, 5-year plan)
4. Click: **"Complete Registration"**
5. ✅ **Auto-redirect to Ticket page** with QR code

### 2. View Your Ticket
- After registration, you're automatically redirected to `/ticket`
- Your ticket is stored in browser's `localStorage`
- Displays:
  - Your full details
  - QR code for venue check-in
  - Registration status
  - Event details
- Click **"Download / Print E-Pass"** to save

### 3. Access Ticket Later
If you close the browser and need your ticket:
1. Go to: http://localhost:8080/ticket-access
2. Enter your **email** or **ticket ID**
3. View your ticket again

---

## 👨‍💼 Admin Panel Access

### Login to Admin Dashboard
1. Go to: http://localhost:8080/admin
2. Enter admin key: **`admin123`**
3. Click: **"Login"**

### Admin Features
- ✅ **View all registrations** in a table
- ✅ **Search** by name, email, or phone
- ✅ **Mark attendance** (check-in attendees)
- ✅ **Delete registrations**
- ✅ **Dashboard stats**: Total, Attended, Pending

### Admin Actions
- **Mark Attended**: Click green ✓ icon → Marks check-in time
- **Unmark Attended**: Click yellow ✗ icon → Removes attendance
- **Delete**: Click red trash icon → Soft deletes registration

---

## 🔐 Authentication Details

### Admin Key
**Current Key**: `admin123`

**Where it's used**:
- Frontend: `src/pages/Admin.tsx` (line 25)
- Backend Local: `app/api/registrations.cjs` (line 60)
- Backend Local: `app/api/attendees/[attendeeId].cjs` (line 54)
- Backend Vercel: `api/registrations.ts` (line 64)

**How it works**:
```javascript
// Frontend sends
Authorization: Bearer admin123

// Backend checks
if (authHeader !== 'Bearer admin123') {
  return 401 Unauthorized
}
```

---

## 🎯 API Endpoints

### Public Endpoints
| Endpoint | Method | Purpose | Body |
|----------|--------|---------|------|
| `/api/register` | POST | Create registration | Form data (name, email, etc.) |
| `/api/ticket/:id` | GET | Get ticket by ID | - |

### Admin Endpoints (Require `Authorization: Bearer admin123`)
| Endpoint | Method | Purpose | Body |
|----------|--------|---------|------|
| `/api/registrations` | GET | Get all registrations | - |
| `/api/attendees/:id` | PUT | Update attendance/delete | `{ action: 'toggle_attendance' \| 'delete' }` |

### Health Check
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Check server & DB status |

---

## 🧪 Testing Checklist

### ✅ Registration Flow
- [ ] Form validation works (required fields, email format)
- [ ] Multi-step navigation (Next/Previous buttons)
- [ ] Sector selection (checkbox with "Others" input)
- [ ] Successful submission shows success toast
- [ ] Auto-redirect to ticket page
- [ ] QR code displays correctly
- [ ] Data appears in MongoDB Atlas

### ✅ Ticket Display
- [ ] Ticket loads from localStorage
- [ ] All attendee details display correctly
- [ ] QR code is scannable
- [ ] Download/Print button works
- [ ] Redirects to `/ticket-access` if no data

### ✅ Admin Panel
- [ ] Login with `admin123` works
- [ ] All registrations display in table
- [ ] Search filters results
- [ ] Dashboard stats are accurate
- [ ] Mark attendance updates status
- [ ] Delete removes registration
- [ ] Responsive design on mobile

---

## 🚀 Quick Test Commands

### Test Health Check
```powershell
curl http://localhost:3000/health
```

**Expected output**:
```json
{
  "status": "OK",
  "timestamp": "2025-10-31T...",
  "mongodb": "configured"
}
```

### Test Registration (PowerShell)
```powershell
$body = @{
  fullName = "Test User"
  email = "test@example.com"
  contactNumber = "1234567890"
  business = "Test Company"
  designation = "CEO"
  experience = "5 years"
  sectors = @("Technology / IT")
  futurePlan = "This is a detailed 5-year plan with specific goals and objectives for business growth and expansion"
  dateOfBirth = "1990-01-01"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/register" -Method POST -Body $body -ContentType "application/json"
```

### Test Admin Endpoint (PowerShell)
```powershell
$headers = @{
  "Authorization" = "Bearer admin123"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/registrations" -Method GET -Headers $headers
```

---

## 📱 Page Routes

| Route | Purpose | Access |
|-------|---------|--------|
| `/` | Home page with registration form | Public |
| `/about` | About Influencia event | Public |
| `/ticket` | View your e-pass ticket | Public (requires localStorage) |
| `/ticket-access` | Retrieve ticket by email/ID | Public |
| `/admin` | Admin dashboard | Requires `admin123` |
| `/staff` | Staff page | Public |

---

## 🔧 Troubleshooting

### "Invalid admin key"
- Verify you're entering exactly: `admin123`
- No spaces before/after
- Case-sensitive

### Ticket not showing after registration
- Check browser console for errors
- Verify localStorage has "attendee" key
- Check Network tab for API response

### Admin panel shows "Authentication required"
- Ensure you're logged in with `admin123`
- Check Network tab → Headers → Authorization header
- Try logging in again

### QR code not displaying
- Verify `qrCode` field exists in attendee data
- Check `qrcode.react` library is installed
- Console should show the QR code value

---

## 🎊 Success Indicators

**Everything is working when you see:**

1. ✅ Registration form submits successfully
2. ✅ Success toast: "Registration successful! Redirecting to your e-pass..."
3. ✅ Auto-redirect to `/ticket` page
4. ✅ Ticket displays with your details and QR code
5. ✅ Admin login with `admin123` works
6. ✅ Admin dashboard shows your registration
7. ✅ MongoDB Atlas shows document in `registrations` collection

---

## 📝 Next Steps

### For Production:
1. **Change admin key**: Replace `admin123` with secure key
2. **Add to .env**: `ADMIN_SECRET_KEY=your-secure-key`
3. **Update code**: Use `process.env.ADMIN_SECRET_KEY`
4. **Rotate MongoDB credentials** (exposed in git history)
5. **Add JWT authentication** for better security

### For Vercel Deployment:
```powershell
# Set environment variables
vercel env add MONGODB_URI production
vercel env add ADMIN_SECRET_KEY production

# Deploy
vercel --prod
```

---

**Current Setup**: ✅ **FULLY FUNCTIONAL**  
**Admin Key**: `admin123`  
**MongoDB**: Connected to Atlas  
**All Features**: Working on localhost  
**Ready For**: Testing and deployment! 🚀
