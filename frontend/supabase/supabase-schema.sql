-- Hotel Booking System Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Rooms Table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id TEXT UNIQUE NOT NULL, -- e.g., "classic-king"
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  long_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  bed TEXT,
  size TEXT,
  guests INTEGER DEFAULT 2,
  rating DECIMAL(2, 1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  amenities JSONB DEFAULT '[]'::jsonb,
  available INTEGER DEFAULT 0,
  view TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guests Table
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id TEXT UNIQUE NOT NULL, -- e.g., "BK-2401"
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  amount DECIMAL(10, 2) NOT NULL,
  guests_count INTEGER DEFAULT 1,
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_name TEXT NOT NULL,
  country TEXT,
  review_date DATE DEFAULT CURRENT_DATE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  room_type TEXT,
  text TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Room Status Table (for admin dashboard)
CREATE TABLE room_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_number TEXT UNIQUE NOT NULL,
  room_type TEXT NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'cleaning', 'maintenance')),
  current_guest TEXT,
  checkout_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_bookings_guest_id ON bookings(guest_id);
CREATE INDEX idx_bookings_room_id ON bookings(room_id);
CREATE INDEX idx_bookings_check_in ON bookings(check_in);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_room_status_status ON room_status(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_room_status_updated_at BEFORE UPDATE ON room_status
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial room data
INSERT INTO rooms (room_id, name, tagline, description, long_description, price, image, gallery, bed, size, guests, rating, reviews_count, amenities, available, view) VALUES
('classic-king', 'Classic King', 'Timeless comfort', 'A serene retreat with king bed, marble bath, and warm city tones.', 'Our Classic King rooms balance understated elegance with every modern comfort. Wake to soft natural light, sink into premium linens, and enjoy a curated minibar selected by our resident sommelier.', 189.00, '/src/assets/room-standard.jpg', '["room-standard.jpg", "room-deluxe.jpg", "room-suite.jpg"]'::jsonb, 'King bed', '38 m²', 2, 4.7, 412, '["Free WiFi", "Air conditioning", "Breakfast", "Smart TV", "Minibar", "Safe"]'::jsonb, 8, 'City view'),
('deluxe-skyline', 'Deluxe Skyline', 'Floor-to-ceiling views', 'Panoramic windows frame the skyline at dusk. Walnut, brass, crisp linens.', 'Perched higher in the tower, the Deluxe Skyline pairs handcrafted walnut joinery with floor-to-ceiling windows. The sunset view alone is worth the booking.', 289.00, '/src/assets/room-deluxe.jpg', '["room-deluxe.jpg", "room-suite.jpg", "room-penthouse.jpg"]'::jsonb, 'King bed', '52 m²', 2, 4.9, 689, '["Free WiFi", "Air conditioning", "Breakfast", "Smart TV", "Espresso bar", "Rain shower", "Bathrobe"]'::jsonb, 3, 'Skyline view'),
('executive-suite', 'Executive Suite', 'A residence in the sky', 'Velvet lounge, marble dining, fireplace. For celebrations and slow mornings.', 'A spacious one-bedroom suite with a separate velvet lounge, marble dining for four, and a working fireplace. Designed for guests who turn a stay into an occasion.', 489.00, '/src/assets/room-suite.jpg', '["room-suite.jpg", "room-penthouse.jpg", "room-deluxe.jpg"]'::jsonb, 'King bed + sofa', '92 m²', 3, 4.9, 234, '["Free WiFi", "Lounge area", "Fireplace", "Espresso bar", "Marble bath", "Butler service", "Welcome bottle"]'::jsonb, 2, 'Panoramic'),
('penthouse', 'Penthouse Terrace', 'Private pool & sunset', 'Top-floor sanctuary with private plunge pool and 270° terrace.', 'The crown of Auréa Grand. A private terrace, plunge pool, outdoor lounge, and uninterrupted sunsets. Reserved for those who want the entire skyline to themselves.', 1290.00, '/src/assets/room-penthouse.jpg', '["room-penthouse.jpg", "room-suite.jpg", "room-deluxe.jpg"]'::jsonb, 'King bed', '180 m²', 4, 5.0, 88, '["Private pool", "Terrace", "Butler service", "Chef on request", "Champagne", "Fireplace", "Spa access"]'::jsonb, 1, '270° skyline');

-- Insert sample reviews
INSERT INTO reviews (guest_name, country, review_date, rating, room_type, text, verified) VALUES
('Helena Marlow', 'London, UK', '2026-03-15', 5, 'Deluxe Skyline', 'The service was so quietly attentive — every detail anticipated. The sunset from our window was unforgettable. We have already booked again.', true),
('Daniel Reyes', 'Toronto, CA', '2026-02-20', 5, 'Executive Suite', 'An absolute masterpiece of a hotel. The fireplace lounge in our suite, the spa, the breakfast — everything was first class.', true),
('Sara Khan', 'Dubai, UAE', '2026-01-10', 5, 'Penthouse Terrace', 'Booked for our anniversary. From the welcome champagne to the chef tasting menu, it felt cinematic. The terrace pool at sunset is unreal.', true),
('Marcus Lindqvist', 'Stockholm, SE', '2025-12-28', 5, 'Classic King', 'Even the entry-level room felt like a suite elsewhere. Linens, lighting, silence — everything is dialed in.', true),
('Isabela Rocha', 'Lisbon, PT', '2025-12-15', 4, 'Deluxe Skyline', 'Stunning property and staff. Only small note — would love a quicker breakfast service on weekends. Will return regardless.', true),
('Yusuf Demir', 'Istanbul, TR', '2025-11-22', 5, 'Executive Suite', 'Auréa understands hospitality the old way. Quiet, elegant, never performative. A rare experience.', true);

-- Insert sample room status
INSERT INTO room_status (room_number, room_type, status, current_guest, checkout_date) VALUES
('101', 'Classic King', 'occupied', 'John Doe', '2026-05-06'),
('102', 'Deluxe Skyline', 'cleaning', NULL, NULL),
('103', 'Executive Suite', 'available', NULL, NULL),
('201', 'Penthouse Terrace', 'occupied', 'Jane Smith', '2026-05-08'),
('202', 'Classic King', 'maintenance', NULL, NULL);

-- Enable Row Level Security (RLS)
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_status ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);

-- Create policies for public write access (for admin operations using anon key)
CREATE POLICY "Public can insert rooms" ON rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update rooms" ON rooms FOR UPDATE USING (true);
CREATE POLICY "Public can delete rooms" ON rooms FOR DELETE USING (true);

-- Create policies for authenticated users (admin)
CREATE POLICY "Authenticated users can manage guests" ON guests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage room status" ON room_status FOR ALL USING (auth.role() = 'authenticated');

-- Allow public to create bookings and guests
CREATE POLICY "Public can create guests" ON guests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view their bookings" ON bookings FOR SELECT USING (true);
