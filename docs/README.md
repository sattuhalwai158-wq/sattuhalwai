# N-Sattu Cuisine documentation

Start here for the Sattu Halwai website and its owner dashboard. These documents describe the source implementation; they do not certify a production deployment or database state.

| Guide | Contents |
| --- | --- |
| [Setup](setup.md) | Local installation, environment variables, available commands |
| [Architecture and routes](architecture.md) | Website logic, directory map, routes, content loading |
| [Media assets](media-assets.md) | Descriptive asset folders, renamed files and legacy URL mapping |
| [Owner dashboard](admin-guide.md) | Bookings, content editing, uploads, account access |
| [Reviews and database](database.md) | Tables, RPCs, permissions, migration rollout |
| [Troubleshooting](troubleshooting.md) | Admin parse errors, access errors, missing schema, image loading |
| [Deployment and maintenance](deployment.md) | Build output, release checklist, assets, Lovable history |
| [Validation status](validation-status.md) | What was executed and what remains unverified |
| [Owner CMS implementation notes](admin-review-management.md) | Feature notes and migration dependency |
| [Earlier redesign report](redesign-validation.md) | Historical redesign work and its earlier checks |

Application code stays under `src/`, migrations under `supabase/migrations/`, and media under `public/media/`. Documentation is collected in this folder; operational files remain in the paths required by the application.
