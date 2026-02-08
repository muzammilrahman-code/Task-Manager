# Deployment Configuration

## Backend Vercel Environment Variables
Add these to your Vercel backend project settings:

```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/task_management
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=production
FRONTEND_URL=https://task-management-uypq.vercel.app
```

## Frontend Vercel Environment Variables
Add these to your Vercel frontend project settings:

```
VITE_API_BASE_URL=https://task-manager-five-rho-37.vercel.app
VITE_API_URL=https://task-manager-five-rho-37.vercel.app
```

## Current API Endpoints
- Backend: https://task-manager-five-rho-37.vercel.app
- Frontend: https://task-management-uypq.vercel.app
- Auth API: https://task-manager-five-rho-37.vercel.app/api/v1
- Task API: https://task-manager-five-rho-37.vercel.app/api/v2

## Changes Made to Fix CORS Issues:

1. **Backend (server.js)**:
   - Added proper CORS configuration with both frontend URLs
   - Enhanced preflight request handling
   - Added explicit Access-Control headers

2. **Frontend Configuration**:
   - Updated .env files with correct API URLs
   - Fixed environment variable names (VITE_API_BASE_URL)
   - Enhanced vite.config.js for better production builds

3. **Route Fixes**:
   - Removed trailing slashes from route patterns that caused path-to-regexp errors
   - Improved error handling in controllers

## Testing the Deployment:
1. Wait for both deployments to complete
2. Test the login functionality
3. Check browser console for any remaining CORS errors

## Troubleshooting:
If you still see CORS errors:
1. Verify environment variables 
2. Check that both projects have been rerun
3. Clear browser cache and try again