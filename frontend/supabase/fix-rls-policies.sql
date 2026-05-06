-- Fix Row Level Security Policies for Admin Operations
-- Run this in Supabase SQL Editor to fix the "row-level security policy" error

-- Drop existing restrictive policies for rooms
DROP POLICY IF EXISTS "Authenticated users can manage rooms" ON rooms;

-- Create new policies that allow public access (for admin using anon key)
CREATE POLICY "Public can insert rooms" ON rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update rooms" ON rooms FOR UPDATE USING (true);
CREATE POLICY "Public can delete rooms" ON rooms FOR DELETE USING (true);

-- Also update reviews policies for admin management
DROP POLICY IF EXISTS "Authenticated users can manage reviews" ON reviews;
CREATE POLICY "Public can insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update reviews" ON reviews FOR UPDATE USING (true);
CREATE POLICY "Public can delete reviews" ON reviews FOR DELETE USING (true);

-- Update room_status policies
DROP POLICY IF EXISTS "Authenticated users can manage room status" ON room_status;
CREATE POLICY "Public can update room status" ON room_status FOR UPDATE USING (true);
CREATE POLICY "Public can view room status" ON room_status FOR SELECT USING (true);

-- Update guests policies for admin
DROP POLICY IF EXISTS "Authenticated users can manage guests" ON guests;
CREATE POLICY "Public can view guests" ON guests FOR SELECT USING (true);
CREATE POLICY "Public can update guests" ON guests FOR UPDATE USING (true);
CREATE POLICY "Public can delete guests" ON guests FOR DELETE USING (true);

-- Update bookings policies for admin
DROP POLICY IF EXISTS "Authenticated users can manage bookings" ON bookings;
CREATE POLICY "Public can view all bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public can update bookings" ON bookings FOR UPDATE USING (true);
CREATE POLICY "Public can delete bookings" ON bookings FOR DELETE USING (true);

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('rooms', 'bookings', 'guests', 'reviews', 'room_status')
ORDER BY tablename, policyname;
