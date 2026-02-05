-- Migration: Admin RLS policies + user_email column on uploads
-- Run this in your Supabase SQL Editor

-- 1. Add user_email column to uploads table (stores email at upload time)
ALTER TABLE uploads
ADD COLUMN IF NOT EXISTS user_email TEXT;

-- Backfill existing uploads with emails from auth.users
UPDATE uploads u
SET user_email = a.email
FROM auth.users a
WHERE u.user_id = a.id
  AND u.user_email IS NULL;

-- 2. Enable RLS on uploads table (if not already enabled)
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;

-- 3. Allow admin users to SELECT all uploads
-- Admin status is stored in user metadata as is_admin = true
CREATE POLICY IF NOT EXISTS "admin_select_all_uploads"
ON uploads FOR SELECT
TO authenticated
USING (
  (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
  OR user_id = auth.uid()
  OR user_id IS NULL
);

-- 4. Allow admin users to DELETE all uploads
CREATE POLICY IF NOT EXISTS "admin_delete_all_uploads"
ON uploads FOR DELETE
TO authenticated
USING (
  (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
  OR user_id = auth.uid()
);

-- 5. Keep existing INSERT policy for all authenticated + anonymous users
-- (Only add if no INSERT policy exists yet)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'uploads' AND cmd = 'INSERT'
  ) THEN
    EXECUTE 'CREATE POLICY "anyone_can_insert_uploads" ON uploads FOR INSERT WITH CHECK (true)';
  END IF;
END $$;

-- 6. Verify policies
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'uploads';
