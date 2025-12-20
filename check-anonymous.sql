-- Quick check: Do anonymous uploads exist in database?
SELECT 
    COUNT(*) FILTER (WHERE user_id IS NULL) as anonymous_uploads,
    COUNT(*) FILTER (WHERE user_id IS NOT NULL) as user_uploads,
    COUNT(*) as total_uploads
FROM public.uploads;

-- Show recent anonymous uploads
SELECT 
    id,
    file_name,
    image_url,
    user_id,
    status,
    created_at
FROM public.uploads
WHERE user_id IS NULL
ORDER BY created_at DESC
LIMIT 5;
