# Estatia

AI-powered real estate WhatsApp platform.

See [plan.md](./plan.md) for the full product, tech, and implementation plan.

## Repo layout

```
apps/
  web/          Next.js dashboard (to be scaffolded)
  api/          Backend API (Fastify/Nest + Prisma)
  workers/      BullMQ job processors
packages/
  types/        Shared TypeScript types
  config/       Shared tooling configs
  ui/           Shared design system
docs/
  prototype/
    dashboard/  Static HTML prototype (SCR-100) — design reference
```

The `docs/prototype/dashboard/` folder holds the original static dashboard
prototype. It is kept as a visual reference; the real implementation lives
under `apps/web/` once scaffolded.
