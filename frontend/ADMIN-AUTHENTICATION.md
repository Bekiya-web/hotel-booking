# Admin Authentication System

## Overview
Implemented a secure admin authentication system with login validation and password change functionality.

## Default Credentials

**Email:** `bekibekinat@gmail.com`  
**Password:** `beki1234`

## Features

### 1. Secure Login
- Email and password validation
- Password hashing (SHA-256)
- Session management with localStorage
- Auto-redirect if already logged in
- Loading states during authentication

### 2. Password Change
- Change password from Settings page
- Requires current password verification
- New password confirmation
- Minimum 6 characters requirement
- Security tips displayed

### 3. Logout
- Clear session data
- Redirect to login page
- Toast notification

## Database Setup

### Step 1: Create Admin Table

Run this SQL in Supabase SQL Editor:

```sql
-- File: frontend/supabase/create-admin-table.sql
```

This creates:
- `admin_users` table
- Default admin user (bekibekinat@gmail.com)
- Auto-update timestamp trigger
- Proper indexes and constraints

### Step 2: Verify Table

Check if table was created:

```sql
SELECT * FROM admin_users;
```

You should see one row with the default admin.

## How It Works

### Login Flow

1. **User enters credentials**
   - Email: bekibekinat@gmail.com
   - Password: beki1234

2. **System validates**
   - Hashes password with SHA-256
   - Queries database for matching email + password hash
   - If match found → Login successful
   - If no match → Error: "Invalid email or password"

3. **Session created**
   - Admin data stored in localStorage
   - `admin_logged_in` flag set to `true`
   - Redirect to `/admin` dashboard

4. **Auto-login check**
   - On page load, checks if already logged in
   - If yes → Redirect to dashboard
   - If no → Show login form

### Password Change Flow

1. **Navigate to Settings**
   - Go to `/admin/settings`
   - Scroll to "Change Password" section

2. **Enter passwords**
   - Current password (for verification)
   - New password (minimum 6 characters)
   - Confirm new password (must match)

3. **System validates**
   - Checks current password is correct
   - Verifies new passwords match
   - Checks minimum length requirement

4. **Password updated**
   - New password hashed with SHA-256
   - Database updated
   - Success notification shown
   - Form cleared

5. **Next login**
   - Use new password
   - Old password no longer works

### Logout Flow

1. **Click Logout**
   - In sidebar, click "Logout" button

2. **Session cleared**
   - Remove admin data from localStorage
   - Remove `admin_logged_in` flag

3. **Redirect**
   - Navigate to `/admin/login`
   - Show success toast

## API Functions

### `loginAdmin(email, password)`
```typescript
const admin = await loginAdmin('bekibekinat@gmail.com', 'beki1234');
// Returns: { id, email, created_at, updated_at }
```

### `changePassword(email, oldPassword, newPassword)`
```typescript
await changePassword('bekibekinat@gmail.com', 'beki1234', 'newpass123');
// Returns: void (throws error if fails)
```

### `logoutAdmin()`
```typescript
logoutAdmin();
// Clears session, no return value
```

### `isAdminLoggedIn()`
```typescript
const loggedIn = isAdminLoggedIn();
// Returns: boolean
```

### `getCurrentAdmin()`
```typescript
const admin = getCurrentAdmin();
// Returns: AdminUser | null
```

## Security Features

### 1. Password Hashing
- Passwords never stored in plain text
- SHA-256 hashing algorithm
- Hash stored in database, not password

### 2. Session Management
- Session data in localStorage
- Cleared on logout
- Checked on page load

### 3. Validation
- Email format validation
- Password length requirements
- Current password verification
- Password confirmation matching

### 4. Error Handling
- Clear error messages
- No sensitive information leaked
- Generic "Invalid email or password" message

## Files Created/Modified

### New Files:
1. **`frontend/supabase/create-admin-table.sql`**
   - Database schema for admin users
   - Default admin creation
   - Triggers and constraints

2. **`frontend/src/api/auth.api.ts`**
   - Authentication API functions
   - Password hashing
   - Session management

3. **`frontend/ADMIN-AUTHENTICATION.md`**
   - This documentation file

### Modified Files:
1. **`frontend/src/pages/admin/Login.tsx`**
   - Integrated authentication API
   - Added loading states
   - Auto-login check
   - Updated placeholder text

2. **`frontend/src/pages/admin/Settings.tsx`**
   - Added password change section
   - Password validation
   - Security tips

3. **`frontend/src/components/admin/AdminLayout.tsx`**
   - Added logout functionality
   - Session clearing
   - Redirect to login

## Usage Guide

### For Admin Users

#### First Login:
1. Go to `/admin/login`
2. Enter email: `bekibekinat@gmail.com`
3. Enter password: `beki1234`
4. Click "Sign In"
5. Redirected to dashboard

#### Change Password:
1. Go to `/admin/settings`
2. Scroll to "Change Password" section
3. Enter current password: `beki1234`
4. Enter new password (min 6 chars)
5. Confirm new password
6. Click "Change Password"
7. Success! Use new password next time

#### Logout:
1. Click "Logout" in sidebar
2. Redirected to login page
3. Session cleared

### For Developers

#### Check if logged in:
```typescript
import { isAdminLoggedIn } from '@/api/auth.api';

if (isAdminLoggedIn()) {
  // User is logged in
} else {
  // Redirect to login
}
```

#### Get current admin:
```typescript
import { getCurrentAdmin } from '@/api/auth.api';

const admin = getCurrentAdmin();
if (admin) {
  console.log(admin.email); // bekibekinat@gmail.com
}
```

#### Protect routes:
```typescript
useEffect(() => {
  if (!isAdminLoggedIn()) {
    navigate('/admin/login');
  }
}, []);
```

## Testing

### Test Login:
1. Go to `/admin/login`
2. Try wrong password → Should show error
3. Try correct credentials → Should login
4. Refresh page → Should stay logged in
5. Open new tab → Should be logged in

### Test Password Change:
1. Login with default password
2. Go to Settings
3. Try wrong current password → Should show error
4. Try mismatched new passwords → Should show error
5. Try too short password → Should show error
6. Enter valid passwords → Should succeed
7. Logout and login with new password → Should work
8. Try old password → Should fail

### Test Logout:
1. Login to admin
2. Click Logout
3. Should redirect to login page
4. Try to access `/admin` → Should redirect to login
5. Login again → Should work

## Troubleshooting

### "Invalid email or password" error:
- Check email is exactly: `bekibekinat@gmail.com`
- Check password is exactly: `beki1234`
- Check database table exists
- Check default admin was created

### Password change fails:
- Verify current password is correct
- Check new password is at least 6 characters
- Ensure new passwords match
- Check database connection

### Can't access admin pages:
- Check if logged in: `isAdminLoggedIn()`
- Clear localStorage and login again
- Check browser console for errors

### Database errors:
- Verify `admin_users` table exists
- Check RLS is disabled on table
- Verify Supabase credentials in `.env`

## Production Considerations

### Current Implementation (Demo):
- ✅ Password hashing (SHA-256)
- ✅ Session management
- ✅ Validation
- ⚠️ Client-side hashing (not ideal)
- ⚠️ localStorage session (not most secure)

### For Production:
1. **Use Backend Authentication:**
   - Hash passwords on server (bcrypt)
   - Use JWT tokens
   - HTTP-only cookies

2. **Add Security Features:**
   - Rate limiting
   - Account lockout after failed attempts
   - Two-factor authentication
   - Password reset via email

3. **Improve Session:**
   - Use secure cookies
   - Session expiration
   - Refresh tokens

4. **Add Audit Log:**
   - Track login attempts
   - Log password changes
   - Monitor admin actions

## Summary

✅ **Implemented**: Secure admin login system
✅ **Default Admin**: bekibekinat@gmail.com / beki1234
✅ **Password Change**: Available in Settings
✅ **Session Management**: localStorage-based
✅ **Logout**: Clears session and redirects
✅ **Validation**: Email, password, confirmation
✅ **Security**: Password hashing, error handling

The admin authentication system is now fully functional! 🔐
