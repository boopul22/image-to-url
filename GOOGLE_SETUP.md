# Google AdSense & Verification Setup

This document explains how Google AdSense and Google Search Console verification are configured in this project.

## Google AdSense Configuration

### Current Setup
Google AdSense is **already configured and working** in this project.

**AdSense Client ID:** `ca-pub-7803867089582138`

**Location:** `app/layout.tsx`

The AdSense script is automatically loaded on all pages using Next.js Script component with `afterInteractive` strategy for optimal performance.

### How It Works
1. The AdSense script loads after the page becomes interactive
2. The script is loaded from: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`
3. No additional configuration needed - ads will display once approved by Google

### Adding Ad Units
To display ads on your pages, add ad units like this:

```tsx
<ins className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client="ca-pub-7803867089582138"
     data-ad-slot="YOUR_AD_SLOT_ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## Google Search Console Verification

### Setup Instructions

1. **Get Your Verification Code:**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your property (imagetourl.cloud)
   - Choose "HTML tag" verification method
   - Copy the verification code from the meta tag

2. **Add to Environment Variables:**
   - Open `.env.local` file
   - Add: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code`
   - Example: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123xyz`

3. **Rebuild and Deploy:**
   ```bash
   npm run build
   ```

4. **Verify:**
   - The meta tag will automatically appear in your site's `<head>`
   - Go back to Search Console and click "Verify"

### How It Works
The verification meta tag is configured in `app/layout.tsx` metadata:

```typescript
verification: {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
}
```

This generates:
```html
<meta name="google-site-verification" content="your-code" />
```

## Security Configuration

### Headers
The site is configured with security headers in `next.config.mjs`:
- **X-DNS-Prefetch-Control:** Enabled for faster DNS lookups to Google domains
- **X-Frame-Options:** Set to SAMEORIGIN to prevent clickjacking

### Script Loading
- AdSense script uses `afterInteractive` strategy
- Loads after page is interactive for better performance
- Cross-origin attribute set to "anonymous" for security

## Troubleshooting

### AdSense Not Showing Ads
1. Ensure your AdSense account is approved
2. Check that ad units are properly configured
3. Wait 24-48 hours after approval for ads to appear
4. Check browser console for any script errors

### Verification Not Working
1. Verify the environment variable is set correctly
2. Rebuild the project after adding the verification code
3. Check that the meta tag appears in the page source
4. Try verification in an incognito browser window

### Script Blocked
If scripts are blocked:
1. Check browser console for CSP errors
2. Ensure no ad blockers are interfering
3. Verify the AdSense client ID is correct

## Environment Variables Reference

```bash
# Required for Google Search Console verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# AdSense client ID is hardcoded in app/layout.tsx
# No environment variable needed
```

## Support

- [Google AdSense Help](https://support.google.com/adsense)
- [Search Console Help](https://support.google.com/webmasters)
