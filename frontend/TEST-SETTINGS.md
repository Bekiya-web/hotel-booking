# Settings System Test Guide

## ✅ How to Test if Settings Are Working

### Test 1: Check Database Directly

**In Supabase SQL Editor, run:**

```sql
-- View all settings
SELECT key, value FROM settings ORDER BY key;

-- View just hotel name
SELECT value->>'name' as hotel_name FROM settings WHERE key = 'hotel_info';

-- View just Telebirr phone
SELECT value->>'telebirrPhone' as phone FROM settings WHERE key = 'payment_settings';
```

### Test 2: Test Save Functionality

1. **Go to Admin Settings** (`/admin/settings`)
2. **Change Hotel Name** to "TEST HOTEL 123"
3. **Click "Save Hotel Information"**
4. **Open Supabase SQL Editor**
5. **Run:** `SELECT value->>'name' FROM settings WHERE key = 'hotel_info';`
6. **Expected Result:** Should show "TEST HOTEL 123"

### Test 3: Test Payment Settings

1. **Go to Admin Settings**
2. **Change Telebirr Phone** to "+251 111 222 333"
3. **Click "Save Payment Settings"**
4. **Open Supabase SQL Editor**
5. **Run:** `SELECT value->>'telebirrPhone' FROM settings WHERE key = 'payment_settings';`
6. **Expected Result:** Should show "+251 111 222 333"

### Test 4: Test Checkout Integration

1. **Go to Admin Settings**
2. **Change Telebirr Phone** to "+251 999 888 777"
3. **Change Bank Name** to "Awash Bank"
4. **Click "Save Payment Settings"**
5. **Go to any room page**
6. **Click "Book Now"**
7. **Fill guest details and click Continue**
8. **Select Telebirr payment method**
9. **Expected Result:** Should show "+251 999 888 777"
10. **Select Bank Transfer**
11. **Expected Result:** Should show "Awash Bank"

### Test 5: Test Enable/Disable Payment Methods

1. **Go to Admin Settings**
2. **Uncheck "Telebirr Enabled"**
3. **Click "Save Payment Settings"**
4. **Go to checkout page**
5. **Expected Result:** Telebirr option should NOT appear
6. **Go back to Settings**
7. **Check "Telebirr Enabled" again**
8. **Click "Save Payment Settings"**
9. **Go to checkout page**
10. **Expected Result:** Telebirr option should appear again

### Test 6: Test Currency Change

1. **Go to Admin Settings**
2. **Change Currency** from "USD" to "ETB"
3. **Click "Save Payment Settings"**
4. **Go to checkout page**
5. **Proceed to payment step**
6. **Expected Result:** Should show "ETB 500" instead of "USD 500"

## 🐛 Troubleshooting

### If settings don't save:
```sql
-- Check if RLS is disabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'settings';
-- Should show: rowsecurity = false

-- If it shows true, disable it:
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
```

### If settings don't load:
```sql
-- Check if data exists
SELECT COUNT(*) FROM settings;
-- Should show: 4

-- If 0, run the insert statements again from create-settings-table.sql
```

### If changes don't appear on checkout:
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Open in incognito/private window
4. Check browser console for errors (F12)

## 📊 Expected Database State

After running the migration, your settings table should have:

| key | category | value (sample) |
|-----|----------|----------------|
| hotel_info | hotel | {"name": "Auréa Grand Hotel", "email": "info@aureagrand.com", ...} |
| payment_settings | payment | {"telebirrEnabled": true, "telebirrPhone": "+251 912 345 678", ...} |
| booking_settings | booking | {"minAdvanceBookingDays": 1, "maxAdvanceBookingDays": 365, ...} |
| notification_settings | notification | {"emailNotifications": true, "smsNotifications": false, ...} |

## ✅ Success Criteria

Settings system is working correctly when:

- ✅ Settings page loads without errors
- ✅ All fields show current values from database
- ✅ Clicking "Save" shows success message
- ✅ Changes persist after page refresh
- ✅ Changes appear in Supabase database
- ✅ Checkout page shows updated payment details
- ✅ Disabled payment methods don't appear on checkout
- ✅ Currency changes reflect on checkout page

## 🎯 Quick Verification Query

Run this in Supabase SQL Editor to see all current settings:

```sql
SELECT 
  key,
  value->>'name' as hotel_name,
  value->>'telebirrPhone' as telebirr_phone,
  value->>'bankName' as bank_name,
  value->>'currency' as currency,
  updated_at
FROM settings
ORDER BY key;
```

This will show you the current state of all settings in one view.
