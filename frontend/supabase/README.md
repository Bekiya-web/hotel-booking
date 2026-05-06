# Supabase Database Setup

## Overview
Supabase provides the PostgreSQL database and REST API for the hotel booking system.

## Files in This Folder

- **supabase-schema.sql** - Complete database schema with sample data
- **fix-rls-policies.sql** - Row Level Security policy fixes for admin access

## Setup Steps

### 1. Create Supabase Project
1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: Hotel Booking
   - **Database Password**: (choose a strong password)
   - **Region**: (choose closest to you)
5. Wait for project to be created (~2 minutes)

### 2. Get Your Credentials
1. Go to Project Settings → API
2. Copy:
   - **Project URL**: `https://dkwyycdrqnzjfczpwagg.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Run Database Schema
1. Go to SQL Editor in Supabase dashboard
2. Click "New Query"
3. Copy entire contents of `supabase-schema.sql`
4. Paste into editor
5. Click "Run" (or press Ctrl+Enter)
6. Wait for "Success" message

This creates:
- 5 tables (rooms, bookings, guests, reviews, room_status)
- Sample data (4 rooms, 6 reviews)
- Indexes for performance
- Row Level Security policies

### 4. Fix RLS Policies
1. Click "New Query" again
2. Copy entire contents of `fix-rls-policies.sql`
3. Paste into editor
4. Click "Run"
5. Verify success

This updates policies to allow admin operations using the anon key.

### 5. Add to Environment Variables
Add these to `frontend/.env`:

```env
VITE_SUPABASE_URL=https://dkwyycdrqnzjfczpwagg.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Database Schema

### Tables

#### rooms
Stores hotel room information
- `id` (uuid, PK)
- `room_id` (text, unique) - URL-friendly identifier
- `name` (text) - Display name
- `tagline` (text) - Short description
- `description` (text) - Brief overview
- `long_description` (text) - Detailed description
- `price` (numeric) - Price per night
- `image` (text) - Main image URL
- `gallery` (text[]) - Array of image URLs
- `bed` (text) - Bed type
- `size` (text) - Room size
- `guests` (integer) - Max guests
- `rating` (numeric) - Average rating
- `reviews_count` (integer) - Number of reviews
- `amenities` (text[]) - Array of amenities
- `available` (integer) - Available rooms count
- `view` (text) - Room view description
- `created_at`, `updated_at` (timestamp)

#### bookings
Stores guest reservations
- `id` (uuid, PK)
- `booking_id` (text, unique) - Booking reference
- `guest_id` (uuid, FK → guests)
- `room_id` (uuid, FK → rooms)
- `check_in` (date)
- `check_out` (date)
- `guests_count` (integer)
- `amount` (numeric) - Total price
- `status` (text) - pending, confirmed, cancelled, completed
- `special_requests` (text)
- `created_at`, `updated_at` (timestamp)

#### guests
Stores guest information
- `id` (uuid, PK)
- `first_name` (text)
- `last_name` (text)
- `email` (text, unique)
- `phone` (text)
- `country` (text)
- `created_at`, `updated_at` (timestamp)

#### reviews
Stores customer reviews
- `id` (uuid, PK)
- `guest_name` (text)
- `country` (text)
- `review_date` (date)
- `rating` (integer) - 1-5 stars
- `room_type` (text)
- `text` (text) - Review content
- `verified` (boolean)
- `created_at` (timestamp)

#### room_status
Tracks real-time room availability
- `id` (uuid, PK)
- `room_id` (uuid, FK → rooms)
- `room_number` (text)
- `status` (text) - available, occupied, maintenance, cleaning
- `updated_at` (timestamp)

## Row Level Security (RLS)

### Current Setup
- RLS is enabled on all tables
- Policies allow public access (using anon key)
- Suitable for admin operations without authentication

### Policies
- **SELECT**: Anyone can read data
- **INSERT**: Anyone can create records
- **UPDATE**: Anyone can modify records
- **DELETE**: Anyone can delete records

### For Production
Consider implementing:
1. Supabase Auth for admin login
2. Restrictive policies checking `auth.role() = 'authenticated'`
3. Role-based access control
4. Audit logging

## API Usage

### In the Project
API functions are located in `frontend/src/api/`:
- `rooms.api.ts` - Room operations
- `bookings.api.ts` - Booking operations
- `guests.api.ts` - Guest operations
- `reviews.api.ts` - Review operations
- `dashboard.api.ts` - Dashboard stats

### Example Usage
```typescript
import { getRooms, createRoom } from '@/api';

// Get all rooms
const rooms = await getRooms();

// Create a room
const newRoom = await createRoom({
  room_id: 'deluxe-suite',
  name: 'Deluxe Suite',
  price: 250,
  // ... other fields
});
```

## Troubleshooting

### Connection Error
- Verify Supabase URL is correct
- Check anon key is correct
- Ensure environment variables are loaded
- Restart development server

### RLS Policy Error
- Run `fix-rls-policies.sql` in SQL Editor
- Verify policies exist: `SELECT * FROM pg_policies WHERE tablename = 'rooms'`
- Check for error messages in SQL Editor

### Data Not Showing
- Verify `supabase-schema.sql` ran successfully
- Check Table Editor in Supabase dashboard
- Look for data in tables
- Check browser console for errors

### Cannot Insert/Update
- Run `fix-rls-policies.sql`
- Verify RLS policies are correct
- Check for foreign key constraints
- Look at error message details

## Monitoring

### Supabase Dashboard
- **Table Editor**: View and edit data
- **SQL Editor**: Run queries
- **Database**: Monitor performance
- **API**: View API usage
- **Logs**: Check error logs

### Useful Queries

#### Check all tables
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

#### Count records
```sql
SELECT 
  (SELECT COUNT(*) FROM rooms) as rooms,
  (SELECT COUNT(*) FROM bookings) as bookings,
  (SELECT COUNT(*) FROM guests) as guests,
  (SELECT COUNT(*) FROM reviews) as reviews;
```

#### View RLS policies
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies 
WHERE tablename IN ('rooms', 'bookings', 'guests', 'reviews')
ORDER BY tablename, policyname;
```

## Backup

### Manual Backup
1. Go to Database → Backups
2. Click "Create backup"
3. Wait for completion
4. Download if needed

### Automatic Backups
- Free tier: Daily backups (7 days retention)
- Pro tier: Point-in-time recovery

## Limits (Free Tier)

- **Database Size**: 500 MB
- **Bandwidth**: 5 GB/month
- **API Requests**: Unlimited
- **Concurrent Connections**: 60

## Security Best Practices

1. **Never commit credentials** - Use environment variables
2. **Use RLS policies** - Always enable Row Level Security
3. **Validate input** - Check data before inserting
4. **Monitor usage** - Check dashboard regularly
5. **Backup regularly** - Create manual backups before major changes

## Resources

- **Dashboard**: https://supabase.com/dashboard
- **Documentation**: https://supabase.com/docs
- **API Reference**: https://supabase.com/docs/reference/javascript
- **Support**: https://supabase.com/support
- **Community**: https://github.com/supabase/supabase/discussions
