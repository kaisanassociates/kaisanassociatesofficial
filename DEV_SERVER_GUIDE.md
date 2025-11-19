# Development Server Guide

## ⚠️ IMPORTANT: How to Run the Dev Server

### ❌ DO NOT USE:
```bash
npm run dev:vite
```
This only starts the frontend and **will cause API 500 errors**.

### ✅ CORRECT WAY:
```bash
npm run dev
```
This runs `vercel dev` which starts **both** the frontend AND the API serverless functions.

---

## Common Errors Fixed

### 1. API 500 Errors
**Cause**: Frontend trying to call `/api/courses` but no backend server running
**Solution**: Use `npm run dev` instead of `npm run dev:vite`

### 2. Missing Images (404s)
**Fixed**: Removed references to non-existent placeholder images:
- `avatar-2.jpg`, `avatar-3.jpg` (not used anywhere)
- `vision-image.jpg`, `mission-image.jpg`, `about-us.jpg` (not used anywhere)
- `dubai-map-bg.jpg` (replaced with gradient in ContactPage.tsx)

---

## Available Images
Located in `/public/images/`:
- `dubai-skyline.jpg`
- `dr-rashid-formal.jpeg`
- `dr-rashid-speaking.jpg`
- `dr-saji.jpg`
- `prof-arvinder.jpg`
- `executive-business-management-brochure.jpg`
- `influencia-poster.jpg`
- `PRP_BROUCHURE.jpeg`
- `kaisan-logo.png`
- `rg-white.png`
- `pattern-bg.jpg`

---

## Next Steps

1. **Stop current server** (Ctrl+C in terminal)
2. **Run correct command**: `npm run dev`
3. **Wait for**: "Ready! Available at http://localhost:3000"
4. **Open**: http://localhost:3000

Your API endpoints will now work correctly! 🚀
