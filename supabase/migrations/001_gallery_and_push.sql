-- Migration: Add gallery token and push notification support
-- Run this in your Supabase SQL Editor

-- 1. Add gallery_token to anonymous_upload_tracking
ALTER TABLE anonymous_upload_tracking
ADD COLUMN IF NOT EXISTS gallery_token TEXT UNIQUE;

-- Create index for fast gallery token lookups
CREATE INDEX IF NOT EXISTS idx_gallery_token ON anonymous_upload_tracking(gallery_token);

-- 2. Add session_id to uploads table for linking anonymous uploads to gallery
ALTER TABLE uploads
ADD COLUMN IF NOT EXISTS session_id TEXT;

-- Create index for session-based upload queries
CREATE INDEX IF NOT EXISTS idx_uploads_session_id ON uploads(session_id);

-- 3. Create push_subscriptions table
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT
);

-- Create index for session-based subscription lookups
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_session ON push_subscriptions(session_id);

-- 4. Generate gallery tokens for existing sessions (optional)
-- UPDATE anonymous_upload_tracking
-- SET gallery_token = encode(gen_random_bytes(16), 'hex')
-- WHERE gallery_token IS NULL;
