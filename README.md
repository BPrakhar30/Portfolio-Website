# Prakhar Bhardwaj — Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Live Demo](https://img.shields.io/badge/Demo-Live-000?style=for-the-badge&logo=vercel)](https://portfolio-website-khaki-zeta-44.vercel.app)

A dual-mode portfolio built with **Next.js 16**, **Tailwind CSS v4**, and **Framer Motion**.

**Live:** [portfolio-website-khaki-zeta-44.vercel.app](https://portfolio-website-khaki-zeta-44.vercel.app)

## Two Modes

| Mode | Route | Description |
|------|-------|-------------|
| **Simple** | `/` | Clean, minimal, professional — great for recruiters |
| **Creative** | `/creative` | Dark theme, particle animations, scroll effects — eye-catching & impressive |

## Stack

- **Framework**: Next.js 16 (App Router, Static Export)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React + custom SVG icons
- **Deploy**: Vercel (zero config)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Option 1 — Vercel CLI (fastest)
```bash
npm i -g vercel
vercel
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo — Vercel auto-detects Next.js
4. Click **Deploy** — done!

No environment variables needed. The site is fully static.

## Customization

All content lives in `src/data/portfolio.ts` — edit that file to update any info, projects, or skills.
