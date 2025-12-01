# Frontend Environment Variables

## For Local Development

Create a `.env.local` file in the root directory (same level as `package.json`) with:

```env
# Optional: Override API URL for local development
# If not set, defaults to http://localhost:5000/api
VITE_API_URL=http://localhost:5000/api
```

**Note:** For local development, you typically don't need to set `VITE_API_URL` unless your backend is running on a different port.

## For Vercel Deployment

### No Environment Variables Required! ✅

The frontend is configured to automatically:
- Use `/api` in production (which works with Vercel's rewrites)
- Use `http://localhost:5000/api` in development

### Optional: Override API URL

If you need to use a different API URL (e.g., a separate backend server), you can add:

```env
VITE_API_URL=https://your-api-domain.com/api
```

**But this is NOT needed** if your backend is deployed on the same Vercel project (which is the recommended setup).

## How It Works

1. **Local Development:**
   - Frontend runs on `http://localhost:8080` (or Vite's default port)
   - Backend runs on `http://localhost:5000`
   - Frontend automatically uses `http://localhost:5000/api`

2. **Vercel Production:**
   - Frontend is served as static files
   - API requests go to `/api/*` which Vercel rewrites to `api/[...path].ts`
   - No environment variables needed!

## Summary

- **Local Dev:** No `.env` file needed (uses defaults)
- **Vercel:** No environment variables needed (uses `/api` automatically)
- **Custom Setup:** Only set `VITE_API_URL` if you have a separate backend server

