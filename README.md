# Mahalaxmi Enterprises — Official Frontend Website

The official, high-performance customer-facing web platform for **Mahalaxmi Enterprises**, an authorized distributor of **HP Lubricants (Hindustan Petroleum Corporation Limited)**. Engineered with modern web standards, dynamic headless CMS integration, full SEO automation, and responsive B2B lubricant product discovery.

---

## 🚀 Key Capabilities & Features

- **Headless CMS Integration:**
  - Real-time data consumption from the companion CMS backend (`mahalaxmi-enterprises-cms`).
  - Zustand-powered client store (`useCMSStore`) with automatic hydration, caching, and prefetching.
- **HP Lubricants Product Catalog:**
  - Hierarchical product discovery across automotive, industrial, and specialty lubricant categories.
  - Category filtering, detailed product specification pages, and technical benefit highlights.
  - TDS (Technical Data Sheet) and MSDS specification availability with enquiry workflows.
- **Dynamic SEO & Metadata Engine:**
  - Dynamic OpenGraph and meta tag injection via `SEOMeta.tsx`.
  - Configurable semantic headings (`getHeadingTag`) synchronized directly with the CMS.
  - Per-page customizable titles, descriptions, and crawler indexing rules (`noIndex`).
- **Dynamic Crawler Routes (`robots.txt` & `sitemap.xml`):**
  - **Dynamic Origin Resolution:** Automatically resolves current host and protocol from request headers (`x-forwarded-host`, `host`, `x-forwarded-proto`).
  - **Live Sitemap Indexing:** Dynamically indexes static routes, CMS page entries, product URLs, and published blog posts with accurate `lastmod` timestamps.
  - **Robots Directives:** Synchronized with CMS global directives; auto-updates `Sitemap:` URLs to match the active deployment domain.
- **Interactive Inquiries & Lead Generation:**
  - Direct product quote requests, commercial partnership forms, and distributor queries.
  - Submissions are ingested by the CMS and dispatched to administrators via automated email alerts.
- **Events & Knowledge Center:**
  - Corporate events, expos, and industry showcase galleries.
  - Technical lubrication articles, HPCL product releases, and educational automotive guides.

---

## 🛠️ Technology Stack

| Layer                   | Technologies                                   |
| :---------------------- | :--------------------------------------------- |
| **Framework**           | Next.js 14 (App Router)                        |
| **Language**            | TypeScript                                     |
| **Styling & Design**    | Tailwind CSS, PostCSS, Lucide React Icons      |
| **State & Store**       | Zustand (CMS data caching and state hydration) |
| **Icons**               | Lucide React                                   |
| **Backend Integration** | RESTful JSON API from Headless CMS             |

---

## 📂 Project Structure

```text
mahalaxmi-enterprises/
├── public/                 # Static assets, brand logos, icons, and media
├── src/
│   ├── app/                # Next.js App Router routes & layouts
│   │   ├── about-us/       # Company history, vision, and infrastructure
│   │   ├── blogs/          # Technical lubricant insights and articles
│   │   ├── contact-us/     # Contact channels, address, and enquiry forms
│   │   ├── events/         # Expos, dealership conferences, and gallery
│   │   ├── privacy-policy/ # Regulatory compliance and privacy information
│   │   ├── products/       # Category catalogs and product detail pages
│   │   ├── robots.txt/     # Dynamic robots.txt route (CMS-connected)
│   │   ├── sitemap.xml/    # Dynamic sitemap.xml route (CMS-connected)
│   │   ├── layout.tsx      # Root layout, navigation, and footer wrapper
│   │   └── page.tsx        # Homepage with hero, pillars, and features
│   ├── components/         # Reusable UI components
│   │   ├── Footer.tsx      # Comprehensive site footer with contact badges
│   │   ├── Navbar.tsx      # Multi-tier mega menu and mobile navigation
│   │   └── SEOMeta.tsx     # Dynamic meta, OpenGraph, and title injection
│   ├── store/              # Zustand state store (`useCMSStore.ts`)
│   └── lib/                # Shared utilities and helpers
├── .env.example            # Environment variables template
├── next.config.mjs         # Next.js production and remote image configuration
├── package.json            # Dependencies and npm build scripts
├── tailwind.config.ts      # Tailwind design system tokens
└── tsconfig.json           # TypeScript configuration
```

---

## ⚙️ Getting Started & Local Development

### 1. Prerequisites

- **Node.js:** `v18.17.0` or higher (Node 20+ LTS recommended)
- **Package Manager:** `npm`, `pnpm`, or `yarn`

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>
cd mahalaxmi-enterprises

# Install dependencies
npm install
```

### 3. Environment Configuration

Create a local environment file based on `.env.example`:

```bash
cp .env.example .env.local
```

Configure your local environment variables:

```env
# CMS Backend API Endpoint (Development default: http://localhost:3001)
NEXT_PUBLIC_CMS_API_URL=http://localhost:3001

# (Optional) Canonical site URL for production deployments
# If omitted, routes automatically infer the origin from incoming request headers
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Security Notice:** Never check real production credentials, API secrets, or internal server IPs into version control. Keep all local overrides inside `.env.local`.

### 4. Running the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Available Scripts

| Command                | Description                                        |
| :--------------------- | :------------------------------------------------- |
| `npm run dev`          | Starts the Next.js development server on port 3000 |
| `npm run build`        | Compiles and optimizes the production build        |
| `npm run start`        | Boots the compiled production server               |
| `npm run lint`         | Runs ESLint code quality checks                    |
| `npm run format`       | Formats code with Prettier                         |
| `npm run format:check` | Verifies code formatting across the repository     |

---

## 🛡️ Coding Standards & SEO Guidelines

- **Dynamic Headings:** Always use `getHeadingTag` from the CMS store for major page headings to allow CMS administrators to configure `h1`, `h2`, or `h3` semantic tags.
- **Origin Handling:** Crawler endpoints (`robots.txt` and `sitemap.xml`) resolve their URLs dynamically using request headers so they work across local, staging, and production domains without hardcoded URLs.
- **Fail-Safe Fallbacks:** CMS fields must use safe empty fallbacks (`|| ""` or `|| []`) to prevent undefined runtime errors or mock data leakage.

---

## 🚢 Deployment

The frontend can be deployed to any modern Next.js hosting platform (such as **Vercel**, **AWS Amplify**, or a containerized Node.js environment):

1. Set `NEXT_PUBLIC_CMS_API_URL` to your production CMS URL (e.g., `https://cms.yourdomain.com`).
2. Set `NEXT_PUBLIC_SITE_URL` to your live domain (e.g., `https://www.yourdomain.com`).
3. Set the build command to `npm run build`.
4. Output directory: `.next`.

---

## 📄 License & Confidentiality

© **Mahalaxmi Enterprises**. All rights reserved.  
This software, documentation, and related design assets are proprietary and confidential. Unauthorized copying, distribution, or reproduction is strictly prohibited.
