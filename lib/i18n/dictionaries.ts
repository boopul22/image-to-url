import type { Locale } from "./config"

const dictionaries = {
  en: {
    nav: {
      home: "Home",
      blog: "Blog",
      documentation: "Documentation",
      api: "API",
      pricing: "Pricing",
      signIn: "Sign In",
      signOut: "Sign Out",
      dashboard: "Dashboard",
      tools: "Tools",
    },
    blog: {
      title: "Blog",
      readMore: "Read more",
      readingTime: "{minutes} min read",
      postedOn: "Posted on",
      byAuthor: "by",
      relatedPosts: "Related Posts",
      categories: "Categories",
      tags: "Tags",
      sharePost: "Share this post",
      tableOfContents: "Table of Contents",
      allPosts: "All Posts",
      noPosts: "No posts found",
      featured: "Featured",
      latestPosts: "Latest Posts",
      searchPosts: "Search posts...",
      subtitle: "about image hosting, optimization, and web development",
    },
    search: {
      placeholder: "Search posts, categories, tags...",
      noResults: "No results found for",
      startTyping: "Start typing to search...",
      navigate: "Navigate",
      select: "Select",
      close: "Close",
      typePost: "post",
      typeCategory: "category",
      typeTag: "tag",
    },
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign Out",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      loginToAccess: "Login to access your uploads",
      createAccount: "Create an account",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
    },
    dashboard: {
      title: "Dashboard",
      myUploads: "My Uploads",
      totalUploads: "Total Uploads",
      storageUsed: "Storage Used",
      noUploads: "No uploads yet",
      uploadFirst: "Upload your first image from the home page",
      expiresIn: "Expires in",
      setExpiry: "Set Expiry",
      deleteUpload: "Delete Upload",
      confirmDelete: "Are you sure you want to delete this image?",
      deleteWarning: "This will permanently delete the image from storage. This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      customExpiry: "Set Custom Expiry Time",
      expiryDescription: "Choose when this image should be automatically deleted",
      quickPresets: "Quick Presets",
      currentExpiry: "Current expiry",
    },
    uploadLimit: {
      remaining: "You have {count} uploads remaining",
      limitReached: "Upload limit reached! Sign in to continue uploading.",
      benefits: "Sign in to access uploads later and manage URLs",
      uploadsRemaining: "uploads remaining. Sign in to get unlimited uploads!",
    },
    hero: {
      badge: "v2.0 Now Available",
      title: "Free Image to URL",
      titleGradient: "Converter",
      description:
        "Convert any image to a shareable URL in seconds. Simply drag and drop your JPG, PNG, GIF, SVG, or WebP file—no signup required. Powered by a global edge CDN for lightning-fast delivery.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    howTo: {
      title: "How to Convert Image to URL",
      steps: [
        {
          title: "Select Your Image",
          description: "Click the upload area or drag and drop any JPG, PNG, GIF, SVG, or WebP file (up to 10MB)",
        },
        {
          title: "Automatic Upload",
          description: "Your image is instantly uploaded and distributed across our global CDN network",
        },
        {
          title: "Copy Your URL",
          description: "Click the copy button to get your permanent, shareable image link—ready to use anywhere",
        },
      ],
    },
    trust: {
      title: "Trusted Worldwide",
      subtitle: "Join millions of users who rely on ImageToURL for fast, secure image hosting",
      comingSoon: "Testimonials coming soon",
    },
    testimonials: {
      title: "What Our Users Say",
      items: [
        {
          name: "Sarah Chen",
          role: "Frontend Developer",
          company: "TechFlow",
          quote: "ImageToURL has become essential for my workflow. I use it daily for embedding images in documentation and Discord bots. The speed is unmatched!",
          avatar: "SC",
          rating: 5,
        },
        {
          name: "Marcus Johnson",
          role: "Designer",
          company: "CreativeStudio",
          quote: "No signup, no ads, just fast image hosting. Exactly what I needed for quick mockup sharing with clients. The global CDN makes a huge difference.",
          avatar: "MJ",
          rating: 5,
        },
        {
          name: "Emily Rodriguez",
          role: "Content Creator",
          company: "",
          quote: "I've tried many image hosting services, but ImageToURL is the simplest. Upload, copy link, done. Perfect for my blog posts and social media.",
          avatar: "ER",
          rating: 5,
        },
        {
          name: "David Kim",
          role: "Full Stack Developer",
          company: "StartupLabs",
          quote: "The API is clean and well-documented. Integrated it into our app in under an hour. Love the custom expiry feature for temporary assets.",
          avatar: "DK",
          rating: 5,
        },
        {
          name: "Priya Patel",
          role: "E-commerce Manager",
          company: "ShopWave",
          quote: "We use ImageToURL for product images across marketplaces. Reliable, fast, and the direct URLs work everywhere. Highly recommend!",
          avatar: "PP",
          rating: 4,
        },
        {
          name: "Alex Thompson",
          role: "Discord Bot Developer",
          company: "",
          quote: "Finally, an image host that gives direct URLs that actually work in Discord embeds. No more broken images or redirects. Game changer!",
          avatar: "AT",
          rating: 5,
        },
      ],
    },
    comparison: {
      title: "How We Compare",
      subtitle: "See how ImageToURL stacks up against popular image hosting services",
    },
    useCasesHighlights: {
      title: "Built for Every Use Case",
      subtitle: "From Discord bots to e-commerce, ImageToURL powers image sharing across the web",
    },
    popularTools: {
      title: "Popular Image Hosting Tools",
      subtitle: "Explore our suite of free tools for converting images to shareable URLs",
    },
    relatedTopics: {
      title: "Related Topics",
    },
    upload: {
      clickToUpload: "Click to upload or drag and drop",
      fileTypes: "SVG, PNG, JPG or GIF (max. 10MB)",
      secure: "Secure & Encrypted",
      cdn: "Global CDN",
      errorInvalidType: "Invalid file type. Please upload an image.",
      errorTooLarge: "File is too large. Max size is 10MB.",
      errorGeneral: "Something went wrong.",
      shareableLink: "Shareable Link",
      copy: "Copy",
      copied: "Copied",
      uploadAnother: "Upload Another",
      openLink: "Open Link",
    },
    stats: {
      imagesUploaded: "Images Uploaded",
      uptime: "Uptime",
      latency: "Latency",
    },
    footer: {
      copyright: "© 2024 ImageToURL Cloud. All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
      categories: {
        converters: "Image Converters",
        useCases: "Use Cases",
        company: "Company",
        legal: "Legal",
      },
      links: {
        home: "Home",
        blog: "Blog",
        about: "About",
        discord: "Discord Images",
        html: "HTML & CSS",
        fantasy: "Fantasy Sports",
        minecraft: "Minecraft",
      },
      badge: "Free image to URL converter powered by global CDN",
    },
    meta: {
      title: "Image to URL Converter - Free Instant Link Generator | ImageToURL",
      description:
        "Convert any image to URL in seconds. Free image hosting with no signup. Upload JPG, PNG, GIF, WebP up to 10MB. Get instant shareable links via global CDN.",
      keywords: "image to url, convert image to url, image url converter, free image hosting, image link generator, photo to url, upload image get link, jpg to url, png to url, gif to url, image to link, picture to url, online image hosting, shareable image link, image to url converter free, copy image to url, instant image sharing",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How do I convert an image to a URL?",
          answer: "Simply drag and drop your image onto our upload zone or click to select a file. Your image will be instantly uploaded to our global CDN, and you'll receive a shareable URL that you can copy and use anywhere."
        },
        {
          question: "Is ImageToURL completely free to use?",
          answer: "Yes, ImageToURL is 100% free for basic use. You can upload images up to 10MB without creating an account. Sign in for additional features like managing your uploads and setting custom expiration times."
        },
        {
          question: "What image formats are supported?",
          answer: "We support all popular image formats including JPG/JPEG, PNG, GIF, SVG, and WebP. Each file can be up to 10MB in size. You can convert any of these formats to a shareable URL instantly."
        },
        {
          question: "How long are my images stored?",
          answer: "Anonymous uploads are stored for 30 days by default. Signed-in users can set custom expiration times or keep images indefinitely. All images are served through our global CDN for fast delivery worldwide."
        },
        {
          question: "Is my data secure?",
          answer: "Yes, all uploads are encrypted in transit using HTTPS. Images are stored on enterprise-grade cloud infrastructure with 99.9% uptime. We do not sell or share your data with third parties."
        },
        {
          question: "How do I copy an image URL?",
          answer: "After uploading your image, click the 'Copy' button next to the generated URL. The link is automatically copied to your clipboard and ready to paste anywhere - websites, emails, social media, or documents."
        },
        {
          question: "Can I convert a base64 image to URL?",
          answer: "Yes! Use our Base64 to URL converter tool to transform base64-encoded images into shareable URLs. Simply paste your base64 string and get an instant image link hosted on our global CDN."
        },
        {
          question: "How do I get an image URL for Discord?",
          answer: "Upload your image to ImageToURL and copy the generated link. You can paste this URL directly in Discord chats, embed it in bots, or use it for custom emojis and server icons. Our URLs work perfectly with Discord's image embedding."
        },
        {
          question: "Is there an API for image to URL conversion?",
          answer: "Yes, we provide a simple API for developers to programmatically upload images and receive URLs. Check our API documentation for integration details, code examples in JavaScript, Python, and more."
        },
        {
          question: "How do I bulk upload images and get URLs?",
          answer: "Use our Bulk Upload tool to upload multiple images at once. Simply drag and drop up to 20 images simultaneously and receive shareable URLs for each one. Perfect for batch image hosting needs."
        },
        {
          question: "Can I use ImageToURL for fantasy football team logos?",
          answer: "Absolutely! ImageToURL is perfect for creating custom team logos for ESPN, Yahoo, or any fantasy sports platform. Upload your logo image, copy the URL, and paste it in your fantasy league settings."
        },
        {
          question: "How do I make an image into a short URL?",
          answer: "Our image URLs are already optimized for sharing. When you upload an image, we generate a clean, short URL that's easy to share and remember. The link leads directly to your hosted image."
        },
        {
          question: "What's the difference between image URL and base64?",
          answer: "An image URL is a web link that points to your hosted image, while base64 is the image encoded as text data. URLs are better for sharing and web use as they're shorter and more efficient. Use our tools to convert between formats."
        }
      ]
    },
    tools: {
      "jpg-to-url": {
        title: "JPG to URL Converter",
        subtitle: "Free Online JPEG Image Hosting",
        description: "Convert your JPG and JPEG images to shareable URLs instantly. No signup required, just upload and share.",
        introduction: {
          title: "Understanding JPG to URL Conversion",
          paragraphs: [
            "JPG (Joint Photographic Experts Group) is the most widely used image format on the web, known for its excellent compression of photographs and complex images. When you need to share a JPG image online, converting it to a URL allows you to embed it anywhere—from websites and emails to social media posts and documents.",
            "Our free JPG to URL converter instantly uploads your JPEG files to a global content delivery network (CDN), generating a permanent, shareable link. Unlike temporary file-sharing services, these URLs are designed for reliability and speed, with edge servers ensuring fast loading times for viewers worldwide.",
            "Whether you're a blogger embedding product photos, a developer testing image displays, or simply sharing memories with friends, converting your JPG to a URL is the most efficient way to make your images accessible online without dealing with file attachments or size limits.",
          ],
        },
        features: {
          title: "Why Use Our JPG to URL Converter?",
          items: [
            "100% free with no hidden costs",
            "No account or signup required",
            "Support for JPG and JPEG formats",
            "Files up to 10MB supported",
            "Instant shareable links",
            "Global CDN for fast delivery",
            "99.9% uptime guarantee",
            "Secure HTTPS links",
          ],
        },
        howItWorks: {
          title: "How to Convert JPG to URL",
          steps: [
            {
              title: "Upload Your JPG",
              description: "Drag and drop your JPG file or click to browse. We accept JPG and JPEG files up to 10MB.",
            },
            {
              title: "Get Your URL",
              description: "Your image is instantly uploaded to our global CDN. A shareable URL is generated automatically.",
            },
            {
              title: "Share Anywhere",
              description: "Copy the URL and use it anywhere - websites, social media, emails, or documents.",
            },
          ],
        },
        useCases: {
          title: "Common Use Cases for JPG URLs",
          items: [
            { title: "Website Development", description: "Embed product images, portfolio photos, or blog illustrations directly in HTML without worrying about hosting infrastructure." },
            { title: "Email Marketing", description: "Include reliable image links in email newsletters without hitting attachment limits or broken inline images." },
            { title: "Social Media Sharing", description: "Share high-quality photos with direct links that preview correctly across all major platforms." },
            { title: "Documentation & Wikis", description: "Add screenshots, diagrams, and visual aids to README files, help docs, and internal wikis." },
            { title: "E-commerce Listings", description: "Host product images for listings on multiple marketplaces like eBay, Etsy, or Amazon." },
            { title: "Fantasy Sports & Gaming", description: "Create custom team logos and avatars for ESPN, Yahoo Fantasy, Discord, and gaming platforms." },
          ],
        },
        tips: {
          title: "Pro Tips for JPG Hosting",
          items: [
            "Optimize your JPG before uploading to reduce file size without visible quality loss—tools like TinyJPG can help.",
            "Use descriptive filenames for better organization when managing multiple images in your dashboard.",
            "Sign in to keep your image URLs permanent and gain access to expiration controls and folder organization.",
            "For images requiring transparent backgrounds, use PNG format instead—JPG doesn't support transparency.",
            "Consider WebP format for even smaller file sizes while maintaining quality on modern browsers.",
            "Test your image URLs in an incognito window to ensure they're publicly accessible before sharing.",
          ],
        },
        faq: {
          title: "Frequently Asked Questions",
          items: [
            {
              question: "How do I convert a JPG image to a URL?",
              answer: "Simply drag and drop your JPG file onto our upload zone or click to select a file. Your image will be instantly uploaded and you'll receive a shareable URL.",
            },
            {
              question: "Is this JPG to URL converter free?",
              answer: "Yes, our JPG to URL converter is 100% free. You can upload JPG images up to 10MB without creating an account.",
            },
            {
              question: "What's the difference between JPG and JPEG?",
              answer: "JPG and JPEG are the same format - JPG is just a shorter file extension. Our converter supports both .jpg and .jpeg files.",
            },
            {
              question: "How long will my JPG URL stay active?",
              answer: "Anonymous uploads are stored for 30 days. Sign in for free to keep your images indefinitely and manage expiration times.",
            },
            {
              question: "Can I use the JPG URL on my website?",
              answer: "Yes! The URLs we generate can be used anywhere - in HTML img tags, CSS backgrounds, social media, emails, and more.",
            },
            {
              question: "Does converting JPG to URL compress or reduce image quality?",
              answer: "No, we preserve your original image quality exactly as uploaded. There's no re-compression or quality loss during the conversion process. Your JPG will look identical to the original file.",
            },
            {
              question: "Can I convert multiple JPG files to URLs at once?",
              answer: "Yes! Use our Bulk Upload tool to upload multiple JPG images simultaneously. You'll receive individual URLs for each file and can copy all URLs at once for easy sharing.",
            },
            {
              question: "Are the JPG URLs SEO-friendly for my website?",
              answer: "Yes, our URLs are clean and end with proper image extensions. They include appropriate Content-Type headers and are served from fast CDN infrastructure, which helps with page load speed—an important SEO factor.",
            },
          ],
        },
        relatedTools: {
          title: "Related Tools",
          tools: [
            { name: "PNG to URL", href: "/tools/png-to-url", description: "Convert PNG images to URLs" },
            { name: "GIF to URL", href: "/tools/gif-to-url", description: "Convert animated GIFs to URLs" },
            { name: "Bulk Upload", href: "/tools/bulk-upload", description: "Upload multiple images at once" },
          ],
        },
        externalResources: {
          title: "Helpful Resources",
          resources: [
            { name: "JPEG Format - Wikipedia", href: "https://en.wikipedia.org/wiki/JPEG", description: "Learn about JPEG compression and format specifications" },
            { name: "MDN: Images in HTML", href: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "Best practices for using images in web development" },
            { name: "Web.dev: Image Optimization", href: "https://web.dev/articles/choose-the-right-image-format", description: "Google's guide to choosing the right image format" },
          ],
        },
        meta: {
          title: "JPG to URL Converter - Free Online Tool | ImageToURL",
          description: "Convert JPG images to shareable URLs instantly. Free online JPG to URL converter with no signup required. Upload JPEG files up to 10MB and get instant links.",
          keywords: "jpg to url, jpeg to url, convert jpg to url, jpg image to url converter, jpg link generator",
        },
      },
    },
    pages: {
      privacy: {
        metaTitle: "Privacy Policy | ImageToURL",
        metaDescription: "Learn how ImageToURL collects, uses, and protects your personal information.",
        title: "Privacy Policy",
        lastUpdated: "Last updated: December 2024",
        sections: [
          { title: "Information We Collect", content: "We collect information you provide directly, such as your email address when you sign in. We also automatically collect certain information when you use our service, including your IP address and browser type." },
          { title: "How We Use Your Information", content: "We use the information we collect to provide and improve our image hosting service, communicate with you about your account, and ensure the security of our platform." },
          { title: "Data Storage", content: "Your uploaded images are stored on enterprise-grade cloud infrastructure with encryption. Anonymous uploads are automatically deleted after 30 days. Signed-in users can manage their upload retention settings." },
          { title: "Cookies", content: "We use essential cookies to enable core functionality like user authentication. We do not use tracking cookies for advertising purposes." },
          { title: "Third-Party Services", content: "We use Cloudflare for CDN and security services, and Supabase for authentication. These services have their own privacy policies." },
          { title: "Your Rights", content: "You can request access to, correction of, or deletion of your personal data at any time by contacting us." },
          { title: "Contact", content: "If you have questions about this Privacy Policy, please contact us at privacy@imagetourl.cloud" }
        ]
      },
      terms: {
        metaTitle: "Terms of Service | ImageToURL",
        metaDescription: "Read the terms and conditions for using ImageToURL image hosting service.",
        title: "Terms of Service",
        lastUpdated: "Last updated: December 2024",
        sections: [
          { title: "Acceptance of Terms", content: "By accessing or using ImageToURL, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service." },
          { title: "Service Description", content: "ImageToURL provides free image hosting and URL generation services. We reserve the right to modify, suspend, or discontinue any part of the service at any time." },
          { title: "User Responsibilities", content: "You are responsible for all content you upload. You must not upload illegal content, malware, or content that infringes on others' intellectual property rights." },
          { title: "Prohibited Content", content: "The following content is strictly prohibited: illegal material, malware or viruses, content that infringes copyrights, adult content involving minors, content promoting violence or hate." },
          { title: "Account Termination", content: "We reserve the right to terminate accounts that violate these terms, upload prohibited content, or abuse the service in any way." },
          { title: "Limitation of Liability", content: "ImageToURL is provided 'as is' without warranties. We are not liable for any data loss, service interruptions, or damages arising from your use of the service." },
          { title: "Changes to Terms", content: "We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms." }
        ]
      },
      cookies: {
        metaTitle: "Cookie Policy | ImageToURL",
        metaDescription: "Learn about how ImageToURL uses cookies on our website.",
        title: "Cookie Policy",
        lastUpdated: "Last updated: December 2024",
        intro: "This Cookie Policy explains how ImageToURL uses cookies and similar technologies when you visit our website.",
        sections: [
          { title: "What Are Cookies?", content: "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience." },
          { title: "Essential Cookies", content: "We use essential cookies that are necessary for the website to function properly. These include authentication cookies to keep you signed in and security cookies to protect against threats." },
          { title: "Functional Cookies", content: "We use functional cookies to remember your preferences, such as your selected language and theme (light/dark mode)." },
          { title: "Analytics", content: "We use Vercel Analytics to understand how visitors interact with our website. This helps us improve the user experience. These analytics are privacy-focused and do not use cookies for tracking." },
          { title: "Third-Party Cookies", content: "We do not use third-party advertising cookies. Our authentication service (Supabase) may set cookies for session management." },
          { title: "Managing Cookies", content: "You can control cookies through your browser settings. Note that disabling essential cookies may affect the functionality of the website." }
        ]
      },
      about: {
        metaTitle: "About ImageToURL - Free Image Hosting Service",
        metaDescription: "Learn about ImageToURL, the free image hosting platform that provides instant shareable links powered by a global CDN.",
        title: "About ImageToURL",
        subtitle: "Free, Fast, and Reliable Image Hosting",
        mission: { title: "Our Mission", content: "We believe sharing images should be simple, fast, and free. ImageToURL was built to provide developers, designers, and everyday users with an effortless way to upload images and get instant shareable links." },
        features: [
          { icon: "globe", title: "Global CDN", description: "Images are served from edge locations worldwide for lightning-fast delivery anywhere." },
          { icon: "zap", title: "Instant Links", description: "Upload any image and get a shareable URL in seconds. No waiting, no complexity." },
          { icon: "shield", title: "Secure & Private", description: "All uploads are encrypted. We don't sell your data or track you with ads." },
          { icon: "clock", title: "Flexible Retention", description: "Sign in to manage how long your images are stored, from 1 hour to forever." }
        ],
        team: { title: "Built with Care", content: "ImageToURL is an indie project focused on simplicity and user experience. We're constantly improving based on user feedback." },
        contact: { title: "Get in Touch", content: "Have questions, feedback, or partnership inquiries? We'd love to hear from you.", email: "contact@imagetourl.cloud" }
      },
      pricing: {
        metaTitle: "Pricing & Features - ImageToURL",
        metaDescription: "Discover ImageToURL features. Free image hosting with unlimited uploads for signed-in users.",
        title: "Simple, Transparent Pricing",
        subtitle: "Start free, stay free. ImageToURL is built to be accessible to everyone.",
        plans: [
          {
            name: "Anonymous",
            price: "Free",
            description: "No account needed",
            features: [
              { text: "5 uploads per day", included: true },
              { text: "Up to 10MB per file", included: true },
              { text: "30-day retention", included: true },
              { text: "Global CDN delivery", included: true },
              { text: "Manage uploads", included: false },
              { text: "Custom expiration", included: false }
            ],
            cta: "Start Uploading",
            ctaLink: "/",
            highlighted: false
          },
          {
            name: "Signed In",
            price: "Free",
            description: "Create a free account",
            features: [
              { text: "Unlimited uploads", included: true },
              { text: "Up to 10MB per file", included: true },
              { text: "Custom retention (1hr - forever)", included: true },
              { text: "Global CDN delivery", included: true },
              { text: "Manage all uploads", included: true },
              { text: "Dashboard access", included: true }
            ],
            cta: "Sign Up Free",
            ctaLink: "/auth/login",
            highlighted: true
          }
        ],
        faq: { title: "Questions?", content: "Have questions about our features? Check out our FAQ on the home page or contact us." }
      }
    },
    aboutBoopul: {
      meta: {
        title: "About Boopul | AI Creator & No-Code Explorer",
        description: "Learn about Boopul - an AI-powered creator, no-code explorer, and disciplined builder focused on AI workflows, automation, and personal development.",
        keywords: "AI creator, no-code, web development, automation, personal development, fitness, discipline",
        ogTitle: "About Boopul | AI Creator & No-Code Explorer",
        ogDescription: "Learn about Boopul - an AI-powered creator, no-code explorer, and disciplined builder focused on AI workflows, automation, and personal development.",
      },
      hero: {
        badge: "Built with passion",
        title: "Hi, I'm Boopul 👋",
        description: "I'm an AI-powered creator, no-code explorer, and disciplined builder who believes that consistency beats talent and action beats intention.",
      },
      story: {
        title: "My Story",
        subtitle: "The journey that shaped who I am today",
        content: "My journey hasn't been smooth or privileged. I grew up with limited resources, struggled academically in my early years, and paid my own college fees through persistence and self-learning. Those experiences shaped how I think, work, and build today — with clarity, resilience, and focus on long-term growth.",
      },
      whatIDo: {
        title: "What I Do",
        subtitle: "I enjoy working at the intersection of AI, no-code tools, design, automation, and personal development",
        cards: {
          apps: {
            title: "Apps & Tools",
            description: "Build small apps, tools, and websites using AI, no-code, and lightweight tech",
          },
          ai: {
            title: "AI Workflows",
            description: "Experiment with AI workflows to automate ideas and simplify complex tasks",
          },
          digital: {
            title: "Digital Assets",
            description: "Design and contribute to digital assets and creative projects",
          },
          self: {
            title: "Self-Improvement",
            description: "Create content around discipline, fitness, self-improvement, and stoic thinking",
          },
          discipline: {
            title: "Discipline & Fitness",
            description: "Train regularly, follow structured routines, and treat physical health as a foundation",
          },
          comm: {
            title: "Communication",
            description: "Continuously improve English communication and clarity of thought",
          },
        },
        footer: "I prefer practical execution over theory, clean systems over noise, and steady progress over shortcuts.",
      },
      philosophy: {
        title: "Personal Philosophy",
        items: [
          "Start small.",
          "Stay consistent.",
          "Build quietly.",
          "Let results make the noise.",
        ],
      },
      projects: {
        title: "My Other Projects",
        visit: "Visit {title}",
        items: {
          extractpics: {
            title: "ExtractPics",
            description: "Extract and download images from any website instantly. Supports batch processing of up to 5 URLs, quick & deep scan modes, smart filtering by file type and dimensions.",
          },
          imagetourl: {
            title: "ImageToURL",
            description: "Convert any image to URL instantly. Free image hosting with no signup. Upload JPG, PNG, GIF, SVG, WebP up to 10MB with global CDN delivery.",
          },
          storiespdf: {
            title: "StoriesPDF",
            description: "Discover captivating stories for all ages. Download and enjoy beautifully crafted PDF stories anytime, anywhere. Perfect for bedtime reading and storytelling.",
          },
          tamilkathai: {
            title: "TamilKathai",
            description: "Welcome to Tamil Kathai - A collection of wonderful Tamil stories. Explore rich cultural narratives and traditional tales in Tamil language.",
          },
        },
      },
      connect: {
        title: "Let's Connect",
        description: "If you're interested in AI, no-code tools, creative technology, fitness discipline, or personal growth — welcome, you're in the right place.",
        items: {
          github: {
            title: "GitHub",
            description: "Projects, experiments, and code",
          },
          instaPersonal: {
            title: "Personal Instagram",
            description: "Life, fitness, and everyday moments",
          },
          instaDev: {
            title: "Developer Instagram",
            description: "No-code, AI experiments, creator life",
          },
          email: {
            title: "Email",
            description: "blog.boopul@gmail.com",
          },
          portfolio: {
            title: "Portfolio",
            description: "View my complete work and projects",
          },
        },
      },
    }
  },
  zh: {
    nav: {
      home: "首页",
      blog: "博客",
      documentation: "文档",
      api: "API",
      pricing: "价格",
      signIn: "登录",
      signOut: "退出",
      dashboard: "仪表板",
      tools: "工具",
    },
    hero: {
      badge: "v2.0 现已可用",
      title: "上传图片",
      titleGradient: "即刻获取链接",
      description: "拖放您的文件以即时生成可共享的URL。由全球边缘网络提供支持，实现闪电般的快速交付。",
    },
    intro: {
      title: "什么是图片转URL？",
      content: "图片转URL是将图片文件上传到托管服务并接收可共享网页链接（URL）的过程。此URL可以嵌入网站、在社交媒体上分享，或用于电子邮件和文档。ImageToURL完全免费提供此服务，无需注册账号。",
    },
    blog: {
      title: "博客",
      readMore: "阅读更多",
      readingTime: "{minutes} 分钟阅读",
      postedOn: "发布于",
      byAuthor: "作者",
      relatedPosts: "相关文章",
      categories: "文章分类",
      tags: "标签",
      sharePost: "分享文章",
      tableOfContents: "文章目录",
      allPosts: "全部文章",
      noPosts: "未找到文章",
      featured: "精选文章",
      latestPosts: "最新文章",
      searchPosts: "搜索文章...",
      subtitle: "关于图片托管、优化和 Web 开发",
    },
    search: {
      placeholder: "搜索文章、分类、标签...",
      noResults: "未找到结果",
      startTyping: "开始输入以搜索...",
      navigate: "导航",
      select: "选择",
      close: "关闭",
      typePost: "文章",
      typeCategory: "分类",
      typeTag: "标签",
    },
    auth: {
      signIn: "登录",
      signUp: "注册",
      signOut: "退出",
      email: "电子邮件",
      password: "密码",
      confirmPassword: "确认密码",
      loginToAccess: "登录以访问您的上传",
      createAccount: "创建账号",
      alreadyHaveAccount: "已有账号？",
      dontHaveAccount: "还没有账号？",
    },
    dashboard: {
      title: "仪表板",
      myUploads: "我的上传",
      totalUploads: "总上传量",
      storageUsed: "已使用存储",
      noUploads: "暂无上传",
      uploadFirst: "从首页上传您的第一张图片",
      expiresIn: "过期时间",
      setExpiry: "设置过期",
      deleteUpload: "删除上传",
      confirmDelete: "您确定要删除这张图片吗？",
      deleteWarning: "这将从存储中永久删除图片。此操作无法撤销。",
      cancel: "取消",
      delete: "删除",
      customExpiry: "设置自定义过期时间",
      expiryDescription: "选择此图片应自动删除的时间",
      quickPresets: "快速预设",
      currentExpiry: "当前有效期",
    },
    uploadLimit: {
      remaining: "您还剩 {count} 次上传机会",
      limitReached: "已达到上传限制！登录以继续上传。",
      benefits: "登录以便以后访问上传并管理 URL",
      uploadsRemaining: "剩余上传次数。登录以获取无限上传！",
    },
    howTo: {
      title: "如何将图片转换为URL",
      steps: [
        {
          title: "选择您的图片",
          description: "点击上传区域或拖放任何 JPG、PNG、GIF、SVG 或 WebP 文件（最大 10MB）",
        },
        {
          title: "自动上传",
          description: "您的图片会立即上传并分发到我们的全球 CDN 网络",
        },
        {
          title: "复制您的 URL",
          description: "点击复制按钮获取您的永久、可分享图片链接——随时随地使用",
        },
      ],
    },
    trust: {
      title: "全球信任",
      subtitle: "加入数百万依赖 ImageToURL 进行快速、安全图片托管的用户行列",
      comingSoon: "评价即将推出",
    },
    testimonials: {
      title: "用户评价",
      items: [
        {
          name: "陈莎拉",
          role: "前端开发工程师",
          company: "TechFlow",
          quote: "ImageToURL 已成为我工作流程中不可或缺的一部分。我每天都用它在文档和 Discord 机器人中嵌入图片。速度无与伦比！",
          avatar: "SC",
          rating: 5,
        },
        {
          name: "马库斯·约翰逊",
          role: "设计师",
          company: "CreativeStudio",
          quote: "无需注册，没有广告，只有快速的图片托管。正是我与客户快速分享原型所需的。全球 CDN 带来了巨大的差异。",
          avatar: "MJ",
          rating: 5,
        },
        {
          name: "埃米莉·罗德里格斯",
          role: "内容创作者",
          company: "",
          quote: "我试过很多图片托管服务，但 ImageToURL 是最简单的。上传，复制链接，完成。非常适合我的博客文章和社交媒体。",
          avatar: "ER",
          rating: 5,
        },
        {
          name: "大卫·金",
          role: "全栈开发工程师",
          company: "StartupLabs",
          quote: "API 清洁且文档齐全。不到一小时就集成到了我们的应用中。非常喜欢临时资产的自定义过期功能。",
          avatar: "DK",
          rating: 5,
        },
        {
          name: "普里雅·帕特尔",
          role: "电商经理",
          company: "ShopWave",
          quote: "我们在各大市场中使用 ImageToURL 托管产品图片。可靠、快速，且直接 URL 随处可用。强烈推荐！",
          avatar: "PP",
          rating: 4,
        },
        {
          name: "亚历克斯·汤普森",
          role: "Discord 机器人开发者",
          company: "",
          quote: "终于有一个能提供在 Discord 嵌入中正常工作的直接 URL 的图片托管了。不再有损坏的图片或重定向。改变游戏规则！",
          avatar: "AT",
          rating: 5,
        },
      ],
    },
    comparison: {
      title: "对比我们的优势",
      subtitle: "看看 ImageToURL 与热门图片托管服务的对比情况",
    },
    useCasesHighlights: {
      title: "为每种场景而生",
      subtitle: "从 Discord 机器人到电子商务，ImageToURL 为整个网络提供图片分享支持",
    },
    popularTools: {
      title: "热门图片托管工具",
      subtitle: "探索我们免费的图片转分享链接工具套件",
    },
    relatedTopics: {
      title: "相关话题",
    },
    upload: {
      clickToUpload: "点击上传或拖放",
      fileTypes: "SVG、PNG、JPG 或 GIF（最大 10MB）",
      secure: "安全加密",
      cdn: "全球 CDN",
      errorInvalidType: "无效的文件类型。请上传图片。",
      errorTooLarge: "文件太大。最大大小为 10MB。",
      errorGeneral: "出现问题。",
      shareableLink: "可分享链接",
      copy: "复制",
      copied: "已复制",
      uploadAnother: "上传另一个",
      openLink: "打开链接",
    },
    stats: {
      imagesUploaded: "上传图片数量",
      uptime: "正常运行时间",
      latency: "延迟",
    },
    footer: {
      copyright: "© 2024 ImageToURL Cloud. 保留所有权利。",
      privacy: "隐私政策",
      terms: "服务条款",
      cookies: "Cookie 政策",
      categories: {
        converters: "图片转换器",
        useCases: "使用场景",
        company: "公司",
        legal: "法律信息",
      },
      links: {
        home: "首页",
        blog: "博客",
        about: "关于我们",
        discord: "Discord 图片",
        html: "HTML 和 CSS",
        fantasy: "虚拟体育",
        minecraft: "我的世界",
      },
      badge: "由全球 CDN 支持的免费图片转 URL 转换器",
    },
    meta: {
      title: "图片转 URL 转换器 - 免费即时链接生成器 | ImageToURL",
      description: "在几秒钟内将任何图片转换为 URL。免费图片托管，无需注册。上传最大 10MB 的 JPG、PNG、GIF、WebP。通过全球 CDN 获取即时分享链接。",
      keywords: "图片转 URL, 转换图片为 URL, 图片 URL 转换器, 免费图片托管, 图片链接生成器, 照片转 URL, 上传图片获取链接, jpg 转 url, png 转 url, gif 转 url, 图片转链接, 图像转 URL, 在线图片托管, 可分享图片链接, 免费图片转 URL 转换器, 复制图片为 URL, 即时图片分享",
    },
    faq: {
      title: "常见问题",
      items: [
        {
          question: "如何将图片转换为 URL？",
          answer: "只需将图片拖放到我们的上传区域或点击选择文件。您的图片将立即上传到我们的全球 CDN，您将获得一个可分享的 URL，可以随时随地使用。"
        },
        {
          question: "ImageToURL 完全免费吗？",
          answer: "是的，ImageToURL 基本使用完全免费。您可以无需创建账户上传最大 10MB 的图片。登录后可享受额外功能，如管理上传和设置自定义过期时间。"
        },
        {
          question: "支持哪些图片格式？",
          answer: "我们支持所有流行的图片格式，包括 JPG/JPEG、PNG、GIF、SVG 和 WebP。每个文件最大可达 10MB。您可以立即将这些格式中的任何一种转换为可分享的 URL。"
        },
        {
          question: "我的图片会存储多长时间？",
          answer: "匿名上传默认存储 30 天。登录用户可以设置自定义过期时间或永久保存图片。所有图片通过我们的全球 CDN 提供快速分发。"
        },
        {
          question: "我的数据安全吗？",
          answer: "是的，所有上传都通过 HTTPS 加密传输。图片存储在企业级云基础设施上，正常运行时间达 99.9%。我们不会向第三方出售或分享您的数据。"
        },
        {
          question: "如何复制图片 URL？",
          answer: "上传图片后，点击生成的 URL 旁的“复制”按钮。链接会自动复制到您的剪贴板，随时可以粘贴到任何地方——网站、电子邮件、社交媒体或文档。"
        },
        {
          question: "我可以将 Base64 图片转换为 URL 吗？",
          answer: "可以！使用我们的 Base64 转 URL 转换器工具，将 Base64 编码的图片转换为可分享的 URL。只需粘贴您的 Base64 字符串，即可获得托管在我们全球 CDN 上的即时图片链接。"
        },
        {
          question: "如何为 Discord 获取图片 URL？",
          answer: "将图片上传到 ImageToURL 并复制生成的链接。您可以直接在 Discord 聊天中粘贴此 URL，将其嵌入机器人，或用于自定义表情和服务器图标。我们的 URL 与 Discord 的图片嵌入完美兼容。"
        },
        {
          question: "是否有用于图片转 URL 转换的 API？",
          answer: "是的，我们为开发者提供了一个简单的 API，以便以编程方式上传图片并接收 URL。查看我们的 API 文档了解集成细节，包括 JavaScript、Python 等语言的代码示例。"
        },
        {
          question: "如何批量上传图片并获取 URL？",
          answer: "使用我们的批量上传工具一次上传多张图片。只需同时拖放最多 20 张图片，即可为每张图片获取分享链接。非常适合批量图片托管需求。"
        },
        {
          question: "我可以将 ImageToURL 用于虚拟足球队的标志吗？",
          answer: "当然可以！ImageToURL 非常适合为 ESPN、Yahoo 或任何虚拟体育平台创建自定义团队标志。上传您的标志图片，复制 URL，并将其粘贴到您的虚拟联赛设置中。"
        },
        {
          question: "如何将图片转换为短链接？",
          answer: "我们的图片 URL 已经过分享优化。当您上传图片时，我们会生成一个简洁的短 URL，易于分享和记忆。链接直接指向您托管的图片。"
        },
        {
          question: "图片 URL 和 Base64 有什么区别？",
          answer: "图片 URL 是指向您托管图片的网页链接，而 Base64 是将图片编码为文本数据。URL 更适合分享和网页使用，因为它们更短且更高效。使用我们的工具可以在不同格式之间转换。"
        }
      ]
    },
    tools: {
      "jpg-to-url": {
        title: "JPG转URL转换器",
        subtitle: "免费在线 JPEG 图片托管",
        description: "立即将您的 JPG 和 JPEG 图片转换为可分享的 URL。无需注册，只需上传并分享。",
        introduction: {
          title: "了解 JPG 转 URL 转换",
          paragraphs: [
            "JPG (Joint Photographic Experts Group) 是网络上使用最广泛的图片格式，以其对照片和复杂图片的出色压缩而闻名。当您需要在网上分享 JPG 图片时，将其转换为 URL 可以让您在任何地方嵌入——从网站和电子邮件到社交媒体帖子和文档。",
            "我们的免费 JPG 转 URL 转换器可立即将您的 JPEG 文件上传到全球内容分发网络 (CDN)，生成永久、可分享的链接。与临时文件共享服务不同，这些 URL 旨在实现可靠性和速度，边缘服务器确保全球浏览者的快速加载时间。",
            "无论您是嵌入产品照片的博主、测试图片显示的开发人员，还是只想与朋友分享回忆，将 JPG 转换为 URL 都是让图片在网上可访问的最有效方式，无需处理文件附件或大小限制。",
          ],
        },
        features: {
          title: "为什么使用我们的 JPG 转 URL 转换器？",
          items: [
            "100% 免费，无隐藏费用",
            "无需账号或注册",
            "支持 JPG 和 JPEG 格式",
            "支持高达 10MB 的文件",
            "即时生成可分享链接",
            "全球 CDN 实现快速交付",
            "99.9% 上线时间保证",
            "安全 HTTPS 链接",
          ],
        },
        howItWorks: {
          title: "如何将 JPG 转换为 URL",
          steps: [
            {
              title: "上传您的 JPG",
              description: "拖放您的 JPG 文件或点击浏览。我们接受高达 10MB 的 JPG 和 JPEG 文件。",
            },
            {
              title: "获取您的 URL",
              description: "您的图片将立即上传到我们的全球 CDN。自动生成可分享的 URL。",
            },
            {
              title: "随处分享",
              description: "复制 URL 并将其用于任何地方——网站、社交媒体、电子邮件或文档。",
            },
          ],
        },
        useCases: {
          title: "JPG URL 的常见用例",
          items: [
            { title: "网站开发", description: "直接在 HTML 中嵌入产品图片、作品集照片或博客插图，无需担心托管基础设施。" },
            { title: "电子邮件营销", description: "在电子邮件简报中包含可靠的图片链接，不受附件限制或损坏的内联图片影响。" },
            { title: "社交媒体分享", description: "分享具有直接链接的高质量照片，在所有主要平台上都能正确预览。" },
            { title: "文档和维基", description: "向 README 文件、帮助文档和内部维基添加屏幕截图、图表和视觉辅助工具。" },
            { title: "电子商务列表", description: "在 eBay、Etsy 或 Amazon 等多个市场平台上托管产品图片。" },
            { title: "虚拟体育和游戏", description: "为 ESPN、Yahoo Fantasy, Discord 和游戏平台创建自定义团队标志和头像。" },
          ],
        },
        tips: {
          title: "JPG 托管专业提示",
          items: [
            "在上传前优化您的 JPG 以减小文件大小而无明显质量损失——TinyJPG 等工具可以提供帮助。",
            "在仪表板中管理多张图片时，使用描述性文件名以便更好地组织。",
            "登录以保持您的图片 URL 永久有效，并获得过期控制和文件夹管理权限。",
            "对于需要透明背景的图片，请使用 PNG 格式——JPG 不支持透明度。",
            "考虑使用 WebP 格式，在现代浏览器上保持质量的同时获得更小的文件大小。",
            "在无痕窗口中测试您的图片 URL，确保它们在分享前可公开访问。",
          ],
        },
        faq: {
          title: "常见问题解答",
          items: [
            {
              question: "如何将 JPG 图片转换为 URL？",
              answer: "只需将您的 JPG 文件拖放到上传区域 or 点击选择文件。您的图片将立即上传，您将收到一个可分享的 URL。",
            },
            {
              question: "这个 JPG 转 URL 转换器免费吗？",
              answer: "是的，我们的 JPG 转 URL 转换器 100% 免费。您可以上传高达 10MB 的 JPG 图片，无需创建账号。",
            },
            {
              question: "JPG 和 JPEG 有什么区别？",
              answer: "JPG 和 JPEG 是同一种格式——JPG 只是一个较短的文件扩展名。我们的转换器支持 .jpg 和 .jpeg 文件。",
            },
            {
              question: "我的 JPG URL 会保持激活多久？",
              answer: "匿名上传保留 30 天。免费登录即可无限期保留您的图片并管理过期时间。",
            },
            {
              question: "我可以在我的网站上使用 JPG URL 吗？",
              answer: "是的！我们生成的 URL 可以用于任何地方——HTML img 标签、CSS 背景、社交媒体、电子邮件等。",
            },
            {
              question: "将 JPG 转换为 URL 会压缩或降低图片质量吗？",
              answer: "不会，我们完全按照上传的原始图片质量保存。转换过程中没有重新压缩或质量损失。您的 JPG 看起来将与原始文件完全一致。",
            },
            {
              question: "我可以一次将多个 JPG 文件转换为 URL 吗？",
              answer: "是的！使用我们的批量上传工具同时上传多个 JPG 图片。您将收到每个文件的单独 URL，并可以一次复制所有 URL 以方便分享。",
            },
            {
              question: "我的网站使用 JPG URL 对 SEO 友好吗？",
              answer: "是的，我们的 URL 是干净的，并带有正确的图片扩展名。它们包含适当的 Content-Type 头部，并从快速 CDN 基础设施提供，这有助于提高页面加载速度——这是一个重要的 SEO 因素。",
            },
          ],
        },
        relatedTools: {
          title: "相关工具",
          tools: [
            { name: "PNG 转 URL", href: "/tools/png-to-url", description: "将 PNG 图片转换为 URL" },
            { name: "GIF 转 URL", href: "/tools/gif-to-url", description: "将动态 GIF 转换为 URL" },
            { name: "批量上传", href: "/tools/bulk-upload", description: "一次上传多张图片" },
          ],
        },
        externalResources: {
          title: "有用资源",
          resources: [
            { name: "JPEG 格式 - 维基百科", href: "https://en.wikipedia.org/wiki/JPEG", description: "了解 JPEG 压缩和格式规范" },
            { name: "MDN: HTML 中的图片", href: "https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML", description: "在 Web 开发中使用图片的最佳实践" },
            { name: "Web.dev: 图片优化", href: "https://web.dev/articles/choose-the-right-image-format", description: "Google 关于选择正确图片格式的指南" },
          ],
        },
        meta: {
          title: "JPG 转 URL 转换器 - 免费在线工具 | ImageToURL",
          description: "立即将 JPG 图片转换为可分享的 URL。免费在线 JPG 转 URL 转换器，无需注册。上传高达 10MB 的 JPEG 文件并获取即时链接。",
          keywords: "jpg转url, jpeg转url, 转换jpg为url, jpg图片转url转换器, jpg链接生成器",
        },
      },
    },
    pages: {
      privacy: {
        metaTitle: "隐私政策 | ImageToURL",
        metaDescription: "了解 ImageToURL 如何收集、使用和保护您的个人信息。",
        title: "隐私政策",
        lastUpdated: "最近更新：2024年12月",
        sections: [
          { title: "我们收集的信息", content: "我们收集您直接提供的信息，例如您登录时的电子邮件地址。我们还会在您使用我们的服务时自动收集某些信息，包括您的 IP 地址和浏览器类型。" },
          { title: "我们如何使用您的信息", content: "我们使用收集的信息来提供和改进我们的图片托管服务，就您的账号与您沟通，并确保我们平台的安全。" },
          { title: "数据存储", content: "您上传的图片存储在具有加密功能的工业级云基础设施上。匿名上传会在 30 天后自动删除。登录用户可以管理其上传保留设置。" },
          { title: "Cookies", content: "我们使用必要的 Cookie 来启用核心功能，如用户身份验证。我们不使用跟踪 Cookie 进行广告目的。" },
          { title: "第三方服务", content: "我们使用 Cloudflare 提供 CDN 和安全服务，使用 Supabase 进行身份验证。这些服务有其自身的隐私政策。" },
          { title: "您的权利", content: "您可以随时联系我们，要求访问、更正或删除您的个人数据。" },
          { title: "联系我们", content: "如果您对本隐私政策有疑问，请通过 privacy@imagetourl.cloud 联系我们" }
        ]
      },
      terms: {
        metaTitle: "服务条款 | ImageToURL",
        metaDescription: "阅读使用 ImageToURL 图片托管服务的条款和条件。",
        title: "服务条款",
        lastUpdated: "最近更新：2024年12月",
        sections: [
          { title: "接受条款", content: "访问或使用 ImageToURL，即表示您同意受这些服务条款的约束。如果您不同意这些条款，请不要使用我们的服务。" },
          { title: "服务说明", content: "ImageToURL 提供免费的图片托管和 URL 生成服务。我们保留随时修改、暂停或终止服务任何部分的权利。" },
          { title: "用户责任", content: "您对您上传的所有内容负责。您不得上传非法内容、恶意软件或侵犯他人知识产权的内容。" },
          { title: "禁止内容", content: "严禁上传以下内容：非法材料、恶意软件或病毒、侵犯版权的内容、涉及未成年人的成人内容、宣传暴力或仇恨的内容。" },
          { title: "账号终止", content: "我们保留终止违反这些条款、上传禁止内容或以任何方式滥用服务的账号的权利。" },
          { title: "责任限制", content: "ImageToURL 按“原样”提供，不作任何保证。我们不对因您使用服务而导致的任何数据丢失、服务中断或损害负责。" },
          { title: "条款变更", content: "我们可能会不时更新这些条款。变更后继续使用服务即视为接受新条款。" }
        ]
      },
      cookies: {
        metaTitle: "Cookie 政策 | ImageToURL",
        metaDescription: "了解 ImageToURL 如何在我们的网站上使用 Cookie。",
        title: "Cookie 政策",
        lastUpdated: "最近更新：2024年12月",
        intro: "本 Cookie 政策解释了当您访问我们的网站时，ImageToURL 如何使用 Cookie 和类似技术。",
        sections: [
          { title: "什么是 Cookie？", content: "Cookie 是您访问网站时存储在您设备上的小文本文件。它们帮助网站记住您的偏好并改善您的体验。" },
          { title: "必要 Cookie", content: "我们使用必要的 Cookie 使网站正常运行。这些包括用于保持您登录状态的身份验证 Cookie 和用于防范威胁的安全 Cookie。" },
          { title: "功能性 Cookie", content: "我们使用功能性 Cookie 来记住您的偏好，例如您选择的语言和主题（明亮/黑暗模式）。" },
          { title: "分析", content: "我们使用 Vercel Analytics 来了解访问者如何与我们的网站互动。这有助于我们改善用户体验。这些分析以隐私为中心，不使用 Cookie 进行跟踪。" },
          { title: "第三方 Cookie", content: "我们不使用第三方广告 Cookie。我们的身份验证服务 (Supabase) 可能会为会话管理设置 Cookie。" },
          { title: "管理 Cookie", content: "您可以通过浏览器设置控制 Cookie。请注意，禁用必要 Cookie 可能会影响网站的功能。" }
        ]
      },
      about: {
        metaTitle: "关于 ImageToURL - 免费图片托管服务",
        metaDescription: "了解 ImageToURL，这是一个提供由全球 CDN 支持的即时可分享链接的免费图片托管平台。",
        title: "关于 ImageToURL",
        subtitle: "免费、快速且可靠的图片托管",
        mission: { title: "我们的使命", content: "我们相信分享图片应该是简单、快速且免费的。ImageToURL 旨在为开发者、设计师和普通用户提供一种轻松的方式来上传图片并获得即时可分享的链接。" },
        features: [
          { icon: "globe", title: "全球 CDN", description: "图片从全球边缘节点提供，确保在任何地方都能闪电般快速交付。" },
          { icon: "zap", title: "即时链接", description: "上传任何图片，几秒钟内即可获得可分享的 URL。无需等待，无需复杂操作。" },
          { icon: "shield", title: "安全私密", description: "所有上传均经过加密。我们不会出售您的数据，也不会通过广告跟踪您。" },
          { icon: "clock", title: "灵活保留", description: "登录即可管理图片的存储时长，从 1 小时到永久。" }
        ],
        team: { title: "用心打造", content: "ImageToURL 是一个专注于简单性和用户体验的个人项目。我们不断根据用户反馈进行改进。" },
        contact: { title: "联系我们", content: "有问题、反馈或合作咨询？我们很乐意听到您的声音。", email: "contact@imagetourl.cloud" }
      },
      pricing: {
        metaTitle: "价格与功能 - ImageToURL",
        metaDescription: "探索 ImageToURL 功能。为登录用户提供无限上传的免费图片托管。",
        title: "简单透明的价格",
        subtitle: "从免费开始，一直免费。ImageToURL 旨在让每个人都能使用。",
        plans: [
          {
            name: "匿名用户",
            price: "免费",
            description: "无需账号",
            features: [
              { text: "每天 5 次上传", included: true },
              { text: "每个文件最大 10MB", included: true },
              { text: "30 天保留期", included: true },
              { text: "全球 CDN 分发", included: true },
              { text: "管理上传", included: false },
              { text: "自定义过期", included: false }
            ],
            cta: "开始上传",
            ctaLink: "/",
            highlighted: false
          },
          {
            name: "登录用户",
            price: "免费",
            description: "创建一个免费账号",
            features: [
              { text: "无限次上传", included: true },
              { text: "每个文件最大 10MB", included: true },
              { text: "自定义保留时间 (1小时 - 永久)", included: true },
              { text: "全球 CDN 分发", included: true },
              { text: "管理所有上传", included: true },
              { text: "访问仪表板", included: true }
            ],
            cta: "免费注册",
            ctaLink: "/auth/login",
            highlighted: true
          }
        ],
        faq: { title: "有问题？", content: "对我们的功能有疑问吗？查看主页上的常见问题或联系我们。" }
      }
    },
    aboutBoopul: {
      meta: {
        title: "关于 Boopul | AI 创作者与无代码探索者",
        description: "了解 Boopul - 一位专注于 AI 工作流、自动化和个人发展的 AI 驱动创作者、无代码探索者和自律建设者。",
        keywords: "AI 创作者, 无代码, Web 开发, 自动化, 个人发展, 健身, 自律",
        ogTitle: "关于 Boopul | AI 创作者与无代码探索者",
        ogDescription: "了解 Boopul - 一位专注于 AI 工作流、自动化和个人发展的 AI 驱动创作者、无代码探索者和自律建设者。",
      },
      hero: {
        badge: "充满热情地打造",
        title: "嗨，我是 Boopul 👋",
        description: "我是一个 AI 驱动的创作者、无代码探索者和自律的建设者，我相信坚持胜过天赋，行动胜过意图。",
      },
      story: {
        title: "我的故事",
        subtitle: "塑造今日之我的旅程",
        content: "我的旅程并非一帆风顺，也没有什么特权。我自幼资源有限，早期学业艰辛，通过坚持和自学支付了自己的大学学费。这些经历塑造了我今天的思考、工作和建设方式——保持清晰、韧性并专注于长期增长。",
      },
      whatIDo: {
        title: "我的工作",
        subtitle: "我喜欢在 AI、无代码工具、设计、自动化和个人发展的交汇点工作",
        cards: {
          apps: {
            title: "应用与工具",
            description: "利用 AI、无代码和轻量化技术构建小型应用、工具和网站",
          },
          ai: {
            title: "AI 工作流",
            description: "尝试通过 AI 工作流实现创意自动化，简化复杂任务",
          },
          digital: {
            title: "数字资产",
            description: "设计并为数字资产和创意项目做出贡献",
          },
          self: {
            title: "自我提升",
            description: "创作关于自律、健身、自我提升和斯多葛学派思考的内容",
          },
          discipline: {
            title: "自律与健身",
            description: "定期训练，遵循规律作息，将身体健康视为一切的基础",
          },
          comm: {
            title: "沟通交流",
            description: "不断提高英语沟通能力和思维的清晰度",
          },
        },
        footer: "我偏好实践执行而非理论，偏好整洁系统而非噪音，偏好稳步前进而非走捷径。",
      },
      philosophy: {
        title: "个人哲学",
        items: [
          "从小处着手。",
          "保持一致性。",
          "默默建设。",
          "让结果说话。",
        ],
      },
      projects: {
        title: "我的其他项目",
        visit: "访问 {title}",
        items: {
          extractpics: {
            title: "ExtractPics",
            description: "立即从任何网站提取并下载图片。支持最多 5 个 URL 的批量处理，快速与深度扫描模式，按文件类型和尺寸进行智能过滤。",
          },
          imagetourl: {
            title: "ImageToURL",
            description: "立即将任何图片转换为 URL。免费图片托管，无需注册。上传最大 10MB 的 JPG、PNG、GIF、SVG、WebP，并通过全球 CDN 交付。",
          },
          storiespdf: {
            title: "StoriesPDF",
            description: "发现适合所有年龄段的迷人故事。随时随地下载并享受精心制作的 PDF 故事。非常适合睡前阅读和讲故事。",
          },
          tamilkathai: {
            title: "TamilKathai",
            description: "欢迎来到 Tamil Kathai - 精彩的泰米尔故事合集。探索丰富的文化叙事和泰米尔语的传统故事。",
          },
        },
      },
      connect: {
        title: "建立联系",
        description: "如果您对 AI、无代码工具、创意技术、健身自律或个人成长感兴趣——欢迎，您找对地方了。",
        items: {
          github: {
            title: "GitHub",
            description: "项目、实验与代码",
          },
          instaPersonal: {
            title: "个人 Instagram",
            description: "生活、健身与日常点滴",
          },
          instaDev: {
            title: "开发者 Instagram",
            description: "无代码、AI 实验、创作者生活",
          },
          email: {
            title: "电子邮件",
            description: "blog.boopul@gmail.com",
          },
          portfolio: {
            title: "作品集",
            description: "查看我的完整作品和项目",
          },
        },
      },
    },
  },
  hi: {
    nav: {
      home: "होम",
      blog: "ब्लॉग",
      documentation: "दस्तावेज़ीकरण",
      api: "API",
      pricing: "मूल्य निर्धारण",
      signIn: "साइन इन करें",
      signOut: "साइन आउट करें",
      dashboard: "डैशबोर्ड",
      tools: "उपकरण",
    },
    hero: {
      badge: "v2.0 अब उपलब्ध",
      title: "छवियां अपलोड करें,",
      titleGradient: "तुरंत लिंक प्राप्त करें।",
      description:
        "तुरंत साझा करने योग्य URL उत्पन्न करने के लिए अपनी फ़ाइलों को ड्रैग और ड्रॉप करें। बिजली-तेज़ वितरण के लिए वैश्विक एज नेटवर्क द्वारा संचालित।",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "अपलोड करने के लिए क्लिक करें या ड्रैग और ड्रॉप करें",
      fileTypes: "SVG, PNG, JPG या GIF (अधिकतम 10MB)",
      secure: "सुरक्षित और एन्क्रिप्टेड",
      cdn: "वैश्विक CDN",
      errorInvalidType: "अमान्य फ़ाइल प्रकार। कृपया एक छवि अपलोड करें।",
      errorTooLarge: "फ़ाइल बहुत बड़ी है। अधिकतम आकार 10MB है।",
      errorGeneral: "कुछ गलत हो गया।",
      shareableLink: "साझा करने योग्य लिंक",
      copy: "कॉपी करें",
      copied: "कॉपी किया गया",
      uploadAnother: "दूसरा अपलोड करें",
      openLink: "लिंक खोलें",
    },
    stats: {
      imagesUploaded: "अपलोड की गई छवियां",
      uptime: "अपटाइम",
      latency: "विलंबता",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. सर्वाधिकार सुरक्षित।",
      privacy: "गोपनीयता",
      terms: "शर्तें",
      cookies: "कुकीज़",
    },
    meta: {
      title: "मुफ्त इमेज से URL कनवर्टर - तुरंत शेयर करने योग्य फोटो लिंक | ImageToURL",
      description:
        "किसी भी इमेज को तुरंत शेयर करने योग्य URL में बदलें। 100% मुफ्त इमेज होस्टिंग, साइनअप की जरूरत नहीं। JPG, PNG, GIF (10MB तक) अपलोड करें और ग्लोबल CDN द्वारा तुरंत लिंक पाएं।",
      keywords: "इमेज से url, मुफ्त इमेज होस्टिंग, इमेज लिंक जनरेटर, फोटो अपलोड लिंक पाएं, इमेज कनवर्टर, तुरंत इमेज शेयरिंग",
    },
    faq: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      items: [
        {
          question: "मैं इमेज को URL में कैसे बदलूं?",
          answer: "बस अपनी इमेज को हमारे अपलोड जोन पर ड्रैग और ड्रॉप करें या फाइल चुनने के लिए क्लिक करें। आपकी इमेज तुरंत हमारे ग्लोबल CDN पर अपलोड हो जाएगी, और आपको एक शेयर करने योग्य URL मिलेगा।"
        },
        {
          question: "क्या ImageToURL पूरी तरह से मुफ्त है?",
          answer: "हां, ImageToURL बेसिक उपयोग के लिए 100% मुफ्त है। आप बिना अकाउंट बनाए 10MB तक की इमेज अपलोड कर सकते हैं।"
        },
        {
          question: "कौन से इमेज फॉर्मेट सपोर्टेड हैं?",
          answer: "हम सभी लोकप्रिय इमेज फॉर्मेट को सपोर्ट करते हैं जिसमें JPG/JPEG, PNG, GIF, SVG और WebP शामिल हैं। प्रत्येक फाइल 10MB तक हो सकती है।"
        },
        {
          question: "मेरी इमेज कितने समय तक स्टोर रहती हैं?",
          answer: "एनोनिमस अपलोड डिफ़ॉल्ट रूप से 30 दिनों के लिए स्टोर होते हैं। साइन इन किए हुए यूजर कस्टम एक्सपायरी टाइम सेट कर सकते हैं।"
        },
        {
          question: "क्या मेरा डेटा सुरक्षित है?",
          answer: "हां, सभी अपलोड HTTPS का उपयोग करके एन्क्रिप्टेड होते हैं। इमेज एंटरप्राइज-ग्रेड क्लाउड इंफ्रास्ट्रक्चर पर स्टोर होती हैं जिसकी 99.9% अपटाइम है।"
        }
      ]
    },
    aboutBoopul: {
      meta: {
        title: "बूपुल के बारे में | AI क्रिएटर और नो-कोड एक्सप्लोरर",
        description: "बूपुल के बारे में जानें - एक AI-संचालित क्रिएटर, नो-कोड एक्सप्लोरर, और अनुशासित बिल्डर जो AI वर्कफ़्लो, ऑटोमेशन और व्यक्तिगत विकास पर केंद्रित है।",
        keywords: "AI क्रिएटर, नो-कोड, वेब डेवलपमेंट, ऑटोमेशन, व्यक्तिगत विकास, फिटनेस, अनुशासन",
        ogTitle: "बूपुल के बारे में | AI क्रिएटर और नो-कोड एक्सप्लोरर",
        ogDescription: "बूपुल के बारे में जानें - एक AI-संचालित क्रिएटर, नो-कोड एक्सप्लोरर, और अनुशासित बिल्डर जो AI वर्कफ़्लो, ऑटोमेशन और व्यक्तिगत विकास पर केंद्रित है।",
      },
      hero: {
        badge: "जुनून के साथ बनाया गया",
        title: "नमस्ते, मैं बूपुल हूँ 👋",
        description: "मैं एक AI-संचालित क्रिएटर, नो-कोड एक्सप्लोरर और अनुशासित बिल्डर हूँ जो मानता है कि निरंतरता प्रतिभा को मात देती है और कार्य इरादे को मात देता है।",
      },
      story: {
        title: "मेरी कहानी",
        subtitle: "वह यात्रा जिसने आज मुझे गढ़ा है",
        content: "मेरी यात्रा आसान या विशेषाधिकार प्राप्त नहीं रही है। मैं सीमित संसाधनों के साथ बड़ा हुआ, अपने शुरुआती वर्षों में शैक्षणिक रूप से संघर्ष किया, और दृढ़ता और स्वयं-सीखने के माध्यम से अपनी कॉलेज की फीस का भुगतान किया। उन अनुभवों ने आकार दिया कि मैं आज कैसे सोचता हूं, काम करता हूं और निर्माण करता हूं — स्पष्टता, लचीलापन और दीर्घकालिक विकास पर ध्यान देने के साथ।",
      },
      whatIDo: {
        title: "मैं क्या करता हूँ",
        subtitle: "मुझे AI, नो-कोड टूल्स, डिज़ाइन, ऑटोमेशन और व्यक्तिगत विकास के संगम पर काम करना पसंद है",
        cards: {
          apps: {
            title: "ऐप्स और टूल्स",
            description: "AI, नो-कोड और लाइटवेट तकनीक का उपयोग करके छोटे ऐप्स, टूल्स और वेबसाइट बनाएं",
          },
          ai: {
            title: "AI वर्कफ़्लो",
            description: "विचारों को स्वचालित करने और जटिल कार्यों को सरल बनाने के लिए AI वर्कफ़्लो के साथ प्रयोग करें",
          },
          digital: {
            title: "डिजिटल एसेट्स",
            description: "डिजिटल एसेट्स और रचनात्मक परियोजनाओं में डिज़ाइन और योगदान करें",
          },
          self: {
            title: "आत्म-सुधार",
            description: "अनुशासन, फिटनेस, आत्म-सुधार और स्टोइक सोच के बारे में सामग्री बनाएं",
          },
          discipline: {
            title: "अनुशासन और फिटनेस",
            description: "नियमित रूप से प्रशिक्षण लें, संरचित दिनचर्या का पालन करें और शारीरिक स्वास्थ्य को आधार मानें",
          },
          comm: {
            title: "संचार",
            description: "अंग्रेजी संचार और विचार की स्पष्टता में निरंतर सुधार करें",
          },
        },
        footer: "मैं सिद्धांत पर व्यावहारिक निष्पादन, शोर पर साफ सिस्टम और शॉर्टकट पर निरंतर प्रगति पसंद करता हूं।",
      },
      philosophy: {
        title: "व्यक्तिगत दर्शन",
        items: [
          "छोटा शुरू करें।",
          "निरंतर रहें।",
          "चुपचाप निर्माण करें।",
          "परिणामों को शोर मचाने दें।",
        ],
      },
      projects: {
        title: "मेरी अन्य परियोजनाएं",
        visit: "{title} पर जाएं",
        items: {
          extractpics: {
            title: "ExtractPics",
            description: "किसी भी वेबसाइट से तुरंत चित्र निकालें और डाउनलोड करें। 5 URL तक बैच प्रोसेसिंग, त्वरित और गहरी स्कैन मोड का समर्थन करता है।",
          },
          imagetourl: {
            title: "ImageToURL",
            description: "किसी भी छवि को तुरंत URL में बदलें। कोई साइनअप के साथ मुफ्त छवि होस्टिंग। वैश्विक CDN वितरण के साथ 10MB तक अपलोड करें।",
          },
          storiespdf: {
            title: "StoriesPDF",
            description: "सभी उम्र के लिए मनोरंजक कहानियों की खोज करें। कभी भी, कहीं भी खूबसूरती से तैयार की गई PDF कहानियां डाउनलोड करें और आनंद लें।",
          },
          tamilkathai: {
            title: "TamilKathai",
            description: "तमिल कथाई में आपका स्वागत है - अद्भुत तमिल कहानियों का एक संग्रह। तमिल भाषा में समृद्ध सांस्कृतिक कथाओं का अन्वेषण करें।",
          },
        },
      },
      connect: {
        title: "जुड़ें",
        description: "यदि आप AI, नो-कोड टूल्स, रचनात्मक तकनीक, फिटनेस अनुशासन, या व्यक्तिगत विकास में रुचि रखते हैं — आपका स्वागत है, आप सही जगह पर हैं।",
        items: {
          github: {
            title: "GitHub",
            description: "परियोजनाएं, प्रयोग और कोड",
          },
          instaPersonal: {
            title: "पर्सनल इंस्टाग्राम",
            description: "जीवन, फिटनेस और रोजमर्रा के पल",
          },
          instaDev: {
            title: "डेवलपर इंस्टाग्राम",
            description: "नो-कोड, AI प्रयोग, क्रिएटर लाइफ",
          },
          email: {
            title: "ईमेल",
            description: "blog.boopul@gmail.com",
          },
          portfolio: {
            title: "पोर्टफोलियो",
            description: "मेरा पूरा काम और परियोजनाएं देखें",
          },
        },
      },
    },
  },
  es: {
    nav: {
      home: "Inicio",
      blog: "Blog",
      documentation: "Documentación",
      api: "API",
      pricing: "Precios",
      signIn: "Iniciar Sesión",
      signOut: "Cerrar Sesión",
      dashboard: "Panel",
      tools: "Herramientas",
    },
    hero: {
      badge: "v2.0 Ya Disponible",
      title: "Sube imágenes,",
      titleGradient: "obtén enlaces al instante.",
      description:
        "Arrastra y suelta tus archivos para generar una URL compartible al instante. Impulsado por una red edge global para entrega ultrarrápida.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Haz clic para subir o arrastra y suelta",
      fileTypes: "SVG, PNG, JPG o GIF (máx. 10MB)",
      secure: "Seguro y Cifrado",
      cdn: "CDN Global",
      errorInvalidType: "Tipo de archivo no válido. Por favor sube una imagen.",
      errorTooLarge: "El archivo es demasiado grande. Tamaño máximo de 10MB.",
      errorGeneral: "Algo salió mal.",
      shareableLink: "Enlace Compartible",
      copy: "Copiar",
      copied: "Copiado",
      uploadAnother: "Subir Otro",
      openLink: "Abrir Enlace",
    },
    stats: {
      imagesUploaded: "Imágenes Subidas",
      uptime: "Tiempo de Actividad",
      latency: "Latencia",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Todos los derechos reservados.",
      privacy: "Privacidad",
      terms: "Términos",
      cookies: "Cookies",
    },
    meta: {
      title: "Convertidor de Imagen a URL Gratis - Enlaces de Fotos Compartibles | ImageToURL",
      description:
        "Convierte cualquier imagen a URL compartible al instante. Alojamiento de imágenes 100% gratis sin registro. Sube JPG, PNG, GIF hasta 10MB y obtén enlaces instantáneos con CDN global.",
      keywords: "imagen a url, alojamiento de imágenes gratis, generador de enlaces de imagen, subir foto obtener enlace, convertidor de imagen, compartir imagen instantáneo",
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        {
          question: "¿Cómo convierto una imagen a URL?",
          answer: "Simplemente arrastra y suelta tu imagen en nuestra zona de carga o haz clic para seleccionar un archivo. Tu imagen se subirá instantáneamente a nuestro CDN global y recibirás una URL compartible."
        },
        {
          question: "¿Es ImageToURL completamente gratis?",
          answer: "Sí, ImageToURL es 100% gratis para uso básico. Puedes subir imágenes de hasta 10MB sin crear una cuenta."
        },
        {
          question: "¿Qué formatos de imagen son compatibles?",
          answer: "Soportamos todos los formatos populares incluyendo JPG/JPEG, PNG, GIF, SVG y WebP. Cada archivo puede ser de hasta 10MB."
        },
        {
          question: "¿Cuánto tiempo se almacenan mis imágenes?",
          answer: "Las cargas anónimas se almacenan por 30 días por defecto. Los usuarios registrados pueden establecer tiempos de expiración personalizados."
        },
        {
          question: "¿Están seguros mis datos?",
          answer: "Sí, todas las cargas están cifradas usando HTTPS. Las imágenes se almacenan en infraestructura de nube empresarial con 99.9% de tiempo de actividad."
        }
      ]
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      blog: "مدونة",
      documentation: "التوثيق",
      api: "واجهة برمجية",
      pricing: "التسعير",
      signIn: "تسجيل الدخول",
      signOut: "تسجيل الخروج",
      dashboard: "لوحة التحكم",
      tools: "أدوات",
    },
    hero: {
      badge: "v2.0 متاح الآن",
      title: "تحميل الصور،",
      titleGradient: "احصل على روابط فورية.",
      description:
        "اسحب وأفلت ملفاتك لإنشاء عنوان URL قابل للمشاركة على الفور. مدعوم بشبكة حافة عالمية للتسليم فائق السرعة.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "انقر للتحميل أو اسحب وأفلت",
      fileTypes: "SVG أو PNG أو JPG أو GIF (بحد أقصى 10 ميجابايت)",
      secure: "آمن ومشفر",
      cdn: "CDN عالمي",
      errorInvalidType: "نوع ملف غير صالح. يرجى تحميل صورة.",
      errorTooLarge: "الملف كبير جدًا. الحد الأقصى للحجم 10 ميجابايت.",
      errorGeneral: "حدث خطأ ما.",
      shareableLink: "رابط قابل للمشاركة",
      copy: "نسخ",
      copied: "تم النسخ",
      uploadAnother: "تحميل آخر",
      openLink: "فتح الرابط",
    },
    stats: {
      imagesUploaded: "الصور المحملة",
      uptime: "وقت التشغيل",
      latency: "الكمون",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. جميع الحقوق محفوظة.",
      privacy: "الخصوصية",
      terms: "الشروط",
      cookies: "ملفات تعريف الارتباط",
    },
    meta: {
      title: "ImageToURL - استضافة الصور الفورية",
      description:
        "قم بتحميل الصور واحصل على روابط قابلة للمشاركة على الفور. استضافة صور سريعة وآمنة وموثوقة مدعومة بشبكة CDN عالمية.",
      keywords: "استضافة الصور, تحميل الصور, cdn, روابط فورية, مشاركة الصور",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      blog: "Blog",
      documentation: "Documentation",
      api: "API",
      pricing: "Tarifs",
      signIn: "Se Connecter",
      signOut: "Se Déconnecter",
      dashboard: "Tableau de Bord",
      tools: "Outils",
    },
    hero: {
      badge: "v2.0 Maintenant Disponible",
      title: "Téléchargez des images,",
      titleGradient: "obtenez des liens instantanés.",
      description:
        "Glissez et déposez vos fichiers pour générer une URL partageable instantanément. Propulsé par un réseau edge mondial pour une livraison ultra-rapide.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Cliquez pour télécharger ou glisser-déposer",
      fileTypes: "SVG, PNG, JPG ou GIF (max. 10Mo)",
      secure: "Sécurisé et Chiffré",
      cdn: "CDN Mondial",
      errorInvalidType: "Type de fichier non valide. Veuillez télécharger une image.",
      errorTooLarge: "Le fichier est trop volumineux. Taille maximale de 10Mo.",
      errorGeneral: "Une erreur s'est produite.",
      shareableLink: "Lien Partageable",
      copy: "Copier",
      copied: "Copié",
      uploadAnother: "Télécharger un Autre",
      openLink: "Ouvrir le Lien",
    },
    stats: {
      imagesUploaded: "Images Téléchargées",
      uptime: "Disponibilité",
      latency: "Latence",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Tous droits réservés.",
      privacy: "Confidentialité",
      terms: "Conditions",
      cookies: "Cookies",
    },
    meta: {
      title: "ImageToURL - Hébergement d'Images Instantané",
      description:
        "Téléchargez des images et obtenez des liens partageables instantanément. Hébergement d'images rapide, sécurisé et fiable propulsé par un réseau CDN mondial.",
      keywords: "hébergement d'images, télécharger image, cdn, liens instantanés, partage d'images",
    },
  },
  bn: {
    nav: {
      home: "হোম",
      blog: "ব্লগ",
      documentation: "ডকুমেন্টেশন",
      api: "API",
      pricing: "মূল্য",
      signIn: "সাইন ইন",
      signOut: "সাইন আউট",
      dashboard: "ড্যাশবোর্ড",
      tools: "টুলস",
    },
    hero: {
      badge: "v2.0 এখন উপলব্ধ",
      title: "ছবি আপলোড করুন,",
      titleGradient: "তাৎক্ষণিক লিঙ্ক পান।",
      description:
        "তাৎক্ষণিকভাবে শেয়ারযোগ্য URL তৈরি করতে আপনার ফাইলগুলি ড্র্যাগ এবং ড্রপ করুন। বিদ্যুৎ-দ্রুত ডেলিভারির জন্য একটি বৈশ্বিক এজ নেটওয়ার্ক দ্বারা চালিত।",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "আপলোড করতে ক্লিক করুন বা ড্র্যাগ এবং ড্রপ করুন",
      fileTypes: "SVG, PNG, JPG বা GIF (সর্বোচ্চ 10MB)",
      secure: "সুরক্ষিত এবং এনক্রিপ্টেড",
      cdn: "গ্লোবাল CDN",
      errorInvalidType: "অবৈধ ফাইল টাইপ। দয়া করে একটি ছবি আপলোড করুন।",
      errorTooLarge: "ফাইলটি খুব বড়। সর্বোচ্চ আকার 10MB।",
      errorGeneral: "কিছু ভুল হয়েছে।",
      shareableLink: "শেয়ারযোগ্য লিঙ্ক",
      copy: "কপি",
      copied: "কপি করা হয়েছে",
      uploadAnother: "অন্য আপলোড করুন",
      openLink: "লিঙ্ক খুলুন",
    },
    stats: {
      imagesUploaded: "আপলোড করা ছবি",
      uptime: "আপটাইম",
      latency: "লেটেন্সি",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. সমস্ত অধিকার সংরক্ষিত।",
      privacy: "গোপনীয়তা",
      terms: "শর্তাবলী",
      cookies: "কুকিজ",
    },
    meta: {
      title: "ImageToURL - তাৎক্ষণিক ছবি হোস্টিং",
      description:
        "ছবি আপলোড করুন এবং তাৎক্ষণিকভাবে শেয়ারযোগ্য লিঙ্ক পান। একটি বৈশ্বিক CDN নেটওয়ার্ক দ্বারা চালিত দ্রুত, সুরক্ষিত এবং নির্ভরযোগ্য ছবি হোস্টিং।",
      keywords: "ছবি হোস্টিং, ছবি আপলোড, cdn, তাৎক্ষণিক লিঙ্ক, ছবি শেয়ারিং",
    },
  },
  pt: {
    nav: {
      home: "Início",
      blog: "Blog",
      documentation: "Documentação",
      api: "API",
      pricing: "Preços",
      signIn: "Entrar",
      signOut: "Sair",
      dashboard: "Painel",
      tools: "Ferramentas",
    },
    hero: {
      badge: "v2.0 Agora Disponível",
      title: "Envie imagens,",
      titleGradient: "obtenha links instantâneos.",
      description:
        "Arraste e solte seus arquivos para gerar um URL compartilhável instantaneamente. Alimentado por uma rede edge global para entrega ultrarrápida.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Clique para enviar ou arraste e solte",
      fileTypes: "SVG, PNG, JPG ou GIF (máx. 10MB)",
      secure: "Seguro e Criptografado",
      cdn: "CDN Global",
      errorInvalidType: "Tipo de arquivo inválido. Por favor, envie uma imagem.",
      errorTooLarge: "O arquivo é muito grande. Tamanho máximo de 10MB.",
      errorGeneral: "Algo deu errado.",
      shareableLink: "Link Compartilhável",
      copy: "Copiar",
      copied: "Copiado",
      uploadAnother: "Enviar Outro",
      openLink: "Abrir Link",
    },
    stats: {
      imagesUploaded: "Imagens Enviadas",
      uptime: "Tempo de Atividade",
      latency: "Latência",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Todos os direitos reservados.",
      privacy: "Privacidade",
      terms: "Termos",
      cookies: "Cookies",
    },
    meta: {
      title: "ImageToURL - Hospedagem Instantânea de Imagens",
      description:
        "Envie imagens e obtenha links compartilháveis instantaneamente. Hospedagem de imagens rápida, segura e confiável alimentada por uma rede CDN global.",
      keywords: "hospedagem de imagens, envio de imagem, cdn, links instantâneos, compartilhamento de imagens",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      blog: "Блог",
      documentation: "Документация",
      api: "API",
      pricing: "Цены",
      signIn: "Войти",
      signOut: "Выйти",
      dashboard: "Панель",
      tools: "Инструменты",
    },
    hero: {
      badge: "v2.0 Теперь Доступно",
      title: "Загружайте изображения,",
      titleGradient: "получайте мгновенные ссылки.",
      description:
        "Перетащите файлы, чтобы мгновенно создать общедоступный URL. Работает на глобальной пограничной сети для молниеносной доставки.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Нажмите для загрузки или перетащите",
      fileTypes: "SVG, PNG, JPG или GIF (макс. 10МБ)",
      secure: "Безопасно и Зашифровано",
      cdn: "Глобальный CDN",
      errorInvalidType: "Неверный тип файла. Пожалуйста, загрузите изображение.",
      errorTooLarge: "Файл слишком большой. Максимальный размер 10МБ.",
      errorGeneral: "Что-то пошло не так.",
      shareableLink: "Общедоступная Ссылка",
      copy: "Копировать",
      copied: "Скопировано",
      uploadAnother: "Загрузить Другое",
      openLink: "Открыть Ссылку",
    },
    stats: {
      imagesUploaded: "Загружено Изображений",
      uptime: "Время Работы",
      latency: "Задержка",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Все права защищены.",
      privacy: "Конфиденциальность",
      terms: "Условия",
      cookies: "Cookies",
    },
    meta: {
      title: "ImageToURL - Мгновенный Хостинг Изображений",
      description:
        "Загружайте изображения и мгновенно получайте общедоступные ссылки. Быстрый, безопасный и надежный хостинг изображений на базе глобальной CDN-сети.",
      keywords: "хостинг изображений, загрузка изображений, cdn, мгновенные ссылки, обмен изображениями",
    },
  },
  ur: {
    nav: {
      home: "ہوم",
      blog: "بلاگ",
      documentation: "دستاویزات",
      api: "API",
      pricing: "قیمتیں",
      signIn: "سائن ان کریں",
      signOut: "سائن آؤٹ کریں",
      dashboard: "ڈیش بورڈ",
      tools: "ٹولز",
    },
    hero: {
      badge: "v2.0 اب دستیاب ہے",
      title: "تصاویر اپ لوڈ کریں،",
      titleGradient: "فوری لنکس حاصل کریں۔",
      description:
        "فوری طور پر قابل اشتراک URL بنانے کے لیے اپنی فائلوں کو ڈریگ اور ڈراپ کریں۔ بجلی کی تیز رفتار ترسیل کے لیے عالمی ایج نیٹ ورک سے تقویت یافتہ۔",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "اپ لوڈ کرنے کے لیے کلک کریں یا ڈریگ اور ڈراپ کریں",
      fileTypes: "SVG، PNG، JPG یا GIF (زیادہ سے زیادہ 10MB)",
      secure: "محفوظ اور خفیہ کردہ",
      cdn: "عالمی CDN",
      errorInvalidType: "غلط فائل کی قسم۔ براہ کرم ایک تصویر اپ لوڈ کریں۔",
      errorTooLarge: "فائل بہت بڑی ہے۔ زیادہ سے زیادہ سائز 10MB ہے۔",
      errorGeneral: "کچھ غلط ہو گیا۔",
      shareableLink: "قابل اشتراک لنک",
      copy: "کاپی کریں",
      copied: "کاپی ہو گیا",
      uploadAnother: "دوسری اپ لوڈ کریں",
      openLink: "لنک کھولیں",
    },
    stats: {
      imagesUploaded: "اپ لوڈ شدہ تصاویر",
      uptime: "اپ ٹائم",
      latency: "تاخیر",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. تمام حقوق محفوظ ہیں۔",
      privacy: "رازداری",
      terms: "شرائط",
      cookies: "کوکیز",
    },
    meta: {
      title: "ImageToURL - فوری تصویر ہوسٹنگ",
      description:
        "تصاویر اپ لوڈ کریں اور فوری طور پر قابل اشتراک لنکس حاصل کریں۔ عالمی CDN نیٹ ورک سے تقویت یافتہ تیز، محفوظ اور قابل اعتماد تصویر ہوسٹنگ۔",
      keywords: "تصویر ہوسٹنگ، تصویر اپ لوڈ، cdn، فوری لنکس، تصویر کی شراکت",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      blog: "Blog",
      documentation: "Dokumentasi",
      api: "API",
      pricing: "Harga",
      signIn: "Masuk",
      signOut: "Keluar",
      dashboard: "Dasbor",
      tools: "Alat",
    },
    hero: {
      badge: "v2.0 Sekarang Tersedia",
      title: "Unggah gambar,",
      titleGradient: "dapatkan tautan instan.",
      description:
        "Seret dan jatuhkan file Anda untuk menghasilkan URL yang dapat dibagikan secara instan. Didukung oleh jaringan edge global untuk pengiriman secepat kilat.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Klik untuk mengunggah atau seret dan jatuhkan",
      fileTypes: "SVG, PNG, JPG atau GIF (maks. 10MB)",
      secure: "Aman & Terenkripsi",
      cdn: "CDN Global",
      errorInvalidType: "Jenis file tidak valid. Silakan unggah gambar.",
      errorTooLarge: "File terlalu besar. Ukuran maksimal 10MB.",
      errorGeneral: "Terjadi kesalahan.",
      shareableLink: "Tautan yang Dapat Dibagikan",
      copy: "Salin",
      copied: "Disalin",
      uploadAnother: "Unggah Lainnya",
      openLink: "Buka Tautan",
    },
    stats: {
      imagesUploaded: "Gambar Diunggah",
      uptime: "Waktu Aktif",
      latency: "Latensi",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Hak cipta dilindungi.",
      privacy: "Privasi",
      terms: "Ketentuan",
      cookies: "Cookies",
    },
    meta: {
      title: "ImageToURL - Hosting Gambar Instan",
      description:
        "Unggah gambar dan dapatkan tautan yang dapat dibagikan secara instan. Hosting gambar cepat, aman, dan andal yang didukung oleh jaringan CDN global.",
      keywords: "hosting gambar, unggah gambar, cdn, tautan instan, berbagi gambar",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      blog: "Blog",
      documentation: "Dokumentation",
      api: "API",
      pricing: "Preise",
      signIn: "Anmelden",
      signOut: "Abmelden",
      dashboard: "Dashboard",
      tools: "Werkzeuge",
    },
    hero: {
      badge: "v2.0 Jetzt Verfügbar",
      title: "Bilder hochladen,",
      titleGradient: "sofort Links erhalten.",
      description:
        "Ziehen Sie Ihre Dateien per Drag & Drop, um sofort eine teilbare URL zu generieren. Betrieben von einem globalen Edge-Netzwerk für blitzschnelle Lieferung.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Klicken Sie zum Hochladen oder ziehen Sie per Drag & Drop",
      fileTypes: "SVG, PNG, JPG oder GIF (max. 10MB)",
      secure: "Sicher & Verschlüsselt",
      cdn: "Globales CDN",
      errorInvalidType: "Ungültiger Dateityp. Bitte laden Sie ein Bild hoch.",
      errorTooLarge: "Die Datei ist zu groß. Maximale Größe beträgt 10MB.",
      errorGeneral: "Etwas ist schief gelaufen.",
      shareableLink: "Teilbarer Link",
      copy: "Kopieren",
      copied: "Kopiert",
      uploadAnother: "Weiteres Hochladen",
      openLink: "Link Öffnen",
    },
    stats: {
      imagesUploaded: "Hochgeladene Bilder",
      uptime: "Verfügbarkeit",
      latency: "Latenz",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Alle Rechte vorbehalten.",
      privacy: "Datenschutz",
      terms: "Bedingungen",
      cookies: "Cookies",
    },
    meta: {
      title: "ImageToURL - Sofortiges Bild-Hosting",
      description:
        "Laden Sie Bilder hoch und erhalten Sie sofort teilbare Links. Schnelles, sicheres und zuverlässiges Bild-Hosting, betrieben von einem globalen CDN-Netzwerk.",
      keywords: "Bild-Hosting, Bild hochladen, cdn, sofortige Links, Bilder teilen",
    },
  },
  ja: {
    nav: {
      home: "ホーム",
      blog: "ブログ",
      documentation: "ドキュメント",
      api: "API",
      pricing: "料金",
      signIn: "サインイン",
      signOut: "サインアウト",
      dashboard: "ダッシュボード",
      tools: "ツール",
    },
    hero: {
      badge: "v2.0 利用可能",
      title: "画像をアップロード",
      titleGradient: "即座にリンクを取得",
      description:
        "ファイルをドラッグ&ドロップして、共有可能なURLを即座に生成します。グローバルエッジネットワークによる超高速配信。",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "クリックしてアップロードまたはドラッグ&ドロップ",
      fileTypes: "SVG、PNG、JPGまたはGIF（最大10MB）",
      secure: "安全で暗号化",
      cdn: "グローバルCDN",
      errorInvalidType: "無効なファイルタイプです。画像をアップロードしてください。",
      errorTooLarge: "ファイルが大きすぎます。最大サイズは10MBです。",
      errorGeneral: "問題が発生しました。",
      shareableLink: "共有可能なリンク",
      copy: "コピー",
      copied: "コピーしました",
      uploadAnother: "別のアップロード",
      openLink: "リンクを開く",
    },
    stats: {
      imagesUploaded: "アップロードされた画像",
      uptime: "稼働時間",
      latency: "レイテンシ",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. 全著作権所有。",
      privacy: "プライバシー",
      terms: "利用規約",
      cookies: "クッキー",
    },
    meta: {
      title: "ImageToURL - 即座の画像ホスティング",
      description:
        "画像をアップロードして、即座に共有可能なリンクを取得します。グローバルCDNネットワークによる高速、安全、信頼性の高い画像ホスティング。",
      keywords: "画像ホスティング, 画像アップロード, cdn, 即座のリンク, 画像共有",
    },
  },
  sw: {
    nav: {
      home: "Nyumbani",
      blog: "Blogu",
      documentation: "Nyaraka",
      api: "API",
      pricing: "Bei",
      signIn: "Ingia",
      signOut: "Ondoka",
      dashboard: "Dashibodi",
      tools: "Zana",
    },
    hero: {
      badge: "v2.0 Inapatikana Sasa",
      title: "Pakia picha,",
      titleGradient: "pata viungo papo hapo.",
      description:
        "Kokota na udondoshe faili zako ili kutengeneza URL inayoweza kushirikiwa papo hapo. Inaendeshwa na mtandao wa kimataifa wa edge kwa utoaji wa haraka kama umeme.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Bonyeza ili kupakia au kokota na udondoshe",
      fileTypes: "SVG, PNG, JPG au GIF (juu zaidi ya 10MB)",
      secure: "Salama na Imefichwa",
      cdn: "CDN ya Kimataifa",
      errorInvalidType: "Aina ya faili si sahihi. Tafadhali pakia picha.",
      errorTooLarge: "Faili ni kubwa sana. Ukubwa wa juu zaidi ni 10MB.",
      errorGeneral: "Kuna tatizo lilitokea.",
      shareableLink: "Kiungo Kinachoweza Kushirikiwa",
      copy: "Nakili",
      copied: "Imenakiliwa",
      uploadAnother: "Pakia Nyingine",
      openLink: "Fungua Kiungo",
    },
    stats: {
      imagesUploaded: "Picha Zilizopakiwa",
      uptime: "Muda wa Kuwa Mtandaoni",
      latency: "Kuchelewa",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Haki zote zimehifadhiwa.",
      privacy: "Faragha",
      terms: "Masharti",
      cookies: "Vidakuzi",
    },
    meta: {
      title: "ImageToURL - Upakiaji wa Picha Papo Hapo",
      description:
        "Pakia picha na upate viungo vinavyoweza kushirikiwa papo hapo. Upakiaji wa picha wa haraka, salama na wa kuaminika unaendeshwa na mtandao wa CDN wa kimataifa.",
      keywords: "upakiaji wa picha, pakia picha, cdn, viungo vya papo hapo, kushiriki picha",
    },
  },
  mr: {
    nav: {
      home: "होम",
      blog: "ब्लॉग",
      documentation: "दस्तऐवजीकरण",
      api: "API",
      pricing: "किंमत",
      signIn: "साइन इन करा",
      signOut: "साइन आउट करा",
      dashboard: "डॅशबोर्ड",
      tools: "साधने",
    },
    hero: {
      badge: "v2.0 आता उपलब्ध",
      title: "प्रतिमा अपलोड करा,",
      titleGradient: "त्वरित दुवे मिळवा.",
      description:
        "त्वरित शेअर करण्यायोग्य URL तयार करण्यासाठी तुमच्या फायली ड्रॅग आणि ड्रॉप करा. विजेच्या वेगाने वितरणासाठी जागतिक एज नेटवर्कद्वारे समर्थित.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "अपलोड करण्यासाठी क्लिक करा किंवा ड्रॅग आणि ड्रॉप करा",
      fileTypes: "SVG, PNG, JPG किंवा GIF (कमाल 10MB)",
      secure: "सुरक्षित आणि एन्क्रिप्टेड",
      cdn: "जागतिक CDN",
      errorInvalidType: "अवैध फाईल प्रकार. कृपया एक प्रतिमा अपलोड करा.",
      errorTooLarge: "फाइल खूप मोठी आहे. कमाल आकार 10MB आहे.",
      errorGeneral: "काहीतरी चूक झाली.",
      shareableLink: "शेअर करण्यायोग्य दुवा",
      copy: "कॉपी करा",
      copied: "कॉपी केले",
      uploadAnother: "दुसरे अपलोड करा",
      openLink: "दुवा उघडा",
    },
    stats: {
      imagesUploaded: "अपलोड केलेल्या प्रतिमा",
      uptime: "अपटाइम",
      latency: "विलंबता",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. सर्व हक्क राखीव.",
      privacy: "गोपनीयता",
      terms: "अटी",
      cookies: "कुकीज",
    },
    meta: {
      title: "ImageToURL - त्वरित प्रतिमा होस्टिंग",
      description:
        "प्रतिमा अपलोड करा आणि त्वरित शेअर करण्यायोग्य दुवे मिळवा. जागतिक CDN नेटवर्कद्वारे समर्थित जलद, सुरक्षित आणि विश्वसनीय प्रतिमा होस्टिंग.",
      keywords: "प्रतिमा होस्टिंग, प्रतिमा अपलोड, cdn, त्वरित दुवे, प्रतिमा सामायिकरण",
    },
  },
  te: {
    nav: {
      home: "హోమ్",
      blog: "బ్లాగ్",
      documentation: "డాక్యుమెంటేషన్",
      api: "API",
      pricing: "ధరలు",
      signIn: "సైన్ ఇన్",
      signOut: "సైన్ ఔట్",
      dashboard: "డాష్‌బోర్డ్",
      tools: "టూల్స్",
    },
    hero: {
      badge: "v2.0 ఇప్పుడు అందుబాటులో ఉంది",
      title: "చిత్రాలను అప్‌లోడ్ చేయండి,",
      titleGradient: "తక్షణ లింక్‌లను పొందండి.",
      description:
        "తక్షణమే షేర్ చేయగల URL ను రూపొందించడానికి మీ ఫైల్‌లను డ్రాగ్ మరియు డ్రాప్ చేయండి. మెరుపు-వేగ డెలివరీ కోసం ప్రపంచ ఎడ్జ్ నెట్‌వర్క్ ద్వారా శక్తివంతం.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా డ్రాగ్ మరియు డ్రాప్ చేయండి",
      fileTypes: "SVG, PNG, JPG లేదా GIF (గరిష్టంగా 10MB)",
      secure: "సురక్షితం & ఎన్‌క్రిప్టెడ్",
      cdn: "గ్లోబల్ CDN",
      errorInvalidType: "చెల్లని ఫైల్ రకం. దయచేసి చిత్రాన్ని అప్‌లోడ్ చేయండి.",
      errorTooLarge: "ఫైల్ చాలా పెద్దది. గరిష్ట పరిమాణం 10MB.",
      errorGeneral: "ఏదో తప్పు జరిగింది.",
      shareableLink: "షేర్ చేయగల లింక్",
      copy: "కాపీ",
      copied: "కాపీ చేయబడింది",
      uploadAnother: "మరొకటి అప్‌లోడ్ చేయండి",
      openLink: "లింక్ తెరవండి",
    },
    stats: {
      imagesUploaded: "అప్‌లోడ్ చేయబడిన చిత్రాలు",
      uptime: "అప్‌టైమ్",
      latency: "లాటెన్సీ",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. అన్ని హక్కులు సంరక్షించబడ్డాయి.",
      privacy: "గోప్యత",
      terms: "నిబంధనలు",
      cookies: "కుకీలు",
    },
    meta: {
      title: "ImageToURL - తక్షణ చిత్ర హోస్టింగ్",
      description:
        "చిత్రాలను అప్‌లోడ్ చేయండి మరియు తక్షణమే షేర్ చేయగల లింక్‌లను పొందండి. గ్లోబల్ CDN నెట్‌వర్క్ ద్వారా శక్తివంతంగా ఉండే వేగవంతమైన, సురక్షితమైన మరియు నమ్మదగిన చిత్ర హోస్టింగ్.",
      keywords: "చిత్ర హోస్టింగ్, చిత్ర అప్‌లోడ్, cdn, తక్షణ లింక్‌లు, చిత్ర షేరింగ్",
    },
  },
  tr: {
    nav: {
      home: "Ana Sayfa",
      blog: "Blog",
      documentation: "Dokümantasyon",
      api: "API",
      pricing: "Fiyatlandırma",
      signIn: "Giriş Yap",
      signOut: "Çıkış Yap",
      dashboard: "Kontrol Paneli",
      tools: "Araçlar",
    },
    hero: {
      badge: "v2.0 Şimdi Mevcut",
      title: "Görselleri yükleyin,",
      titleGradient: "anında bağlantılar alın.",
      description:
        "Anında paylaşılabilir bir URL oluşturmak için dosyalarınızı sürükleyip bırakın. Şimşek hızında teslimat için küresel bir edge ağı tarafından desteklenmektedir.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Yüklemek için tıklayın veya sürükleyip bırakın",
      fileTypes: "SVG, PNG, JPG veya GIF (maks. 10MB)",
      secure: "Güvenli ve Şifreli",
      cdn: "Küresel CDN",
      errorInvalidType: "Geçersiz dosya türü. Lütfen bir görsel yükleyin.",
      errorTooLarge: "Dosya çok büyük. Maksimum boyut 10MB'dir.",
      errorGeneral: "Bir şeyler yanlış gitti.",
      shareableLink: "Paylaşılabilir Bağlantı",
      copy: "Kopyala",
      copied: "Kopyalandı",
      uploadAnother: "Başka Yükle",
      openLink: "Bağlantıyı Aç",
    },
    stats: {
      imagesUploaded: "Yüklenen Görseller",
      uptime: "Çalışma Süresi",
      latency: "Gecikme",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Tüm hakları saklıdır.",
      privacy: "Gizlilik",
      terms: "Şartlar",
      cookies: "Çerezler",
    },
    meta: {
      title: "ImageToURL - Anında Görsel Barındırma",
      description:
        "Görselleri yükleyin ve anında paylaşılabilir bağlantılar alın. Küresel bir CDN ağı tarafından desteklenen hızlı, güvenli ve güvenilir görsel barındırma.",
      keywords: "görsel barındırma, görsel yükleme, cdn, anında bağlantılar, görsel paylaşımı",
    },
  },
  ta: {
    nav: {
      home: "ஹோம்",
      blog: "வலைப்பதிவு",
      documentation: "ஆவணமாக்கல்",
      api: "API",
      pricing: "விலை நிர்ணயம்",
      signIn: "உள்நுழைக",
      signOut: "வெளியேறு",
      dashboard: "டாஷ்போர்டு",
      tools: "கருவிகள்",
    },
    hero: {
      badge: "v2.0 இப்போது கிடைக்கிறது",
      title: "படங்களைப் பதிவேற்றவும்,",
      titleGradient: "உடனடி இணைப்புகளைப் பெறுங்கள்.",
      description:
        "பகிரக்கூடிய URL ஐ உடனடியாக உருவாக்க உங்கள் கோப்புகளை இழுத்து விடவும். மின்னல் வேக விநியோகத்திற்கு உலகளாவிய எட்ஜ் நெட்வொர்க் மூலம் இயங்குகிறது.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுத்து விடவும்",
      fileTypes: "SVG, PNG, JPG அல்லது GIF (அதிகபட்சம் 10MB)",
      secure: "பாதுகாப்பான & மறைகுறியாக்கப்பட்ட",
      cdn: "உலகளாவிய CDN",
      errorInvalidType: "தவறான கோப்பு வகை. தயவுசெய்து ஒரு படத்தைப் பதிவேற்றவும்.",
      errorTooLarge: "கோப்பு மிகவும் பெரியது. அதிகபட்ச அளவு 10MB.",
      errorGeneral: "ஏதோ தவறு நடந்தது.",
      shareableLink: "பகிரக்கூடிய இணைப்பு",
      copy: "நகலெடு",
      copied: "நகலெடுக்கப்பட்டது",
      uploadAnother: "மற்றொன்றை பதிவேற்றவும்",
      openLink: "இணைப்பைத் திறக்கவும்",
    },
    stats: {
      imagesUploaded: "பதிவேற்றப்பட்ட படங்கள்",
      uptime: "செயல்பாட்டு நேரம்",
      latency: "தாமதம்",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      privacy: "தனியுரிமை",
      terms: "நிபந்தனைகள்",
      cookies: "குக்கீகள்",
    },
    meta: {
      title: "ImageToURL - உடனடி படம் ஹோஸ்டிங்",
      description:
        "படங்களைப் பதிவேற்றி உடனடியாக பகிரக்கூடிய இணைப்புகளைப் பெறுங்கள். உலகளாவிய CDN நெட்வொர்க் மூலம் இயங்கும் வேகமான, பாதுகாப்பான மற்றும் நம்பகமான படம் ஹோஸ்டிங்.",
      keywords: "படம் ஹோஸ்டிங், படம் பதிவேற்றம், cdn, உடனடி இணைப்புகள், படம் பகிர்வு",
    },
  },
  vi: {
    nav: {
      home: "Trang chủ",
      blog: "Blog",
      documentation: "Tài Liệu",
      api: "API",
      pricing: "Giá Cả",
      signIn: "Đăng Nhập",
      signOut: "Đăng Xuất",
      dashboard: "Bảng điều khiển",
      tools: "Công cụ",
    },
    hero: {
      badge: "v2.0 Hiện Có Sẵn",
      title: "Tải lên hình ảnh,",
      titleGradient: "nhận liên kết ngay lập tức.",
      description:
        "Kéo và thả tệp của bạn để tạo URL có thể chia sẻ ngay lập tức. Được hỗ trợ bởi mạng lưới edge toàn cầu để phân phối nhanh như chớp.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Nhấp để tải lên hoặc kéo và thả",
      fileTypes: "SVG, PNG, JPG hoặc GIF (tối đa 10MB)",
      secure: "An Toàn & Được Mã Hóa",
      cdn: "CDN Toàn Cầu",
      errorInvalidType: "Loại tệp không hợp lệ. Vui lòng tải lên hình ảnh.",
      errorTooLarge: "Tệp quá lớn. Kích thước tối đa là 10MB.",
      errorGeneral: "Đã xảy ra lỗi.",
      shareableLink: "Liên Kết Có Thể Chia Sẻ",
      copy: "Sao Chép",
      copied: "Đã Sao Chép",
      uploadAnother: "Tải Lên Khác",
      openLink: "Mở Liên Kết",
    },
    stats: {
      imagesUploaded: "Hình Ảnh Đã Tải Lên",
      uptime: "Thời Gian Hoạt Động",
      latency: "Độ Trễ",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Đã đăng ký bản quyền.",
      privacy: "Quyền Riêng Tư",
      terms: "Điều Khoản",
      cookies: "Cookies",
    },
    meta: {
      title: "ImageToURL - Lưu Trữ Hình Ảnh Ngay Lập Tức",
      description:
        "Tải lên hình ảnh và nhận liên kết có thể chia sẻ ngay lập tức. Lưu trữ hình ảnh nhanh, an toàn và đáng tin cậy được hỗ trợ bởi mạng CDN toàn cầu.",
      keywords: "lưu trữ hình ảnh, tải lên hình ảnh, cdn, liên kết ngay lập tức, chia sẻ hình ảnh",
    },
  },
  ko: {
    nav: {
      home: "홈",
      blog: "블로그",
      documentation: "문서",
      api: "API",
      pricing: "가격",
      signIn: "로그인",
      signOut: "로그아웃",
      dashboard: "대시보드",
      tools: "도구",
    },
    hero: {
      badge: "v2.0 현재 사용 가능",
      title: "이미지를 업로드하고,",
      titleGradient: "즉시 링크를 받으세요.",
      description:
        "파일을 드래그 앤 드롭하여 즉시 공유 가능한 URL을 생성하세요. 초고속 전송을 위한 글로벌 엣지 네트워크로 구동됩니다.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "클릭하여 업로드하거나 드래그 앤 드롭하세요",
      fileTypes: "SVG, PNG, JPG 또는 GIF (최대 10MB)",
      secure: "안전하고 암호화됨",
      cdn: "글로벌 CDN",
      errorInvalidType: "잘못된 파일 형식입니다. 이미지를 업로드해 주세요.",
      errorTooLarge: "파일이 너무 큽니다. 최대 크기는 10MB입니다.",
      errorGeneral: "문제가 발생했습니다.",
      shareableLink: "공유 가능한 링크",
      copy: "복사",
      copied: "복사됨",
      uploadAnother: "다른 항목 업로드",
      openLink: "링크 열기",
    },
    stats: {
      imagesUploaded: "업로드된 이미지",
      uptime: "가동 시간",
      latency: "지연 시간",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. 모든 권리 보유.",
      privacy: "개인정보",
      terms: "약관",
      cookies: "쿠키",
    },
    meta: {
      title: "ImageToURL - 즉시 이미지 호스팅",
      description:
        "이미지를 업로드하고 즉시 공유 가능한 링크를 받으세요. 글로벌 CDN 네트워크로 구동되는 빠르고 안전하며 신뢰할 수 있는 이미지 호스팅.",
      keywords: "이미지 호스팅, 이미지 업로드, cdn, 즉시 링크, 이미지 공유",
    },
  },
  it: {
    nav: {
      home: "Home",
      blog: "Blog",
      documentation: "Documentazione",
      api: "API",
      pricing: "Prezzi",
      signIn: "Accedi",
      signOut: "Esci",
      dashboard: "Pannello",
      tools: "Strumenti",
    },
    hero: {
      badge: "v2.0 Ora Disponibile",
      title: "Carica immagini,",
      titleGradient: "ottieni link istantanei.",
      description:
        "Trascina e rilascia i tuoi file per generare un URL condivisibile istantaneamente. Alimentato da una rete edge globale per una consegna velocissima.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Clicca per caricare o trascina e rilascia",
      fileTypes: "SVG, PNG, JPG o GIF (max. 10MB)",
      secure: "Sicuro e Crittografato",
      cdn: "CDN Globale",
      errorInvalidType: "Tipo di file non valido. Si prega di caricare un'immagine.",
      errorTooLarge: "Il file è troppo grande. Dimensione massima 10MB.",
      errorGeneral: "Qualcosa è andato storto.",
      shareableLink: "Link Condivisibile",
      copy: "Copia",
      copied: "Copiato",
      uploadAnother: "Carica un Altro",
      openLink: "Apri Link",
    },
    stats: {
      imagesUploaded: "Immagini Caricate",
      uptime: "Tempo di Attività",
      latency: "Latenza",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Tutti i diritti riservati.",
      privacy: "Privacy",
      terms: "Termini",
      cookies: "Cookies",
    },
    meta: {
      title: "ImageToURL - Hosting Istantaneo di Immagini",
      description:
        "Carica immagini e ottieni link condivisibili istantaneamente. Hosting di immagini veloce, sicuro e affidabile alimentato da una rete CDN globale.",
      keywords: "hosting di immagini, caricamento immagine, cdn, link istantanei, condivisione immagini",
    },
  },
  th: {
    nav: {
      home: "หน้าแรก",
      blog: "บล็อก",
      documentation: "เอกสาร",
      api: "API",
      pricing: "ราคา",
      signIn: "เข้าสู่ระบบ",
      signOut: "ออกจากระบบ",
      dashboard: "แดชบอร์ด",
      tools: "เครื่องมือ",
    },
    hero: {
      badge: "v2.0 พร้อมใช้งานแล้ว",
      title: "อัปโหลดรูปภาพ",
      titleGradient: "รับลิงก์ทันที",
      description: "ลากและวางไฟล์ของคุณเพื่อสร้าง URL ที่แชร์ได้ทันที ขับเคลื่อนโดยเครือข่ายเอดจ์ทั่วโลกเพื่อการส่งมอบที่รวดเร็วเหมือนฟ้าแลบ",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "คลิกเพื่ออัปโหลดหรือลากและวาง",
      fileTypes: "SVG, PNG, JPG หรือ GIF (สูงสุด 10MB)",
      secure: "ปลอดภัยและเข้ารหัส",
      cdn: "CDN ทั่วโลก",
      errorInvalidType: "ประเภทไฟล์ไม่ถูกต้อง โปรดอัปโหลดรูปภาพ",
      errorTooLarge: "ไฟล์ใหญ่เกินไป ขนาดสูงสุด 10MB",
      errorGeneral: "เกิดข้อผิดพลาด",
      shareableLink: "ลิงก์ที่แชร์ได้",
      copy: "คัดลอก",
      copied: "คัดลอกแล้ว",
      uploadAnother: "อัปโหลดอีก",
      openLink: "เปิดลิงก์",
    },
    stats: {
      imagesUploaded: "รูปภาพที่อัปโหลด",
      uptime: "เวลาทำงาน",
      latency: "ความล่าช้า",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. สงวนลิขสิทธิ์",
      privacy: "ความเป็นส่วนตัว",
      terms: "เงื่อนไข",
      cookies: "คุกกี้",
    },
    meta: {
      title: "ImageToURL - โฮสติ้งรูปภาพทันที",
      description: "อัปโหลดรูปภาพและรับลิงก์ที่แชร์ได้ทันที การโฮสต์รูปภาพที่รวดเร็ว ปลอดภัย และเชื่อถือได้ ขับเคลื่อนโดยเครือข่าย CDN ทั่วโลก",
      keywords: "โฮสติ้งรูปภาพ, อัปโหลดรูปภาพ, cdn, ลิงก์ทันที, แชร์รูปภาพ",
    },
  },
  gu: {
    nav: {
      home: "હોમ",
      blog: "બ્લોગ",
      documentation: "દસ્તાવેજીકરણ",
      api: "API",
      pricing: "કિંમતો",
      signIn: "સાઇન ઇન કરો",
      signOut: "સાઇન આઉટ કરો",
      dashboard: "ડેશબોર્ડ",
      tools: "સાધનો",
    },
    hero: {
      badge: "v2.0 હવે ઉપલબ્ધ",
      title: "છબીઓ અપલોડ કરો,",
      titleGradient: "તાત્કાલિક લિંક્સ મેળવો.",
      description:
        "તાત્કાલિક શેર કરી શકાય તેવા URL બનાવવા માટે તમારી ફાઇલોને ખેંચો અને મૂકો. વીજળી-ઝડપી વિતરણ માટે વૈશ્વિક એજ નેટવર્ક દ્વારા સંચાલિત.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "અપલોડ કરવા માટે ક્લિક કરો અથવા ખેંચો અને મૂકો",
      fileTypes: "SVG, PNG, JPG અથવા GIF (મહત્તમ 10MB)",
      secure: "સુરક્ષિત અને એન્ક્રિપ્ટેડ",
      cdn: "વૈશ્વિક CDN",
      errorInvalidType: "અમાન્ય ફાઇલ પ્રકાર. કૃપા કરીને છબી અપલોડ કરો.",
      errorTooLarge: "ફાઇલ ખૂબ મોટી છે. મહત્તમ કદ 10MB છે.",
      errorGeneral: "કંઈક ખોટું થયું.",
      shareableLink: "શેર કરી શકાય તેવી લિંક",
      copy: "કૉપિ કરો",
      copied: "કૉપિ કર્યું",
      uploadAnother: "બીજું અપલોડ કરો",
      openLink: "લિંક ખોલો",
    },
    stats: {
      imagesUploaded: "અપલોડ કરેલી છબીઓ",
      uptime: "અપટાઇમ",
      latency: "વિલંબ",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. તમામ અધિકારો અનામત.",
      privacy: "ગોપનીયતા",
      terms: "શરતો",
      cookies: "કુકીઝ",
    },
    meta: {
      title: "ImageToURL - તાત્કાલિક છબી હોસ્ટિંગ",
      description:
        "છબીઓ અપલોડ કરો અને તાત્કાલિક શેર કરી શકાય તેવી લિંક્સ મેળવો. વૈશ્વિક CDN નેટવર્ક દ્વારા સંચાલિત ઝડપી, સુરક્ષિત અને વિશ્વસનીય છબી હોસ્ટિંગ.",
      keywords: "છબી હોસ્ટિંગ, છબી અપલોડ, cdn, તાત્કાલિક લિંક્સ, છબી શેરિંગ",
    },
  },
  pl: {
    nav: {
      home: "Strona główna",
      blog: "Blog",
      documentation: "Dokumentacja",
      api: "API",
      pricing: "Cennik",
      signIn: "Zaloguj się",
      signOut: "Wyloguj się",
      dashboard: "Panel",
      tools: "Narzędzia",
    },
    hero: {
      badge: "v2.0 Teraz Dostępne",
      title: "Prześlij obrazy,",
      titleGradient: "otrzymaj natychmiastowe linki.",
      description:
        "Przeciągnij i upuść pliki, aby natychmiast wygenerować możliwy do udostępnienia adres URL. Zasilane przez globalną sieć brzegową dla błyskawicznej dostawy.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Kliknij, aby przesłać lub przeciągnij i upuść",
      fileTypes: "SVG, PNG, JPG lub GIF (maks. 10MB)",
      secure: "Bezpieczne i Zaszyfrowane",
      cdn: "Globalny CDN",
      errorInvalidType: "Nieprawidłowy typ pliku. Prześlij obraz.",
      errorTooLarge: "Plik jest za duży. Maksymalny rozmiar to 10MB.",
      errorGeneral: "Coś poszło nie tak.",
      shareableLink: "Link do Udostępnienia",
      copy: "Kopiuj",
      copied: "Skopiowano",
      uploadAnother: "Prześlij Inny",
      openLink: "Otwórz Link",
    },
    stats: {
      imagesUploaded: "Przesłane Obrazy",
      uptime: "Czas Działania",
      latency: "Opóźnienie",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Wszelkie prawa zastrzeżone.",
      privacy: "Prywatność",
      terms: "Warunki",
      cookies: "Ciasteczka",
    },
    meta: {
      title: "ImageToURL - Natychmiastowy Hosting Obrazów",
      description:
        "Prześlij obrazy i natychmiast otrzymaj linki do udostępnienia. Szybki, bezpieczny i niezawodny hosting obrazów zasilany przez globalną sieć CDN.",
      keywords: "hosting obrazów, przesyłanie obrazów, cdn, natychmiastowe linki, udostępnianie obrazów",
    },
  },
  uk: {
    nav: {
      home: "Головна",
      blog: "Блог",
      documentation: "Документація",
      api: "API",
      pricing: "Ціни",
      signIn: "Увійти",
      signOut: "Вийти",
      dashboard: "Панель",
      tools: "Інструменти",
    },
    hero: {
      badge: "v2.0 Тепер Доступно",
      title: "Завантажуйте зображення,",
      titleGradient: "отримуйте миттєві посилання.",
      description:
        "Перетягніть файли, щоб миттєво створити загальнодоступне посилання. Працює на глобальній граничній мережі для блискавичної доставки.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "Натисніть для завантаження або перетягніть",
      fileTypes: "SVG, PNG, JPG або GIF (макс. 10МБ)",
      secure: "Безпечно і Зашифровано",
      cdn: "Глобальний CDN",
      errorInvalidType: "Недійсний тип файлу. Будь ласка, завантажте зображення.",
      errorTooLarge: "Файл занадто великий. Максимальний розмір 10МБ.",
      errorGeneral: "Щось пішло не так.",
      shareableLink: "Загальнодоступне Посилання",
      copy: "Копіювати",
      copied: "Скопійовано",
      uploadAnother: "Завантажити Інше",
      openLink: "Відкрити Посилання",
    },
    stats: {
      imagesUploaded: "Завантажено Зображень",
      uptime: "Час Роботи",
      latency: "Затримка",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. Усі права захищені.",
      privacy: "Конфіденційність",
      terms: "Умови",
      cookies: "Cookies",
    },
    meta: {
      title: "ImageToURL - Миттєвий Хостинг Зображень",
      description:
        "Завантажуйте зображення та миттєво отримуйте загальнодоступні посилання. Швидкий, безпечний та надійний хостинг зображень на базі глобальної CDN-мережі.",
      keywords: "хостинг зображень, завантаження зображень, cdn, миттєві посилання, обмін зображеннями",
    },
  },
  fa: {
    nav: {
      home: "خانه",
      blog: "وبلاگ",
      documentation: "مستندات",
      api: "API",
      pricing: "قیمت‌گذاری",
      signIn: "ورود",
      signOut: "خروج",
      dashboard: "داشبورد",
      tools: "ابزارها",
    },
    hero: {
      badge: "v2.0 اکنون موجود است",
      title: "تصاویر را آپلود کنید،",
      titleGradient: "پیوندهای فوری دریافت کنید.",
      description:
        "فایل‌های خود را بکشید و رها کنید تا فوراً یک URL قابل اشتراک‌گذاری ایجاد شود. توسط یک شبکه لبه جهانی برای تحویل فوق‌سریع پشتیبانی می‌شود.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "برای آپلود کلیک کنید یا بکشید و رها کنید",
      fileTypes: "SVG، PNG، JPG یا GIF (حداکثر 10MB)",
      secure: "امن و رمزگذاری شده",
      cdn: "CDN جهانی",
      errorInvalidType: "نوع فایل نامعتبر است. لطفاً یک تصویر آپلود کنید.",
      errorTooLarge: "فایل خیلی بزرگ است. حداکثر اندازه 10MB است.",
      errorGeneral: "مشکلی پیش آمد.",
      shareableLink: "پیوند قابل اشتراک",
      copy: "کپی",
      copied: "کپی شد",
      uploadAnother: "آپلود دیگر",
      openLink: "باز کردن پیوند",
    },
    stats: {
      imagesUploaded: "تصاویر آپلود شده",
      uptime: "زمان فعالیت",
      latency: "تأخیر",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. تمامی حقوق محفوظ است.",
      privacy: "حریم خصوصی",
      terms: "شرایط",
      cookies: "کوکی‌ها",
    },
    meta: {
      title: "ImageToURL - میزبانی فوری تصویر",
      description:
        "تصاویر را آپلود کنید و فوراً پیوندهای قابل اشتراک دریافت کنید. میزبانی تصویر سریع، امن و قابل اعتماد که توسط یک شبکه CDN جهانی پشتیبانی می‌شود.",
      keywords: "میزبانی تصویر، آپلود تصویر، cdn، پیوندهای فوری، اشتراک تصویر",
    },
  },
  ml: {
    nav: {
      home: "ഹോം",
      blog: "ബ്ലോഗ്",
      documentation: "ഡോക്യുമെന്റേഷൻ",
      api: "API",
      pricing: "വിലനിർണ്ണയം",
      signIn: "സൈൻ ഇൻ ചെയ്യുക",
      signOut: "സൈൻ ഔട്ട് ചെയ്യുക",
      dashboard: "ഡാഷ്‌ബോർഡ്",
      tools: "ടൂളുകൾ",
    },
    hero: {
      badge: "v2.0 ഇപ്പോൾ ലഭ്യമാണ്",
      title: "ചിത്രങ്ങൾ അപ്‌ലോഡ് ചെയ്യുക,",
      titleGradient: "തൽക്ഷണ ലിങ്കുകൾ നേടുക.",
      description:
        "പങ്കിടാവുന്ന URL തൽക്ഷണം സൃഷ്‌ടിക്കുന്നതിന് നിങ്ങളുടെ ഫയലുകൾ വലിച്ചിടുക. മിന്നൽ വേഗത്തിലുള്ള ഡെലിവറിക്കായി ആഗോള എഡ്ജ് നെറ്റ്‌വർക്ക് നൽകുന്നു.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "അപ്‌ലോഡ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക അല്ലെങ്കിൽ വലിച്ചിടുക",
      fileTypes: "SVG, PNG, JPG അല്ലെങ്കിൽ GIF (പരമാവധി 10MB)",
      secure: "സുരക്ഷിതവും എൻക്രിപ്റ്റ് ചെയ്തതും",
      cdn: "ആഗോള CDN",
      errorInvalidType: "അസാധുവായ ഫയൽ തരം. ദയവായി ഒരു ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.",
      errorTooLarge: "ഫയൽ വളരെ വലുതാണ്. പരമാവധി വലിപ്പം 10MB ആണ്.",
      errorGeneral: "എന്തോ തെറ്റ് സംഭവിച്ചു.",
      shareableLink: "പങ്കിടാവുന്ന ലിങ്ക്",
      copy: "പകർത്തുക",
      copied: "പകർത്തി",
      uploadAnother: "മറ്റൊന്ന് അപ്‌ലോഡ് ചെയ്യുക",
      openLink: "ലിങ്ക് തുറക്കുക",
    },
    stats: {
      imagesUploaded: "അപ്‌ലോഡ് ചെയ്ത ചിത്രങ്ങൾ",
      uptime: "പ്രവർത്തന സമയം",
      latency: "കാലതാമസം",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.",
      privacy: "സ്വകാര്യത",
      terms: "നിബന്ധനകൾ",
      cookies: "കുക്കികൾ",
    },
    meta: {
      title: "ImageToURL - തൽക്ഷണ ചിത്ര ഹോസ്റ്റിംഗ്",
      description:
        "ചിത്രങ്ങൾ അപ്‌ലോഡ് ചെയ്ത് തൽക്ഷണം പങ്കിടാവുന്ന ലിങ്കുകൾ നേടുക. ആഗോള CDN നെറ്റ്‌വർക്ക് നൽകുന്ന വേഗമേറിയതും സുരക്ഷിതവും വിശ്വസനീയവുമായ ചിത്ര ഹോസ്റ്റിംഗ്.",
      keywords: "ചിത്ര ഹോസ്റ്റിംഗ്, ചിത്രം അപ്‌ലോഡ്, cdn, തൽക്ഷണ ലിങ്കുകൾ, ചിത്ര പങ്കിടൽ",
    },
  },
  kn: {
    nav: {
      home: "ಹೋಮ್",
      blog: "ಬ್ಲಾಗ್",
      documentation: "ದಾಖಲಾತಿ",
      api: "API",
      pricing: "ಬೆಲೆ",
      signIn: "ಸೈನ್ ಇನ್ ಮಾಡಿ",
      signOut: "ಸೈನ್ ಔಟ್ ಮಾಡಿ",
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      tools: "ಉಪಕರಣಗಳು",
    },
    hero: {
      badge: "v2.0 ಈಗ ಲಭ್ಯವಿದೆ",
      title: "ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ,",
      titleGradient: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ.",
      description:
        "ತಕ್ಷಣ ಹಂಚಿಕೊಳ್ಳಬಹುದಾದ URL ಅನ್ನು ರಚಿಸಲು ನಿಮ್ಮ ಫೈಲ್‌ಗಳನ್ನು ಡ್ರ್ಯಾಗ್ ಮತ್ತು ಡ್ರಾಪ್ ಮಾಡಿ. ಮಿಂಚಿನ ವೇಗದ ವಿತರಣೆಗಾಗಿ ಜಾಗತಿಕ ಎಡ್ಜ್ ನೆಟ್‌ವರ್ಕ್‌ನಿಂದ ಚಾಲಿತ.",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಡ್ರ್ಯಾಗ್ ಮತ್ತು ಡ್ರಾಪ್ ಮಾಡಿ",
      fileTypes: "SVG, PNG, JPG ಅಥವಾ GIF (ಗರಿಷ್ಠ 10MB)",
      secure: "ಸುರಕ್ಷಿತ ಮತ್ತು ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ",
      cdn: "ಜಾಗತಿಕ CDN",
      errorInvalidType: "ಅಮಾನ್ಯ ಫೈಲ್ ಪ್ರಕಾರ. ದಯವಿಟ್ಟು ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
      errorTooLarge: "ಫೈಲ್ ತುಂಬಾ ದೊಡ್ಡದಾಗಿದೆ. ಗರಿಷ್ಠ ಗಾತ್ರ 10MB ಆಗಿದೆ.",
      errorGeneral: "ಏನೋ ತಪ್ಪಾಗಿದೆ.",
      shareableLink: "ಹಂಚಿಕೊಳ್ಳಬಹುದಾದ ಲಿಂಕ್",
      copy: "ನಕಲಿಸಿ",
      copied: "ನಕಲಿಸಲಾಗಿದೆ",
      uploadAnother: "ಇನ್ನೊಂದನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      openLink: "ಲಿಂಕ್ ತೆರೆಯಿರಿ",
    },
    stats: {
      imagesUploaded: "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರಗಳು",
      uptime: "ಅಪ್‌ಟೈಮ್",
      latency: "ವಿಳಂಬ",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
      privacy: "ಗೌಪ್ಯತೆ",
      terms: "ನಿಯಮಗಳು",
      cookies: "ಕುಕೀಗಳು",
    },
    meta: {
      title: "ImageToURL - ತ್ವರಿತ ಚಿತ್ರ ಹೋಸ್ಟಿಂಗ್",
      description:
        "ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ತಕ್ಷಣ ಹಂಚಿಕೊಳ್ಳಬಹುದಾದ ಲಿಂಕ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ. ಜಾಗತಿಕ CDN ನೆಟ್‌ವರ್ಕ್‌ನಿಂದ ಚಾಲಿತವಾದ ವೇಗದ, ಸುರಕ್ಷಿತ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಚಿತ್ರ ಹೋಸ್ಟಿಂಗ್.",
      keywords: "ಚಿತ್ರ ಹೋಸ್ಟಿಂಗ್, ಚಿತ್ರ ಅಪ್‌ಲೋಡ್, cdn, ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು, ಚಿತ್ರ ಹಂಚಿಕೆ",
    },
  },
  or: {
    nav: {
      home: "ହୋମ",
      blog: "ବ୍ଲଗ୍",
      documentation: "ଡକ୍ୟୁମେଣ୍ଟେସନ୍",
      api: "API",
      pricing: "ମୂଲ୍ୟ",
      signIn: "ସାଇନ୍ ଇନ୍ କରନ୍ତୁ",
      signOut: "ସାଇନ୍ ଆଉଟ୍ କରନ୍ତୁ",
      dashboard: "ଡ୍ୟାସବୋର୍ଡ",
      tools: "ଟୁଲ୍ସ",
    },
    hero: {
      badge: "v2.0 ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ",
      title: "ଚିତ୍ର ଅପଲୋଡ୍ କରନ୍ତୁ,",
      titleGradient: "ତୁରନ୍ତ ଲିଙ୍କ୍ ପାଆନ୍ତୁ।",
      description:
        "ତୁରନ୍ତ ଶେୟାର କରିବା ଯୋଗ୍ୟ URL ସୃଷ୍ଟି କରିବାକୁ ଆପଣଙ୍କର ଫାଇଲଗୁଡ଼ିକୁ ଡ୍ରାଗ୍ ଏବଂ ଡ୍ରପ୍ କରନ୍ତୁ। ବିଦ୍ୟୁତ୍-ଦ୍ରୁତ ବିତରଣ ପାଇଁ ବିଶ୍ୱବ୍ୟାପୀ ଏଜ୍ ନେଟୱାର୍କ ଦ୍ୱାରା ଚାଳିତ।",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "ଅପଲୋଡ୍ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ କିମ୍ବା ଡ୍ରାଗ୍ ଏବଂ ଡ୍ରପ୍ କରନ୍ତୁ",
      fileTypes: "SVG, PNG, JPG କିମ୍ବା GIF (ସର୍ବାଧିକ 10MB)",
      secure: "ସୁରକ୍ଷିତ ଏବଂ ଏନକ୍ରିପ୍ଟେଡ୍",
      cdn: "ବିଶ୍ୱବ୍ୟାପୀ CDN",
      errorInvalidType: "ଅବୈଧ ଫାଇଲ୍ ପ୍ରକାର। ଦୟାକରି ଏକ ଚିତ୍ର ଅପଲୋଡ୍ କରନ୍ତୁ।",
      errorTooLarge: "ଫାଇଲ୍ ଅତ୍ୟଧିକ ବଡ଼। ସର୍ବାଧିକ ଆକାର 10MB ଅଟେ।",
      errorGeneral: "କିଛି ଭୁଲ ହୋଇଗଲା।",
      shareableLink: "ଶେୟାର କରିବା ଯୋଗ୍ୟ ଲିଙ୍କ୍",
      copy: "କପି କରନ୍ତୁ",
      copied: "କପି କରାଯାଇଛି",
      uploadAnother: "ଅନ୍ୟଟି ଅପଲୋଡ୍ କରନ୍ତୁ",
      openLink: "ଲିଙ୍କ୍ ଖୋଲନ୍ତୁ",
    },
    stats: {
      imagesUploaded: "ଅପଲୋଡ୍ ହୋଇଥିବା ଚିତ୍ରଗୁଡ଼ିକ",
      uptime: "ଅପଟାଇମ୍",
      latency: "ବିଳମ୍ବ",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।",
      privacy: "ଗୋପନୀୟତା",
      terms: "ସର୍ତ୍ତାବଳୀ",
      cookies: "କୁକିଜ୍",
    },
    meta: {
      title: "ImageToURL - ତୁରନ୍ତ ଚିତ୍ର ହୋଷ୍ଟିଂ",
      description:
        "ଚିତ୍ରଗୁଡ଼ିକୁ ଅପଲୋଡ୍ କରନ୍ତୁ ଏବଂ ତୁରନ୍ତ ଶେୟାର କରିବା ଯୋଗ୍ୟ ଲିଙ୍କ୍ ପାଆନ୍ତୁ। ବିଶ୍ୱବ୍ୟାପୀ CDN ନେଟୱାର୍କ ଦ୍ୱାରା ଚାଳିତ ଦ୍ରୁତ, ସୁରକ୍ଷିତ ଏବଂ ବିଶ୍ୱସନୀୟ ଚିତ୍ର ହୋଷ୍ଟିଂ।",
      keywords: "ଚିତ୍ର ହୋଷ୍ଟିଂ, ଚିତ୍ର ଅପଲୋଡ୍, cdn, ତୁରନ୍ତ ଲିଙ୍କ୍, ଚିତ୍ର ଶେୟାରିଂ",
    },
  },
  my: {
    nav: {
      home: "ပင်မ",
      blog: "ဘလော့ဂ်",
      documentation: "စာရွက်စာတမ်းများ",
      api: "API",
      pricing: "စျေးနှုန်း",
      signIn: "အကောင့်ဝင်ရန်",
      signOut: "အကောင့်ထွက်ရန်",
      dashboard: "ဒက်ရှ်ဘုတ်",
      tools: "ကိရိယာများ",
    },
    hero: {
      badge: "v2.0 ယခုရရှိနိုင်ပါပြီ",
      title: "ပုံများတင်ပါ၊",
      titleGradient: "ချက်ချင်းလင့်ခ်များရယူပါ။",
      description:
        "ချက်ချင်းမျှဝေနိုင်သော URL ကိုဖန်တီးရန် သင့်ဖိုင်များကို ဆွဲထည့်ပါ။ မြန်ဆန်သောပို့ဆောင်မှုအတွက် ကမ္ဘာလုံးဆိုင်ရာ edge ကွန်ရက်ဖြင့် စွမ်းအားပေးထားသည်။",
    },
    intro: {
      title: "What is Image to URL?",
      content: "Image to URL is the process of uploading an image file to a hosting service and receiving a shareable web link (URL) that anyone can access. This URL can be embedded in websites, shared on social media, or used in emails and documents. ImageToURL provides this service completely free with no account required.",
    },
    upload: {
      clickToUpload: "တင်ရန် နှိပ်ပါ သို့မဟုတ် ဆွဲထည့်ပါ",
      fileTypes: "SVG, PNG, JPG သို့မဟုတ် GIF (အများဆုံး 10MB)",
      secure: "လုံခြုံပြီး ကုဒ်ဝှက်ထားသည်",
      cdn: "ကမ္ဘာလုံးဆိုင်ရာ CDN",
      errorInvalidType: "မမှန်ကန်သောဖိုင်အမျိုးအစား။ ကျေးဇူးပြု၍ ပုံတစ်ပုံတင်ပါ။",
      errorTooLarge: "ဖိုင်သည် အလွန်ကြီးသည်။ အများဆုံးအရွယ်အစား 10MB ဖြစ်သည်။",
      errorGeneral: "တစ်ခုခုမှားယွင်းနေသည်။",
      shareableLink: "မျှဝေနိုင်သောလင့်ခ်",
      copy: "ကူးယူ",
      copied: "ကူးယူပြီးပါပြီ",
      uploadAnother: "အခြားတင်ပါ",
      openLink: "လင့်ခ်ဖွင့်ရန်",
    },
    stats: {
      imagesUploaded: "တင်ထားသောပုံများ",
      uptime: "လုပ်ဆောင်ချိန်",
      latency: "နှောင့်နှေးမှု",
    },
    footer: {
      copyright: "© 2023 ImageToURL Cloud. မူပိုင်ခွင့်အားလုံး လေးစားပါသည်။",
      privacy: "ကိုယ်ရေးကိုယ်တာ",
      terms: "စည်းကမ်းချက်များ",
      cookies: "ကွတ်ကီးများ",
    },
    meta: {
      title: "ImageToURL - ချက်ချင်းပုံ hosting",
      description:
        "ပုံများကိုတင်ပြီး ချက်ချင်းမျှဝေနိုင်သောလင့်ခ်များရယူပါ။ ကမ္ဘာလုံးဆိုင်ရာ CDN ကွန်ရက်ဖြင့် စွမ်းအားပေးထားသော မြန်ဆန်၊ လုံခြုံပြီး ယုံကြည်စိတ်ချရသော ပုံ hosting။",
      keywords: "ပုံ hosting, ပုံတင်ခြင်း, cdn, ချက်ချင်းလင့်ခ်များ, ပုံမျှဝေခြင်း",
    },
  },
} as const

type EnDictionary = (typeof dictionaries)["en"]

export async function getDictionary(locale: Locale): Promise<EnDictionary> {
  const dict = dictionaries[locale] || dictionaries.en
  // Spread English defaults so missing top-level keys (e.g. faq) fall back to English
  return { ...dictionaries.en, ...dict } as EnDictionary
}

export type Dictionary = EnDictionary
