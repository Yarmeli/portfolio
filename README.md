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
- **API**: GraphQL
- **Storage**: Local disk storage
- **Language**: TypeScript

## 📦 Project Structure

```
src/
├── app/
│ ├── (frontend)/ # Public-facing routes
│ └── (payload)/ # Admin and API routes
├── collections/ # Payload CMS collections
│ ├── Projects.ts
│ ├── Media.ts
│ └── Experience.ts
└── migrations/ # Database migrations
```

## 🚦 Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your environment variables
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🔧 Configuration

The project uses several configuration files:

- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables (copy from `.env.example`)

## 📝 API Routes

- `/api/graphql` - GraphQL API endpoint
- `/api/graphql-playground` - GraphQL playground for testing queries
- `/admin` - Payload CMS admin dashboard

## 🔄 Database Migrations

Database migrations are located in `src/migrations/` and can be run in CI using the `pnpm ci` script.
This ensures the database is migrated to the latest version before the build process begins.
