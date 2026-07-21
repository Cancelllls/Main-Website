# Cancellls.com Main Website

The official, high-performance landing page and central portfolio website for Cancellls.com, built with Next.js 14 and Tailwind CSS v4.

## Overview

This repository powers `cancellls.com`. It features a highly optimized, enterprise-grade dark/light mode UI with custom monochrome glassmorphism, fluid animations, and a responsive structure.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Deployment**: Vercel/Docker (Automated CD)

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Guidelines
- Strict monochrome aesthetics are maintained via the `app/globals.css` Tailwind tokens.
- Keep components modular and reusable in the `components/` directory.
