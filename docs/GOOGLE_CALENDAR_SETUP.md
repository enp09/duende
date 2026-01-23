# Google Calendar Integration Setup

This guide will help you set up Google Calendar OAuth for Duende.

## Prerequisites

- A Google account
- Access to [Google Cloud Console](https://console.cloud.google.com)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" at the top
3. Click "New Project"
4. Name it "Duende" and click "Create"
5. Wait for the project to be created, then select it

## Step 2: Enable Google Calendar API

1. In the left sidebar, go to **APIs & Services** > **Library**
2. Search for "Google Calendar API"
3. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Select **External** as the user type (unless you have a Google Workspace account)
3. Click "Create"
4. Fill in the required fields:
   - **App name:** Duende
   - **User support email:** Your email
   - **Developer contact email:** Your email
5. Click "Save and Continue"
6. On the Scopes page, click "Add or Remove Scopes"
7. Add these scopes:
   - `https://www.googleapis.com/auth/calendar.readonly`
   - `https://www.googleapis.com/auth/calendar.events`
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`
8. Click "Update" then "Save and Continue"
9. On the Test users page, add your email address
10. Click "Save and Continue"

## Step 4: Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click "Create Credentials" > "OAuth client ID"
3. Select **Web application** as the application type
4. Name it "Duende Web Client"
5. Under "Authorized redirect URIs", add:
   - For local development: `http://localhost:3000/api/auth/google/callback`
   - For production: `https://yourdomain.com/api/auth/google/callback`
6. Click "Create"
7. A dialog will show your **Client ID** and **Client Secret** - copy these!

## Step 5: Add Credentials to Your .env File

1. In your project root, create a `.env` file (or copy from `.env.example`)
2. Add your credentials:

```env
DATABASE_URL="your-supabase-connection-string"

GOOGLE_CLIENT_ID="your-client-id-here"
GOOGLE_CLIENT_SECRET="your-client-secret-here"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/google/callback"
```

3. Save the file
4. Restart your development server

## Step 6: Test the Integration

1. Go to your dashboard at `http://localhost:3000/dashboard`
2. Click "Connect Google Calendar"
3. Sign in with your Google account
4. Grant permissions to Duende
5. You should be redirected back to the dashboard with a success message
6. Click "Sync calendar now" to fetch your events

## Troubleshooting

### "Access blocked: This app's request is invalid"

- Make sure you added your email as a test user in the OAuth consent screen
- Verify the redirect URI matches exactly (including protocol and path)

### "redirect_uri_mismatch"

- Check that the redirect URI in your `.env` file matches the one in Google Cloud Console
- Make sure there are no trailing slashes

### "invalid_client"

- Double check your Client ID and Client Secret are correct
- Make sure there are no extra spaces in your `.env` file

## Production Deployment

When deploying to production (Vercel, etc.):

1. Add your production domain to the authorized redirect URIs in Google Cloud Console
2. Update the `GOOGLE_REDIRECT_URI` environment variable in your hosting platform
3. If you want to make the app public, you'll need to submit your OAuth consent screen for verification by Google

## Security Notes

- **Never commit your `.env` file to git** - it's in `.gitignore` by default
- Keep your Client Secret secure
- Only grant the minimum required scopes
- Regularly review connected applications in your Google Account settings
