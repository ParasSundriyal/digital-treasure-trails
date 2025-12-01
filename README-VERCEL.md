# Deploying to Vercel

This guide will help you deploy your Treasure Hunt application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A MongoDB database (MongoDB Atlas recommended)
3. Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Repository

Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

## Step 2: Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `digital-treasure-trails` (or leave as root if your repo is the project root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Option B: Deploy via CLI

```bash
cd digital-treasure-trails
vercel
```

Follow the prompts to link your project.

## Step 4: Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

   - `MONGO_URI` - Your MongoDB connection string
   - `CLIENT_URL` - Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
   - `ADMIN_EMAIL` - Admin login email
   - `ADMIN_PASSWORD` - Admin login password
   - `JWT_SECRET` - A random secret string (at least 32 characters)

3. Make sure to add them for **Production**, **Preview**, and **Development** environments

## Step 5: Deploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**

Or push a new commit to trigger automatic deployment.

## Step 6: Verify Deployment

1. Visit your Vercel deployment URL
2. Test the application:
   - Admin login should work
   - Team signup/login should work
   - API endpoints should respond correctly

## Troubleshooting

### API Routes Not Working

- Check that environment variables are set correctly
- Verify MongoDB connection string is correct
- Check Vercel function logs in the dashboard

### Build Errors

- Ensure all dependencies are in `package.json`
- Check that TypeScript compiles without errors
- Verify build command is correct

### CORS Issues

- Make sure `CLIENT_URL` environment variable matches your Vercel URL
- Check server CORS configuration

## Project Structure

```
digital-treasure-trails/
├── api/              # Vercel serverless functions
│   └── [...path].ts  # API route handler
├── server/           # Backend Express app
├── src/              # Frontend React app
├── vercel.json       # Vercel configuration
└── package.json      # Root package.json
```

## Environment Variables Reference

See `vercel-env.example.md` for detailed environment variable documentation.

## Support

If you encounter issues:
1. Check Vercel function logs in the dashboard
2. Verify all environment variables are set
3. Ensure MongoDB is accessible from Vercel's servers
4. Check that your MongoDB IP whitelist allows Vercel's IPs (or use 0.0.0.0/0 for development)

