# 🚀 Quick Start Guide

## Current Status
✅ Backend configured  
🔒 **Action Required**: Whitelist IP in MongoDB Atlas

---

## Fix MongoDB Connection (2 minutes)

Your error:
```
MongoDB connection error: Could not connect to any servers in your MongoDB Atlas cluster
```

**Solution:**
1. Go to https://cloud.mongodb.com
2. Click: **Network Access** (left sidebar)
3. Click: **Add IP Address** (green button)
4. Select: **Allow Access from Anywhere** (`0.0.0.0/0`)
5. Click: **Confirm**
6. **Wait 2 minutes**
7. Restart server: `npm run dev`

---

## Run Locally

```powershell
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
📊 Database: influencia
```

---

## Deploy to Vercel

```powershell
# First time setup
vercel env add MONGODB_URI production
# Paste: mongodb+srv://mailnihalpm_db_user:noXLP4g5HEeGlrxl@cluster0.yklsvdn.mongodb.net/influencia?retryWrites=true&w=majority

# Deploy
vercel --prod
```

---

## Test Registration

1. Open: http://localhost:8080
2. Click: **Register Now**
3. Fill the 3-step form
4. Submit
5. View your ticket with QR code

---

## Admin Panel

1. Go to: http://localhost:8080/admin
2. Enter key: `admin123`
3. View all registrations
4. Mark attendance

---

## Need Help?

- **IP Whitelist**: `MONGODB_IP_WHITELIST_FIX.md`
- **Full Setup**: `SETUP_COMPLETE.md`
- **MongoDB Plan**: `MONGODB_SETUP_PLAN.md`
- **Copilot Guide**: `.github/copilot-instructions.md`

---

## Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/register` | POST | Create registration |
| `/api/registrations` | GET | List all (admin) |
| `/api/attendees/:id` | PUT | Update attendance |
| `/api/ticket/:id` | GET | Get ticket details |
| `/health` | GET | Server status |
