# Vercel Deployment Setup

## Required Environment Variables

Configure these in your Vercel project settings:

### 1. Database
```
DATABASE_URL=postgresql://username:password@host:5432/database?schema=public
```
**Where to get it:** Your PostgreSQL database provider (Supabase, Neon, Railway, etc.)

### 2. NextAuth
```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
```
**Generate secret:** Run `openssl rand -base64 32` in terminal

### 3. Google Calendar OAuth
```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=https://your-domain.vercel.app/api/auth/google/callback
```
**Where to get it:** Google Cloud Console > APIs & Services > Credentials

### 4. Email Service (Resend)
```
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=duende <hello@yourdomain.com>
```
**Where to get it:** https://resend.com/api-keys

### 5. App URL
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## How to Add Environment Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Select your `duende` project
3. Click **Settings** → **Environment Variables**
4. Add each variable above
5. Select **Production**, **Preview**, and **Development** environments
6. Click **Save**
7. Redeploy your project

## After Setting Environment Variables

Trigger a new deployment:
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push origin main
```

## Troubleshooting

### Build fails with Prisma errors
- Make sure `DATABASE_URL` is set
- Verify the database is accessible from Vercel's network

### Authentication doesn't work
- Check `NEXTAUTH_URL` matches your actual domain
- Verify `NEXTAUTH_SECRET` is set
- Update Google OAuth redirect URI in Google Cloud Console

### Calendar integration fails
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Update `GOOGLE_REDIRECT_URI` to match your production domain
