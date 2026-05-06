-- ============================================
-- DELETE ALL MOCK DATA FROM DATABASE
-- Run this in your Supabase SQL Editor to remove all existing mock data
-- ============================================

-- Delete all existing reviews (mock data)
DELETE FROM reviews;

-- Delete all existing room status entries (mock data)
DELETE FROM room_status;

-- Delete all existing bookings (if any mock data exists)
DELETE FROM bookings;

-- Delete all existing guests (if any mock data exists)
DELETE FROM guests;

-- Delete all existing rooms (mock data)
DELETE FROM rooms;

-- ============================================
-- IMPORTANT: After running this script:
-- 1. All mock data will be removed
-- 2. You must create rooms through the admin panel at /admin/rooms
-- 3. Users will create bookings by booking rooms
-- 4. Users will submit reviews after their stay
-- 5. Admin will approve reviews in /admin/reviews
-- ============================================

-- Verify deletion (should return 0 for all)
SELECT 'rooms' as table_name, COUNT(*) as count FROM rooms
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'guests', COUNT(*) FROM guests
UNION ALL
SELECT 'room_status', COUNT(*) FROM room_status;
