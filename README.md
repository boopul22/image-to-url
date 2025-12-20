<p align="center">
  <img src="public/logo.svg" alt="ImageToURL Logo" width="120" height="120" />
</p>

<h1 align="center">ImageToURL</h1>

<p align="center">
  <strong>🚀 Free & Fast Image Hosting with Instant URL Generation</strong>
</p>

<p align="center">
  <a href="https://imagetourl.cloud">🌐 Live Demo</a> •
  <a href="#features">✨ Features</a> •
  <a href="#getting-started">🛠️ Getting Started</a> •
  <a href="#tech-stack">💻 Tech Stack</a> •
  <a href="#contributing">🤝 Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Cloudflare-R2-F38020?style=for-the-badge&logo=cloudflare" alt="Cloudflare R2" />
</p>

---

## 🌟 Overview

**[ImageToURL](https://imagetourl.cloud)** is a modern, free image hosting platform that lets you upload images and instantly get shareable URLs. Built with performance and user experience in mind, it provides lightning-fast uploads with global CDN delivery through Cloudflare R2.

Whether you need to share images on forums, embed them in markdown, or generate social media-ready links — ImageToURL has you covered with 26+ specialized tools.

---

## ✨ Features

### 🖼️ Core Features
- **Instant Image Upload** — Drag & drop or click to upload images
- **Free Forever** — No subscription required for basic usage
- **Lightning Fast** — <50ms latency with global CDN
- **99.9% Uptime** — Enterprise-grade reliability
- **Multiple Format Support** — JPG, PNG, WebP, GIF, SVG, and more

### 🛠️ 26+ Conversion Tools
| Tool | Description |
|------|-------------|
| **Image to URL** | Convert any image to a shareable URL |
| **JPG to URL** | Specifically optimized for JPEG images |
| **PNG to URL** | Preserve transparency with PNG support |
| **WebP to URL** | Next-gen format with superior compression |
| **GIF to URL** | Animated image support |
| **SVG to URL** | Vector graphics hosting |
| **PDF to URL** | Document to link conversion |
| **Base64 to URL** | Convert encoded images to URLs |
| **Bulk Upload** | Upload multiple images at once |
| **QR to URL** | Generate QR codes for your images |
| **Image to Short URL** | Shortened links for easy sharing |
| **Image Embed Code** | Generate HTML embed snippets |
| ... and many more! |

### 🎨 User Experience
- **Dark Mode Default** — Beautiful, eye-friendly dark theme
- **Multi-Language Support** — Internationalization ready
- **Mobile Responsive** — Works perfectly on all devices
- **SEO Optimized** — Rich structured data and meta tags
- **Cookie Consent** — GDPR compliant

### 🔐 Security & Authentication
- **Supabase Auth** — Secure user authentication
- **Dashboard Access** — Manage your uploaded images
- **API Access** — Programmatic image uploads

---

## 💻 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) with App Router |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Authentication** | [Supabase Auth](https://supabase.com/auth) |
| **Storage** | [Cloudflare R2](https://www.cloudflare.com/r2/) |
| **Database** | [Supabase (PostgreSQL)](https://supabase.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account
- Cloudflare R2 account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/boopul22/image-to-url.git
   cd image-to-url
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your credentials:
   ```env
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://imagetourl.cloud
   
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   
   # Cloudflare R2 Configuration
   R2_ACCOUNT_ID=your-r2-account-id
   R2_ACCESS_KEY_ID=your-r2-access-key-id
   R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
   R2_BUCKET_NAME=your-r2-bucket-name
   
   # Google Configuration (Optional)
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-code
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) to see the app.

### Database Setup

Set up your Supabase database using the provided SQL files:
- `setup-admin.sql` — Admin configuration
- `check-anonymous.sql` — Anonymous user checks

---

## 📁 Project Structure

```
image-to-url/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── about/         # About page
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # User dashboard
│   │   ├── pricing/       # Pricing page
│   │   ├── tools/         # 26+ conversion tools
│   │   └── use-cases/     # Use case pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities & configurations
├── public/                # Static assets
├── styles/                # Global styles
└── types/                 # TypeScript definitions
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/boopul22/image-to-url)

1. Click the button above
2. Configure environment variables in Vercel dashboard
3. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Docker

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Boopul** — AI-powered creator, no-code explorer, and disciplined builder

- 💻 GitHub: [@boopul22](https://github.com/boopul22)
- 📸 Instagram: [@no.code_boopul](https://www.instagram.com/no.code_boopul)
- ✉️ Email: blog.boopul@gmail.com

---

## 🔗 Links

- **Website**: [https://imagetourl.cloud](https://imagetourl.cloud)
- **Documentation**: [API Docs](https://imagetourl.cloud/api-docs)
- **Report Issues**: [GitHub Issues](https://github.com/boopul22/image-to-url/issues)

---

<p align="center">
  <strong>⭐ If this project helped you, consider giving it a star!</strong>
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/boopul22">Boopul</a>
</p>
