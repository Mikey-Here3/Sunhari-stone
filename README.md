# Sunhari Stone — Elegant Jewelry eCommerce

Sunhari Stone is a production-ready eCommerce platform for jewelry and accessories. It features an elegant, mobile-first design, a robust admin panel for product management, and a WhatsApp-based ordering system.

## ✨ Features

- **Elegant Design**: Minimalist gold and ivory aesthetic tailored for jewelry.
- **WhatsApp Ordering**: Users can order directly via WhatsApp with pre-filled messages.
- **Admin Panel**: Full CRUD operations for products and categories.
- **Image Uploads**: Integrated image upload system for products.
- **SEO Optimized**: Dynamic metadata, sitemaps, and search-engine-friendly structure.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma
- **Auth**: JWT-based Admin Authentication
- **Deployment**: Vercel

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd sunhari-stone
```

### 2. Install dependencies
```bash 
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="your-neon-db-url"
ADMIN_PASSWORD="your-strong-password"
JWT_SECRET="your-random-secret-key"
```

### 4. Database Setup
Push the schema to your Neon database:
```bash
npx prisma db push
```

Seed the database with sample products:
```bash
npm run db:seed
```

### 5. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your store.

## 📁 Project Structure

- `/src/app`: Next.js pages and API routes.
- `/src/components`: Reusable UI components.
- `/src/lib`: Utility functions and database client.
- `/prisma`: Database schema and seed scripts.
- `/public`: Static assets and uploaded images.

## 🛡️ Admin Panel
Access the admin panel at `/admin`.
Default password (if not set in env): `admin123`

## 📦 Deployment
Deploy to Vercel with one click. Remember to add your environment variables in the Vercel dashboard.

---
Crafted with ✨ love by Sunhari Stone.
