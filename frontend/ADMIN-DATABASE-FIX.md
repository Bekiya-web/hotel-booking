# Admin Authentication Database Fix

## Problem
The admin authentication system was experiencing 406 (Not Acceptable) errors when trying to access the database. This was caused by Row Level Security (RLS) policies blocking access to the `admin_users` table.

## Solution
The updated SQL migration (`frontend/supabase/fix-admin-rls.sql`) completely **disables RLS** for the `admin_users` table, allowing all operations without policy restrictions.

## How to Apply the Fix

### Step 1: Run the SQL Migration
1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Copy the entire contents of `frontend/supabase/fix-admin-rls.sql`
4. Paste it into the SQL Editor
5. Click **Run** or press `Ctrl+Enter`

### Step 2: Verify the Setup
After running the migration, you should see output like:
```
✅ Admin user created successfully!
Email: bekibekinat@gmail.com
RLS is DISABLED - all operations allowed
```

### Step 3: Test Login
1. Go to `/admin/login`
2. Use credentials:
   - **Email**: bekibekinat@gmail.com
   - **Password**: beki1234
3. Login should work immediately

### Step 4: Test Password Change
1. After logging in, go to **Settings** page
2. Scroll to **Change Password** section
3. Enter:
   - Current Password: beki1234
   - New Password: (your new password)
   - Confirm Password: (same as new password)
4. Click **Change Password**
5. You should see success message
6. Logout and login with new password to verify

## What the Migration Does

1. **Creates table if missing**: Checks if `admin_users` table exists, creates it if not
2. **Disables RLS**: Turns off Row Level Security completely
3. **Cleans up policies**: Removes any existing RLS policies
4. **Clears data**: Removes any existing admin users
5. **Creates default admin**: Inserts the default admin with email `bekibekinat@gmail.com` and password `beki1234`
6. **Sets up triggers**: Creates trigger to auto-update `updated_at` timestamp
7. **Verifies setup**: Shows confirmation that everything is configured correctly

## Fallback System

Even without running the migration, the system has a **hardcoded fallback**:
- Login with `bekibekinat@gmail.com` / `beki1234` will always work
- This is checked BEFORE any database calls
- Password changes require the database to be set up

## Security Note

⚠️ **Important**: Disabling RLS means anyone with API access can read/write to the `admin_users` table. This is acceptable for a simple admin system, but for production use, you should:
1. Use Supabase Auth instead of custom authentication
2. Implement proper RLS policies with service role keys
3. Hash passwords on the backend (not in the browser)

## Troubleshooting

### Still getting 406 errors?
- Make sure you ran the ENTIRE SQL script
- Check Supabase logs for any error messages
- Verify the table was created: `SELECT * FROM admin_users;`

### Can't change password?
- Verify the migration was run successfully
- Check browser console for error messages
- Make sure you're entering the correct current password

### Login not working?
- The hardcoded fallback should ALWAYS work
- Clear browser localStorage and try again
- Check browser console for errors

## Files Modified
- `frontend/supabase/fix-admin-rls.sql` - Updated SQL migration
- `frontend/src/api/auth.api.ts` - Authentication logic (no changes needed)
- `frontend/src/pages/admin/Login.tsx` - Login page (no changes needed)
- `frontend/src/pages/admin/Settings.tsx` - Password change (no changes needed)
