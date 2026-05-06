# ID Verification Setup Guide

## Overview
The ID verification feature has been fully implemented in the code. Users must now upload a valid ID document (front and back) when making a booking.

## What's Been Implemented

### 1. Database Schema
- Added ID verification fields to the bookings table
- Fields include: `id_type`, `id_front_url`, `id_back_url`, `id_verified`, `id_verified_at`

### 2. Booking Form (Checkout Page)
- ID type selection (National ID, Driver's License, Regional ID)
- Front and back image upload fields
- Upload guidelines and validation
- Images uploaded to Cloudinary before booking submission

### 3. Admin Panel
- View ID type and verification status
- Display ID front and back images in booking details modal
- View full-size images in new tab
- Warning message for unverified IDs

### 4. API Integration
- Updated `createBooking` API to accept ID fields
- ID images uploaded to Cloudinary with folder: `id-verification`
- All ID data saved to database

## Setup Instructions

### Step 1: Run Database Migration

You need to add the ID verification fields to your Supabase database.

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file: `frontend/supabase/add-id-verification-fields.sql`
4. Copy the entire SQL content
5. Paste it into the Supabase SQL Editor
6. Click **Run** to execute the migration

The SQL will add these columns to the `bookings` table:
- `id_type` - Type of ID (national_id, drivers_license, regional_id)
- `id_front_url` - URL of ID front image
- `id_back_url` - URL of ID back image
- `id_verified` - Boolean flag (default: false)
- `id_verified_at` - Timestamp when ID was verified

### Step 2: Verify Migration

After running the migration, verify it worked:

```sql
-- Run this in Supabase SQL Editor
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND column_name IN ('id_type', 'id_front_url', 'id_back_url', 'id_verified', 'id_verified_at');
```

You should see all 5 columns listed.

### Step 3: Test the Feature

1. **Make a Test Booking:**
   - Go to your website
   - Select a room and click "Book this room"
   - Fill in guest details
   - Select an ID type (National ID, Driver's License, or Regional ID)
   - Upload front and back images of an ID
   - Complete the booking

2. **Verify in Admin Panel:**
   - Go to `/admin/bookings`
   - Find the test booking
   - Click "View Details"
   - Scroll to "ID Verification" section
   - Verify that:
     - ID type is displayed correctly
     - Front and back images are visible
     - You can view full-size images
     - Verification status shows "Pending Verification"

3. **Check Database:**
   ```sql
   -- Run this in Supabase SQL Editor
   SELECT booking_id, id_type, id_front_url, id_back_url, id_verified
   FROM bookings
   ORDER BY created_at DESC
   LIMIT 5;
   ```

## How It Works

### User Flow
1. User selects a room and proceeds to checkout
2. On Step 1 (Guest Details), user must:
   - Fill in personal information
   - Select check-in/check-out dates
   - Choose ID type from 3 options
   - Upload front image of ID
   - Upload back image of ID
3. System validates that both ID images are uploaded
4. On booking submission:
   - ID images are uploaded to Cloudinary
   - Booking is created with ID information
   - ID verification status is set to "Pending"

### Admin Flow
1. Admin receives new booking notification
2. Admin goes to Bookings page
3. Admin clicks "View Details" on the booking
4. Admin reviews:
   - Guest information
   - Payment proof (if applicable)
   - ID verification section with both images
5. Admin can:
   - View full-size ID images
   - Approve or reject the booking
   - Contact guest if ID is unclear

## ID Types Supported

1. **National ID** - Government-issued national identification card
2. **Driver's License** - Valid driver's license
3. **Regional ID** - Regional identification card

## Validation Rules

- Both front and back images are **required**
- Accepted formats: JPG, PNG
- Images must be clear and readable
- ID must be valid and not expired (user responsibility)
- System validates file upload before submission

## Cloudinary Storage

ID images are stored in Cloudinary with:
- **Folder**: `id-verification`
- **Format**: Original format preserved
- **Access**: Secure URLs generated
- **Naming**: Automatic unique naming by Cloudinary

## Security Considerations

1. **Data Privacy**: ID images contain sensitive personal information
2. **Access Control**: Only admin users can view ID images
3. **Secure Storage**: Images stored in Cloudinary with secure URLs
4. **HTTPS**: All image transfers use HTTPS
5. **Verification**: Admin must verify ID before approving booking

## Troubleshooting

### Migration Fails
- **Error**: Column already exists
  - **Solution**: The migration has already been run. Check if columns exist.
- **Error**: Permission denied
  - **Solution**: Make sure you're logged in as the database owner in Supabase.

### Images Not Uploading
- **Check**: Cloudinary credentials in `.env` file
- **Check**: Upload preset is set to "Unsigned" mode
- **Check**: Browser console for error messages
- **Solution**: Verify Cloudinary setup in `cloudinary/SETUP.md`

### ID Images Not Showing in Admin
- **Check**: Database has `id_front_url` and `id_back_url` values
- **Check**: URLs are accessible (open in browser)
- **Check**: Browser console for CORS or loading errors

### Booking Fails with ID Upload
- **Error**: "Please upload both front and back images of your ID"
  - **Solution**: Make sure both file inputs have files selected
- **Error**: "Failed to process booking"
  - **Solution**: Check browser console and Cloudinary credentials

## Future Enhancements (Optional)

1. **ID Verification Button**: Add a button for admin to mark ID as verified
2. **Verification History**: Track who verified the ID and when
3. **Automatic Verification**: Integrate with ID verification API
4. **Image Quality Check**: Validate image quality before upload
5. **Expiry Date Check**: Extract and validate ID expiry date

## Files Modified

### Frontend Files
- `frontend/src/pages/Checkout.tsx` - Added ID upload fields
- `frontend/src/api/bookings.api.ts` - Added ID fields to API
- `frontend/src/pages/admin/Bookings.tsx` - Added ID display in modal

### Database Files
- `frontend/supabase/add-id-verification-fields.sql` - Migration script

## Status

✅ **COMPLETE** - All code implemented and ready to use
⚠️ **ACTION REQUIRED** - Run database migration in Supabase SQL Editor

## Next Steps

1. ✅ Run the database migration (Step 1 above)
2. ✅ Test with a real booking
3. ✅ Verify admin can see ID images
4. ✅ Train admin staff on ID verification process

---

**Need Help?**
- Check Supabase documentation: https://supabase.com/docs
- Check Cloudinary documentation: https://cloudinary.com/documentation
- Review the code comments in the modified files
