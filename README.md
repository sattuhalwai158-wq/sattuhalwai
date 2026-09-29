# N-Sattu Cuisine

Luxury wedding and event catering website for N-Sattu Cuisine, serving celebrations across Ajmer, Pushkar, Kishangarh, and the surrounding region.

The site presents the brand story, menus, catering setups, reviews, booking enquiries, and legal information through a responsive web experience.

## Stack

- React 19
- TypeScript
- Vite
- TanStack Start and TanStack Router
- Supabase
- Tailwind CSS
- Radix UI and Lucide icons

## Getting Started

### Prerequisites

- Node.js 20 or newer, or Bun
- A Supabase project for database-backed content and booking enquiries

### Install dependencies

Using Bun:

```bash
bun install
```

Using npm:

```bash
npm install
```

### Configure environment variables

Create a local `.env` file in the project root. Never commit this file or paste its values into source files.

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_PROJECT_ID=your-project-id
```

Use the values provided by Supabase or Lovable for your project. Do not put a database connection string, service-role key, password, or private key in this file if it will be shared or committed.

The repository ignores `.env` and other local credential files. Safe templates may use `.env.example` or `.env.template`.

### Start the development server

```bash
npm run dev
```

The app is served by Vite. Open the local URL shown in the terminal.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run build:dev` | Create a development-mode build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the project with Prettier |

The same scripts can be run with `bun run` when using Bun.

## Main Routes

- `/` - Homepage and catering overview
- `/about` - Brand story and team
- `/menus` - Menus and signature dishes
- `/setups` - Catering setups and gallery
- `/book` - Booking enquiry form
- `/reviews` - Reviews and frequently asked questions
- `/booking-policy` - Booking policy
- `/privacy` - Privacy policy
- `/terms` - Terms and conditions
- `/admin` - Admin content area

## Supabase

Supabase client and server integration lives under `src/integrations/supabase/`. Database migrations are stored in `supabase/migrations/`.

Apply migrations with the Supabase CLI when working on the database locally or against a configured project:

```bash
supabase db push
```

Do not use a database password or service-role key in browser code. Keep privileged credentials server-side and outside Git.

## Project Structure

```text
src/
  components/       Shared application and UI components
  integrations/     Supabase clients, auth, and generated types
  lib/              Content, site data, and utility modules
  routes/           TanStack Router route components
  styles.css        Global styles and design tokens
supabase/
  migrations/       Database schema migrations
public/
  media/            Images and video assets
```

## Deployment

Build the application with:

```bash
npm run build
```

Deploy the generated Vite/TanStack output using the hosting configuration for the target environment. Configure the required Supabase variables in the hosting provider's secret or environment-variable settings rather than committing them to the repository.
