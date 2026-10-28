# Local setup

Use a Node.js version compatible with the installed Vite 8 toolchain and npm. Install dependencies from the repository root with `npm ci` when using the committed lockfile, or `npm install` when deliberately updating dependencies.

Create a root `.env` file using the values for your Supabase project:

```dotenv
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_PROJECT_ID=your-project-id
```

Keep server and browser values pointed at the same intended project. `VITE_` values are included in browser code; never use a service-role key, database password, or private key there. Do not commit `.env`.

Run `npm run dev`, then open the URL printed by Vite. The current local setup commonly uses port 8080. Restart Vite after changing environment variables.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production bundle |
| `npm run build:dev` | Development-mode bundle |
| `npm run preview` | Local production preview |
| `npm run typecheck` | TypeScript checks |
| `npm run lint` | ESLint |
| `npm test` | Node test files in `tests/` |
| `npm run format` | Reformat project files; changes files |

Database-backed features require the matching migrations. Installing frontend dependencies does not create Supabase tables or grant admin access. See [database setup](database.md).
