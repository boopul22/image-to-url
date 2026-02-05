-- Migration: Create banned_email_domains table for blocking signups from specific domains
-- Run this in your Supabase SQL Editor

-- 1. Create the banned_email_domains table
CREATE TABLE IF NOT EXISTS banned_email_domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT UNIQUE NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by TEXT
);

-- 2. Enable RLS
ALTER TABLE banned_email_domains ENABLE ROW LEVEL SECURITY;

-- 3. Only service role (admin client) can access this table — no public access
-- No RLS policies for anon or authenticated roles means they get zero access.
-- The service_role key bypasses RLS entirely, so admin API routes work fine.

-- 4. Create an index on domain for fast lookups during signup
CREATE INDEX IF NOT EXISTS idx_banned_email_domains_domain ON banned_email_domains (domain);

-- 5. Verify table was created
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'banned_email_domains';
