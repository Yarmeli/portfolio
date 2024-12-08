# Portfolio CMS

A modern portfolio website with a built-in content management system, built using Next.js and Payload CMS.

## 🚀 Features

- **Full-featured CMS**: Manage projects, media, and experience through an admin dashboard
- **GraphQL API**: Built-in GraphQL endpoint for flexible data querying
- **TypeScript Support**: Full TypeScript integration for better development experience
- **Media Management**: Integrated media handling system
- **Database Migrations**: Structured database migration system
- **Modern Stack**: Built with Next.js 15 and server components

## 🛠 Tech Stack

- **Framework**: Next.js
- **CMS**: Payload CMS
- **Database**: PostgreSQL
- **Storage**: Local disk storage
- **Language**: TypeScript

## 📦 Project Structure

```
src/
├── app/
│ ├── (frontend)/ # Public-facing routes (standard Next.js app)
│ └── (payload)/ # Admin and API routes (Payload CMS files)
├── collections/ # Payload CMS collections (aka. database tables)
│ ├── Projects.ts
│ ├── Media.ts
│ ├── Experience.ts
│ └── ...
├── access/ # Access control logic for collections
├── components/ # Shared UI components
└── migrations/ # Database migrations
```

## 🚦 Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your environment variables
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

## 🔧 Configuration

The project uses several configuration files:

- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables (copy from `.env.example`)

## 📝 API Routes

- `/admin` - Payload CMS admin dashboard
- `/api/contact` - Contact form submission endpoint

## 🔄 Database Migrations

Database migrations are located in `src/migrations/` and can be run in CI using the `pnpm ci` script.
This ensures the database is migrated to the latest version before the build process begins.

It is recommended to have separate databases for development and production to ensure the default `push` mode in development doesn't interfere with the manual migration commands for production.

You can read more about it here: https://payloadcms.com/docs/database/migrations#postgres
