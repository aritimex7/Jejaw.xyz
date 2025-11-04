# 🚀 Vercel Deployment Guide

## 📋 Prerequisites
- Node.js 18+ installed
- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub account (recommended)

## 🛠 Step-by-Step Deployment

### 1. **Install Vercel CLI**
```bash
npm i -g vercel
```

### 2. **Login to Vercel**
```bash
vercel login
```

### 3. **Build Project Locally (Test)**
```bash
npm install
npm run build
```

### 4. **Deploy to Vercel**

#### Option A: Using Vercel CLI
```bash
# From your project directory
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name? personal-dashboard (or your choice)
# - Directory? . (current directory)
# - Want to override settings? No
```

#### Option B: Using Vercel Web Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository or upload project
4. Vercel will auto-detect Next.js settings
5. Add environment variables (see below)
6. Click "Deploy"

### 5. **Configure Environment Variables**

In Vercel Dashboard → Project Settings → Environment Variables:

```env
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your_random_secret_string
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 6. **Database Setup for Production**

#### Option A: Vercel Postgres (Recommended)
1. In Vercel Dashboard → Storage → Create Database
2. Choose Postgres
3. Copy the connection string
4. Add to environment variables as `DATABASE_URL`

#### Option B: External Database
- PostgreSQL (Railway, Supabase, PlanetScale)
- MySQL (PlanetScale, Railway)
- Add connection string to `DATABASE_URL`

### 7. **Update Database Schema**
After deployment, run:
```bash
# If using Vercel CLI
vercel env pull .env.production
npx prisma db push

# Or in Vercel dashboard, add a post-build hook
```

## 🔧 Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

## 🌍 Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your Vercel app URL
- `NEXTAUTH_SECRET` - Random string for NextAuth

### Optional (for AI features)
- `ZAI_API_KEY` - ZAI SDK key for AI features
- `GOOGLE_CLIENT_ID` - Google OAuth
- `GOOGLE_CLIENT_SECRET` - Google OAuth
- `TELEGRAM_BOT_TOKEN` - Telegram notifications

## 🎯 Custom Domain (Optional)

1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL`

## 🔄 Automatic Deployments

### With GitHub Integration
1. Connect your GitHub repository to Vercel
2. Enable automatic deployments
3. Every push to main branch triggers deployment

### Deployment Workflow
```
Git Push → Vercel Build → Database Migration → Live Deployment
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build logs in Vercel dashboard
# Common causes:
# - Missing dependencies
# - TypeScript errors
# - Prisma schema issues
```

#### 2. Database Connection Errors
```bash
# Verify DATABASE_URL format
# Check network access
# Ensure SSL is enabled for production
```

#### 3. Environment Variables Not Loading
```bash
# Verify variable names match exactly
# Check Vercel environment variables section
# Restart deployment after adding variables
```

#### 4. Prisma Client Issues
```bash
# Ensure postinstall script runs
# Check prisma generate in build logs
# Verify schema matches database
```

### Debug Commands
```bash
# Local testing
npm run build
npm start

# Check environment variables
vercel env ls

# View deployment logs
vercel logs
```

## 📊 Monitoring

### Vercel Analytics
- Automatically enabled for Pro accounts
- Track page views, performance
- Monitor API usage

### Custom Monitoring
Add to your app:
```javascript
// pages/_app.js
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

## 🚀 Production Optimizations

### Performance
- Enable Vercel Edge Functions
- Configure caching headers
- Optimize images and assets

### Security
- Use HTTPS (automatic on Vercel)
- Secure environment variables
- Enable rate limiting

### Scaling
- Vercel automatically scales
- Monitor usage in dashboard
- Upgrade plan as needed

## 📞 Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Next.js Deployment: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- Community Support: [github.com/vercel/vercel](https://github.com/vercel/vercel)

---

**🎉 Your Personal Dashboard is now live on Vercel!**