<div align="center">

# 🖼️ ImageToURL

### **Transform Images into Shareable Links in Seconds**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-imagetourl.cloud-00D4FF?style=for-the-badge)](https://imagetourl.cloud)
[![GitHub Stars](https://img.shields.io/github/stars/boopul22/image-to-url?style=for-the-badge&logo=github&color=yellow)](https://github.com/boopul22/image-to-url/stargazers)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

<img src="https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js" alt="Next.js" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
<img src="https://img.shields.io/badge/Cloudflare_R2-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare" />
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />

<br/><br/>

[**🚀 Try it Now**](https://imagetourl.cloud) &nbsp;•&nbsp; [**🐛 Report Bug**](https://github.com/boopul22/image-to-url/issues)

<br/>

---

</div>

## � What is ImageToURL?

**[ImageToURL](https://imagetourl.cloud)** is a **free, lightning-fast image hosting platform** that instantly converts your images into shareable URLs. Perfect for developers, content creators, and anyone who needs quick image sharing.

<div align="center">

| ⚡ **<50ms Latency** | 🌍 **Global CDN** | 🔒 **Secure Storage** | 📱 **Mobile Ready** |
|:---:|:---:|:---:|:---:|
| Lightning fast uploads | Cloudflare R2 powered | Enterprise security | Fully responsive |

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🖼️ Image Hosting
- ✅ Drag & drop upload
- ✅ Multi-format support (JPG, PNG, WebP, GIF, SVG)
- ✅ Bulk upload capability
- ✅ Instant URL generation
- ✅ Forever free tier

</td>
<td width="50%">

### 🛠️ 26+ Tools
- 🔗 Image to URL converter
- 📄 PDF to URL generator
- 🎨 Base64 to URL decoder
- 📱 QR code generator
- ✂️ Image embed code creator

</td>
</tr>
<tr>
<td width="50%">

### 🎨 User Experience
- 🌙 Beautiful dark mode
- 🌐 Multi-language support
- 📊 User dashboard
- 🍪 GDPR compliant
- ♿ Accessible design

</td>
<td width="50%">

### ⚙️ Developer Features
- 🔐 Supabase authentication
- 📡 RESTful API access
- 🔄 Webhook support
- 📈 Analytics integration
- 🚀 Edge-optimized delivery

</td>
</tr>
</table>

---

## �️ Tech Stack

<div align="center">

| Layer | Technology |
|:---:|:---|
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js_16-000?logo=next.js) ![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind_4-38B2AC?logo=tailwind-css&logoColor=white) ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?logo=radix-ui) |
| **Backend** | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white) |
| **Storage** | ![Cloudflare](https://img.shields.io/badge/Cloudflare_R2-F38020?logo=cloudflare&logoColor=white) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel) |

</div>

---

## � Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/boopul22/image-to-url.git
cd image-to-url

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Run development server
npm run dev
```

<details>
<summary>📋 <strong>Environment Variables</strong></summary>

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://imagetourl.cloud

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cloudflare R2
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=your-bucket-name
```

</details>

---

## 📁 Project Structure

```
📦 image-to-url
├── 📂 app/                 # Next.js App Router
│   ├── 📂 [locale]/        # i18n routes
│   │   ├── 📂 tools/       # 26+ conversion tools
│   │   ├── 📂 dashboard/   # User dashboard
│   │   └── 📄 page.tsx     # Homepage
│   └── 📂 api/             # API endpoints
├── 📂 components/          # React components
├── 📂 lib/                 # Utilities
└── 📂 public/              # Static assets
```

---

## 🌐 Deploy Your Own

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/boopul22/image-to-url)

</div>

---

## 🤝 Contributing

Contributions are **always welcome**!

```bash
# Fork → Clone → Branch → Code → Push → PR
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

---

## �‍💻 Author

<div align="center">

**Boopul** — *AI-powered creator & no-code explorer*

[![GitHub](https://img.shields.io/badge/GitHub-@boopul22-181717?style=for-the-badge&logo=github)](https://github.com/boopul22)
[![Instagram](https://img.shields.io/badge/Instagram-@no.code__boopul-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/no.code_boopul)
[![Email](https://img.shields.io/badge/Email-blog.boopul@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:blog.boopul@gmail.com)

</div>

---

<div align="center">

### 🔗 Quick Links

[🌐 Website](https://imagetourl.cloud) &nbsp;•&nbsp; [💬 Issues](https://github.com/boopul22/image-to-url/issues) &nbsp;•&nbsp; [📄 License](LICENSE)

---

**⭐ Star this repo if it helped you!**

<sub>Made with ❤️ by <a href="https://github.com/boopul22">Boopul</a> • Powered by <a href="https://imagetourl.cloud">ImageToURL</a></sub>

</div>
