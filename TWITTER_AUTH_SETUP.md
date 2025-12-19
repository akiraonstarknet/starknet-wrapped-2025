# Twitter Authentication Setup Guide

This guide will help you set up Twitter OAuth authentication for the Starknet Wrapped AI application.

## Prerequisites

- A Twitter Developer account
- Node.js and pnpm installed
- This application cloned and dependencies installed

## Step 1: Create a Twitter Developer App

1. Go to the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Sign in with your Twitter account
3. Click on "Create Project" or "Create App"
4. Fill in the required information:
   - **App name**: Choose a unique name for your application
   - **App description**: Brief description of your app
   - **Website URL**: Your application URL (can be `http://localhost:3000` for development)

## Step 2: Configure OAuth 2.0 Settings

1. In your app settings, navigate to the "Settings" tab
2. Scroll down to "User authentication settings" and click "Set up"
3. Configure the following:
   - **OAuth 2.0**: Enable it
   - **Type of App**: Web App
   - **Callback URLs**: Add the following:
     - Development: `http://localhost:3000/api/auth/callback/twitter`
     - Production: `https://yourdomain.com/api/auth/callback/twitter`
   - **Website URL**: Your application URL
   - **App permissions**: Select "Read" (or "Read and Write" if needed)
4. Save your settings

## Step 3: Get Your Credentials

1. After setting up OAuth 2.0, you'll see your **Client ID** and **Client Secret**
2. Copy these credentials - you'll need them for the next step
3. **Important**: Keep your Client Secret secure and never commit it to version control

## Step 4: Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in your credentials:
   ```env
   TWITTER_CLIENT_ID=your_actual_client_id_here
   TWITTER_CLIENT_SECRET=your_actual_client_secret_here
   AUTH_SECRET=your_generated_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Generate a secure `AUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

## Step 5: Test the Authentication

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open your browser and navigate to `http://localhost:3000`
3. Click on "Connect with Twitter"
4. You should be redirected to Twitter's authorization page
5. Authorize the app
6. You'll be redirected back to your application, now logged in

## Troubleshooting

### Common Issues

1. **"Invalid callback URL" error**
   - Make sure the callback URL in your Twitter app settings exactly matches: `http://localhost:3000/api/auth/callback/twitter`
   - Check for trailing slashes or typos

2. **"Invalid client" error**
   - Double-check your `TWITTER_CLIENT_ID` and `TWITTER_CLIENT_SECRET` in `.env.local`
   - Make sure there are no extra spaces or quotes

3. **"redirect_uri_mismatch" error**
   - The `NEXTAUTH_URL` in your `.env.local` must match the base URL of your application
   - For local development: `http://localhost:3000`
   - For production: `https://yourdomain.com`

4. **Session not persisting**
   - Make sure you have a valid `AUTH_SECRET` generated
   - Clear your browser cookies and try again

## Production Deployment

When deploying to production:

1. Update your Twitter app settings with your production callback URL:
   ```
   https://yourdomain.com/api/auth/callback/twitter
   ```

2. Update your environment variables:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   ```

3. Make sure all environment variables are set in your hosting platform (Vercel, Netlify, etc.)

## Security Best Practices

1. **Never commit `.env.local` or `.env` files** to version control
2. Keep your `TWITTER_CLIENT_SECRET` and `AUTH_SECRET` secure
3. Use different credentials for development and production
4. Regularly rotate your secrets
5. Use environment variables for all sensitive configuration

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Twitter OAuth 2.0 Documentation](https://developer.twitter.com/en/docs/authentication/oauth-2-0)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## Support

If you encounter any issues not covered in this guide, please check:
- NextAuth.js GitHub Issues
- Twitter Developer Community
- This project's issue tracker
