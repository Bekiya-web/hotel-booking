# Supabase Database Setup

## Current Situation
Your Supabase database currently contains **mock data** that was inserted when you first set up the database. This mock data includes:
- 4 mock rooms (Classic King, Deluxe Skyline, Executive Suite, Penthouse)
- 6 mock reviews (Helena Marlow, Daniel Reyes, Sara Khan, etc.)
- 5 mock room status entries

## How to Remove Mock Data

### Step 1: Update Reviews Table Structure (if needed)
Run this SQL in your Supabase SQL Editor:
```sql
-- File: migrate-reviews-table.sql
```
This adds the `approved`, `booking_id`, and `guest_id` columns to support the new review approval workflow.

### Step 2: Fix RLS Policies (IMPORTANT!)
Run this SQL in your Supabase SQL Editor:
```sql
-- File: fix-rls-policies.sql
```
This fixes Row Level Security policies that may cause 406 errors when fetching rooms.

### Step 3: Delete All Mock Data
Run this SQL in your Supabase SQL Editor:
```sql
-- File: delete-mock-data.sql
```
This will delete ALL existing data from your database.

### Step 4: Verify Deletion
After running the delete script, verify that all tables are empty:
```sql
SELECT 'rooms' as table_name, COUNT(*) as count FROM rooms
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'guests', COUNT(*) FROM guests
UNION ALL
SELECT 'room_status', COUNT(*) FROM room_status;
```
All counts should be **0**.

## After Deletion - How to Use the System

### 1. Create Rooms (Admin Only)
- Go to `/admin/rooms` in your application
- Click "Add Room" button
- Fill in room details:
  - Room ID (e.g., "deluxe-suite")
  - Name (e.g., "Deluxe Suite")
  - Description, price, amenities, etc.
  - Upload images
- Click "Create Room"

### 2. Users Book Rooms
- Users visit your website
- Browse rooms at `/rooms`
- Select a room and click "Book this room"
- Fill in guest details and complete booking
- This creates:
  - A guest record (if new email)
  - A booking record

### 3. Users Submit Reviews
- After their stay, users can submit a review
- Review includes:
  - Rating (1-5 stars)
  - Review text
  - Automatically linked to their booking
- Review is created with `approved = false`

### 4. Admin Approves Reviews
- Go to `/admin/reviews`
- See "Pending Approval" section with all new reviews
- Click "Approve" to make review visible on website
- Click "Delete" to reject the review
- Only approved reviews appear on the public website

## Database Schema

### Tables
- **rooms**: Hotel rooms (created by admin)
- **guests**: Guest information (created when booking)
- **bookings**: Room reservations (created by users)
- **reviews**: Guest reviews (submitted by users, approved by admin)
- **room_status**: Room availability status (managed by admin)

### Review Workflow
```
User books room → User submits review → Admin sees in "Pending" 
→ Admin approves → Review visible on website
```

## Files in This Directory

- `supabase-schema.sql` - Complete database schema (for new setups)
- `migrate-reviews-table.sql` - Update existing database with approval system
- `delete-mock-data.sql` - Remove all mock data from database
- `fix-rls-policies.sql` - Fix Row Level Security policies (if needed)
- `README.md` - This file

## Important Notes

⚠️ **The mock data is in your Supabase database, not in your code!**
- Updating the SQL files only affects NEW database setups
- You must run the delete script to remove existing mock data
- After deletion, you'll have a clean database
- All data must be created through the application

✅ **After running the delete script:**
- Website will show "No rooms available" until you add rooms via admin panel
- Reviews page will show "No reviews yet"
- Admin dashboard will show empty stats
- This is correct! Now you can add real data.
