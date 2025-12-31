-- ============================================
-- Admin Setup for Image-to-URL
-- ============================================
-- Run this in your Supabase SQL Editor
-- Replace 'your-email@example.com' with your actual email

-- 1. Set a user as admin
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'blog.boopul@gmail.com';

-- 2. Verify admin users
SELECT 
    email, 
    raw_user_meta_data->>'is_admin' as is_admin,
    created_at
FROM auth.users 
WHERE raw_user_meta_data->>'is_admin' = 'true';

-- 3. Check all uploads (including anonymous)
SELECT 
    COUNT(*) as total_uploads,
    COUNT(CASE WHEN user_id IS NULL THEN 1 END) as anonymous_uploads,
    COUNT(CASE WHEN user_id IS NOT NULL THEN 1 END) as user_uploads
FROM public.uploads;

-- 4. View sample uploads with user info
SELECT 
    id,
    file_name,
    CASE 
        WHEN user_id IS NULL THEN 'Anonymous'
        ELSE 'Registered User'
    END as upload_type,
    status,
    created_at
FROM public.uploads
ORDER BY created_at DESC
LIMIT 10;
