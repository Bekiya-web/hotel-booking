# Login Troubleshooting Guide

## Current Status

The login **should work** even with the database errors you're seeing!

### Why?

The system has **fallback authentication** that works without a database:
- Hardcoded email: `bekibekinat@gmail.com`
- Hardcoded password: `beki1234`
- Works immediately, no setup needed

### Console Errors Explained

The errors you're seeing are **expected** if you haven't run the database migration:

```
POST .../admin_users 401 (Unauthorized)
Error creating default admin: {code: '42501', message: 'new row violates row-level security policy'}
GET .../admin_users 406 (Not Acceptable)
```

**These are just warnings!** The system tries to:
1. Create admin in database → Fails (no table/RLS issue)
2. Query admin from database → Fails (no table/RLS issue)
3. **Falls back to hardcoded credentials** → Should work! ✅

## Quick Test

### Try This:

1. **Clear browser cache:**
   - Press `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
   - Clear "Cached images and files"
   - Clear "Cookies and site data"

2. **Refresh page:**
   - Press `Ctrl+R` (or `Cmd+R` on Mac)

3. **Try login:**
   - Email: `bekibekinat@gmail.com`
   - Password: `beki1234`
   - Click "Sign In"

### Expected Result:

✅ **Should login successfully** and redirect to `/admin` dashboard

## If Login Still Fails

### Check These:

1. **Email is exact:**
   ```
   bekibekinat@gmail.com
   ```
   - No spaces before or after
   - All lowercase
   - Correct spelling

2. **Password is exact:**
   ```
   beki1234
   ```
   - All lowercase
   - No spaces
   - Exactly 8 characters

3. **Browser console:**
   - Press F12
   - Go to Console tab
   - Look for any red errors (not warnings)
   - Share the error message

## To Fix Database Errors (Optional)

If you want to eliminate the console errors and enable password changes:

### Option 1: Simple Fix (Recommended)

Run this SQL in Supabase SQL Editor:

```sql
-- File: frontend/supabase/fix-admin-rls.sql
```

This will:
- Create the table if needed
- Fix RLS policies
- Insert default admin
- Verify it worked

### Option 2: Full Setup

Run this SQL in Supabase SQL Editor:

```sql
-- File: frontend/supabase/create-admin-table.sql
```

This does the same but with more details.

### Steps:

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Click "New query"
4. Copy content from `frontend/supabase/fix-admin-rls.sql`
5. Paste into editor
6. Click "Run"
7. Should see: "Admin user created successfully!"

## After Running SQL

### Test Again:

1. Refresh login page
2. Enter credentials
3. Should login without console errors
4. Password change will now work in Settings

## Common Issues

### Issue 1: "Invalid email or password"

**Cause:** Typo in email or password

**Fix:**
- Copy-paste from here:
  - Email: `bekibekinat@gmail.com`
  - Password: `beki1234`

### Issue 2: Console errors but login works

**Cause:** Database not set up yet

**Fix:** This is normal! Login still works with fallback.

**Optional:** Run SQL migration to fix errors

### Issue 3: Redirects back to login

**Cause:** Session not being saved

**Fix:**
1. Check browser allows localStorage
2. Try incognito/private mode
3. Check browser console for errors

### Issue 4: Database errors after running SQL

**Cause:** RLS policy issues

**Fix:**
1. Run `frontend/supabase/fix-admin-rls.sql`
2. This specifically fixes RLS issues

## Verification Steps

### 1. Check if login works:
```
Go to: /admin/login
Enter: bekibekinat@gmail.com / beki1234
Result: Should redirect to /admin
```

### 2. Check if session persists:
```
After login, refresh page
Result: Should stay logged in
```

### 3. Check if logout works:
```
Click "Logout" in sidebar
Result: Should redirect to /admin/login
```

### 4. Check localStorage:
```
F12 → Application → Local Storage
Look for: admin_logged_in = "true"
Look for: admin_user = {email: "bekibekinat@gmail.com", ...}
```

## Summary

### Without Database Setup:
✅ Login works (fallback)
✅ Logout works
✅ Session works
⚠️ Console shows errors (harmless)
❌ Password change doesn't work

### With Database Setup:
✅ Login works (database)
✅ Logout works
✅ Session works
✅ No console errors
✅ Password change works

## Need Help?

If login still doesn't work:

1. **Share these details:**
   - Exact error message from console
   - What happens when you click "Sign In"
   - Browser and version
   - Screenshot of console errors

2. **Try these:**
   - Different browser
   - Incognito/private mode
   - Clear all browser data
   - Check network tab in DevTools

## Quick Reference

**Default Credentials:**
```
Email: bekibekinat@gmail.com
Password: beki1234
```

**SQL Files:**
- `frontend/supabase/fix-admin-rls.sql` - Quick fix
- `frontend/supabase/create-admin-table.sql` - Full setup

**Expected Behavior:**
- Login should work immediately
- Console errors are warnings, not failures
- Database setup is optional but recommended
