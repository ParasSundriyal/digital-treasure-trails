# Vercel Environment Variables

Add these environment variables in your Vercel project settings:

## Backend Environment Variables (Required)

### 1. **MONGO_URI** (Required)
   - Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/treasurehunt?retryWrites=true&w=majority`
   - Get this from MongoDB Atlas or your MongoDB provider

### 2. **CLIENT_URL** (Required)
   - Your Vercel deployment URL
   - Example: `https://your-app.vercel.app`
   - Set this to your actual Vercel URL after first deployment
   - Used for CORS configuration

### 3. **ADMIN_EMAIL** (Required)
   - Admin login email
   - Example: `admin@example.com`
   - Use this to log in to the admin panel

### 4. **ADMIN_PASSWORD** (Required)
   - Admin login password
   - Example: `your-secure-password`
   - Use this to log in to the admin panel

### 5. **JWT_SECRET** (Required)
   - Secret key for JWT token generation
   - Generate a random string (at least 32 characters)
   - Example: `your-super-secret-jwt-key-here-min-32-chars`
   - You can generate one using: `openssl rand -base64 32`

## Frontend Environment Variables (Optional)

### **VITE_API_URL** (Optional)
   - Only set this if you need to use a separate backend server
   - Defaults to `/api` in production (works automatically with Vercel)
   - Example: `https://your-api-domain.com/api`
   - **You don't need this** if backend is on the same Vercel project

## Optional Variables

- **PORT** (defaults to 5000, not needed for Vercel)
- **NODE_ENV** (automatically set by Vercel)

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Make sure to add them for all environments (Production, Preview, Development)
5. Redeploy your application after adding variables

## Summary

**For Frontend:** No environment variables needed! ✅
- The frontend automatically uses `/api` in production
- Works seamlessly with Vercel's serverless functions

**For Backend:** 5 required environment variables
- MONGO_URI
- CLIENT_URL
- ADMIN_EMAIL
- ADMIN_PASSWORD
- JWT_SECRET
