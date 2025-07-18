-- CBRE Capital Market Landmark Deals Database Schema

-- Create deals table
CREATE TABLE deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_name VARCHAR NOT NULL,
  property_image_url TEXT,
  country TEXT NOT NULL CHECK (country IN ('Japan', 'Korea', 'Taiwan', 'Hong Kong', 'China', 'Singapore', 'Maldives', 'Australia', 'India', 'New Zealand', 'Philippines', 'Vietnam', 'Thailand')),
  deal_price_usd DECIMAL(10,2) NOT NULL,
  deal_price_sgd DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Investment Property Sales', 'Services')),
  subcategory TEXT NOT NULL,
  deal_date TEXT NOT NULL, -- Q2 2024 format
  buyer TEXT NOT NULL,
  seller TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_deals_country_category ON deals(country, category);
CREATE INDEX idx_deals_price_date ON deals(deal_price_usd, deal_date);
CREATE INDEX idx_deals_subcategory ON deals(subcategory);
CREATE INDEX idx_deals_buyer ON deals(buyer);
CREATE INDEX idx_deals_seller ON deals(seller);
CREATE INDEX idx_deals_created_at ON deals(created_at);

-- Full-text search index
CREATE INDEX idx_deals_search ON deals USING gin(to_tsvector('english', 
  property_name || ' ' || buyer || ' ' || seller));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_deals_updated_at 
    BEFORE UPDATE ON deals 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for the deals display)
CREATE POLICY "Public deals are viewable by everyone" ON deals
FOR SELECT USING (true);

-- Create policies for authenticated users to insert/update/delete
-- Note: In production, you might want more restrictive policies
CREATE POLICY "Authenticated users can insert deals" ON deals
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update deals" ON deals
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete deals" ON deals
FOR DELETE USING (auth.role() = 'authenticated');

-- Create a view for deals with computed fields
CREATE OR REPLACE VIEW deals_with_search AS
SELECT 
  *,
  to_tsvector('english', property_name || ' ' || buyer || ' ' || seller) as search_vector
FROM deals;

-- Sample data for testing
INSERT INTO deals (property_name, property_image_url, country, deal_price_usd, deal_price_sgd, category, subcategory, deal_date, buyer, seller) VALUES
('Marina Bay Financial Centre Tower 3', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', 'Singapore', 1200.00, 1620.00, 'Investment Property Sales', 'Office', 'Q2 2024', 'Keppel REIT', 'CapitaLand'),
('Tokyo Midtown Office Complex', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf', 'Japan', 800.50, 1080.68, 'Investment Property Sales', 'Office', 'Q1 2024', 'Mitsubishi Estate', 'Mitsui Fudosan'),
('Hong Kong Central Plaza', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000', 'Hong Kong', 650.25, 877.84, 'Investment Property Sales', 'Office', 'Q3 2024', 'Sun Hung Kai Properties', 'Henderson Land'),
('Seoul Digital Media City', 'https://images.unsplash.com/photo-1590052307806-5a8c35c5cc49', 'Korea', 450.75, 608.51, 'Investment Property Sales', 'Office', 'Q2 2024', 'Lotte Group', 'Samsung C&T'),
('Taipei 101 Shopping Center', 'https://images.unsplash.com/photo-1574341708623-838a5d23fb30', 'Taiwan', 320.00, 432.00, 'Investment Property Sales', 'Retail', 'Q1 2024', 'Cathay Real Estate', 'Far Eastern Group'),
('Beijing Financial Street Tower', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071', 'China', 890.30, 1201.80, 'Investment Property Sales', 'Office', 'Q4 2023', 'China Vanke', 'SOHO China'),
('Sydney Harbour Business District', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9', 'Australia', 750.00, 1012.50, 'Investment Property Sales', 'Office', 'Q2 2024', 'Mirvac Group', 'Lendlease'),
('One Raffles Place', 'https://images.unsplash.com/photo-1497366216548-37526070297c', 'Singapore', 1500.00, 2025.00, 'Services', 'Capital Advisors', 'Q3 2024', 'GIC Private Limited', 'Temasek Holdings'),
('Shibuya Sky Tower', 'https://images.unsplash.com/photo-1551515042-1151a2c43a3b', 'Japan', 680.00, 918.00, 'Investment Property Sales', 'Residential / Multifamily', 'Q1 2024', 'Nomura Real Estate', 'Sumitomo Realty'),
('Incheon Logistics Hub', 'https://images.unsplash.com/photo-1586953208448-b95a79798f07', 'Korea', 280.50, 378.68, 'Investment Property Sales', 'Industrial & Logistics', 'Q2 2024', 'CJ Group', 'Doosan Group'); 