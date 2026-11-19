-- Create a table for bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public submission)
CREATE POLICY "Allow public insert" ON bookings
  FOR INSERT
  WITH CHECK (true);

-- Allow only authenticated users to view (admin)
CREATE POLICY "Allow admin select" ON bookings
  FOR SELECT
  USING (auth.role() = 'authenticated');
