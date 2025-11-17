# Kaisan Associates - Premium Corporate Website

A world-class, Dubai-inspired website for Kaisan Associates - the leading human resource consultancy specializing in transformative leadership and organizational development.

## 🌟 Overview

This website represents the epitome of modern UI/UX design, featuring:
- **Dubai-inspired luxury aesthetics** with gold and navy color palette
- **Premium glassmorphism effects** and sophisticated animations
- **Three signature programs**: Executive Business Management (KiSE), Influencia Edition 2, and PRP Training
- **Fully responsive design** optimized for all devices (iOS, Android, Windows, Mac)
- **Native-feeling interactions** with smooth transitions and micro-animations
- **High conversion optimization** with strategic CTAs and user flow

## 🎨 Design System

### Color Palette
- **Dubai Gold** (#FACC15): Primary accent, luxury brand color
- **Dubai Navy** (#0F172A): Primary text, professional authority
- **Dubai Sand** (#FEF7E6): Subtle backgrounds, warmth
- **Dubai Sky** (#0EA5E9): Accent highlights
- **Dubai Pearl** (#FAFAFA): Clean backgrounds

### Typography
- **Display Font**: Cal Sans (headings)
- **Body Font**: Inter var (paragraphs, UI)
- **Monospace**: JetBrains Mono (code, technical content)

### Key Features
- Advanced gradient system with mesh backgrounds
- Glass morphism with backdrop blur effects
- Sophisticated shadow system with glow effects
- Premium animation library with scroll-based triggers
- Custom timing functions for elegant transitions

## 📁 Project Structure

```
src/
├── pages/
│   ├── Home.tsx                    # Main landing page
│   ├── Courses.tsx                 # Three program showcases
│   ├── AboutKaisan.tsx            # Company story & leadership
│   ├── ContactPage.tsx            # Contact form & location
│   └── NotFound.tsx               # 404 error page
├── components/
│   ├── KaisanNavigationBar.tsx   # Premium navigation with dropdowns
│   ├── Footer.tsx                 # Comprehensive footer
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── utils.ts                   # Helper functions
│   └── (api utilities as needed)
└── hooks/
    └── use-toast.ts               # Toast notifications
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun package manager

### Installation

```powershell
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site runs on:
- **Frontend**: http://localhost:8080 (Vite dev server)
- **Backend**: http://localhost:3000 (Express dev server)

## 🎯 Key Pages

### Home (`/home` or `/`)
Premium landing page featuring:
- Immersive hero with Dubai skyline SVG
- Floating particle animations
- Services overview with icon cards
- Featured programs showcase
- Dr. Rashid Gazzali leadership section
- Multi-layer CTA sections

### Courses (`/courses`)
Comprehensive program catalog with tabs for:
- **Executive Business Management Programme** (KiSE)
  - 12-month hybrid program
  - Quarterly workshops, weekly support
  - Expert mentorship and capstone project
- **Influencia Edition 2**
  - 7-hour intensive workshop
  - 250 change makers
  - Three transformation pillars
- **PRP Training**
  - 16-week professional development
  - Industry-recognized certification

### About (`/about-kaisan`)
Company narrative featuring:
- Mission, vision, and values
- Dr. Rashid Gazzali profile
- Expert team showcase
- Service portfolio
- Why choose Kaisan

### Contact (`/contact`)
Multi-channel contact page with:
- Interactive contact form with validation
- Office location (Conrad Business Tower, Dubai)
- Phone, email, and WhatsApp links
- Google Maps integration
- Business hours and accessibility info

### Influencia (`/influencia`)
Polished event landing page with:
- Enhanced Dubai aesthetics
- Admin panel access button (bottom-right)
- Registration flow integration
- Event details and countdown
- Past edition showcase

## 🔧 Configuration

### Environment Variables
Create `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
VITE_API_BASE_URL=http://localhost:3000
```

### Tailwind Configuration
Premium design tokens in `tailwind.config.ts`:
- Dubai color palette
- Custom animations (fade, slide, scale, float, glow)
- Sophisticated timing functions
- Extended spacing scale

### CSS Variables
Global design system in `src/index.css`:
- HSL color definitions
- Gradient configurations
- Shadow systems
- Typography scales

## 🎨 Component Library

Built on **shadcn/ui** with custom enhancements:
- Button with premium variants
- Card with glass morphism
- Form with advanced validation
- Badge with Dubai gold styling
- Tabs with smooth transitions
- All components in `src/components/ui/`

## 🌐 Routing

### Main Routes
- `/` or `/home` - Home page
- `/courses` - All programs overview
- `/about` - About company
- `/contact` - Contact page

### Program Routes
- `/courses/executive-program` - Executive Business Management (KiSE) Programme
- `/courses/influencia` - Influencia Edition 2 Workshop
- `/courses/prp-training` - PRP Training Programme
- `/courses/:programId` - Dynamic program routing

## 📱 Responsive Design

Optimized breakpoints:
- **Mobile**: 320px - 639px (iOS, Android)
- **Tablet**: 640px - 1023px (iPad, tablets)
- **Desktop**: 1024px - 1535px (Windows, Mac)
- **Large**: 1536px+ (4K displays)

### Touch Optimization
- Large tap targets (min 44x44px)
- Gesture-friendly interactions
- Swipe navigation support
- Native scroll behavior

## ⚡ Performance

### Optimization Techniques
- Code splitting with React lazy loading
- Image optimization with lazy loading
- Prefetching for critical routes
- Minimized bundle size
- Efficient re-renders with React.memo

### Metrics Targets
- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1

## 🔐 Security

### Authentication
- Admin panel with Bearer token
- Secure API endpoints
- CORS configuration
- Input validation and sanitization

### Data Protection
- MongoDB connection with SSL
- Environment variable protection
- XSS prevention
- CSRF protection

## 📊 Analytics Integration

Ready for:
- Google Analytics 4
- Meta Pixel
- Hotjar heatmaps
- Custom event tracking

## 🚢 Deployment

### Vercel (Recommended)
```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables on Vercel
Set in Vercel dashboard:
- `MONGODB_URI`
- `ADMIN_API_KEY`

### Build Configuration
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## 🧪 Testing

```powershell
# Run type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

## 📞 Contact Information

**Kaisan Associates**
- **Address**: 19th Floor, Conrad Business Tower, Sheikh Zayed Road, Dubai, UAE
- **Phone**: +971 50 60 99 326 | +971 43 827 700
- **Email**: info@kaisanassociates.com
- **Website**: www.kaisanassociates.com

## 👨‍💼 Leadership

**Dr. Rashid Gazzali**
- Founder & Managing Director
- 15+ years as global business coach
- 7,000+ professionals trained worldwide
- International recognition and awards

## 📄 License

© 2025 Kaisan Associates. All rights reserved.

## 🤝 Contributing

This is a private project for Kaisan Associates. For inquiries about modifications or enhancements, contact the development team.

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and shadcn/ui
