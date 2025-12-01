# Vercel Environment Variables

Add these environment variables in your Vercel project settings:

## Required Variables

1. **MONGO_URI**
   - Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/treasurehunt?retryWrites=true&w=majority`

2. **CLIENT_URL**
   - Your Vercel deployment URL
   - Example: `https://your-app.vercel.app`
   - This will be automatically set by Vercel, but you can override it

3. **ADMIN_EMAIL**
   - Admin login email
   - Example: `admin@example.com`

4. **ADMIN_PASSWORD**
   - Admin login password
   - Example: `your-secure-password`

5. **JWT_SECRET**
   - Secret key for JWT token generation
   - Generate a random string (at least 32 characters)
   - Example: `your-super-secret-jwt-key-here-min-32-chars`

## Optional Variables

- **PORT** (defaults to 5000, not needed for Vercel)
- **NODE_ENV** (automatically set by Vercel)

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with its value
4. Make sure to add them for all environments (Production, Preview, Development)
5. Redeploy your application after adding variables

