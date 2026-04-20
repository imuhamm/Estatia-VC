# Estatia — Product Design Project Plan

AI-powered real estate WhatsApp platform for developers and brokerages.

---

## 1. Product Design Plan

### 1.1 Main Modules Breakdown

| # | Module | Purpose |
|---|--------|---------|
| M1 | **Onboarding & Account Setup** | Sign-up, WhatsApp Business API connection, bot config wizard, go-live checklist |
| M2 | **Conversations** | Live chat inbox, AI pause/resume, assignment, fraud flagging, pipeline view |
| M3 | **AI Bot Engine** | Inquiry handling, unit matching, payment plans, comparison, human handoff |
| M4 | **Inventory** | Project & unit catalog with structured attributes and media |
| M5 | **Customers (CRM)** | Profiles, tags, pipeline stages, activity timeline |
| M6 | **Analytics** | Conversation metrics, demand insights, sales performance |
| M7 | **Team & Roles** | User management, RBAC (Owner/Admin/Manager/Sales Rep/Viewer) |
| M8 | **Billing & Subscription** | Plans, credits, usage, invoices |

---

### 1.2 Key User Flows per Module

**M1 — Onboarding**
- Sign up → verify email → company profile → connect WhatsApp number → upload inventory (CSV or manual) → configure bot tone/language → invite team → go live.

**M2 — Conversations**
- Inbox list → open conversation → view AI context → pause AI / take over → assign to rep → tag lead → move pipeline stage → flag fraud → resolve.

**M3 — AI Bot Engine**
- Incoming message → intent detection → inquiry branch (project / unit / payment / compare) → match inventory → reply with cards → qualify lead → escalate to human on trigger.

**M4 — Inventory**
- Create project → add units (price, beds, delivery date, payment plans, media) → bulk import → publish → edit/archive.

**M5 — Customers**
- Auto-create on first message → enrich via AI (budget, preferences) → tag → move through pipeline (New → Qualified → Viewing → Negotiation → Won/Lost).

**M6 — Analytics**
- Select date range → view KPIs (volume, response time, conversion, credit usage) → drill into demand insights (most-requested areas/unit types) → export.

**M7 — Team & Roles**
- Invite user → assign role → scoped permissions → activity audit log.

**M8 — Billing**
- View plan → track credit balance → top-up / upgrade → download invoices → usage alerts.

---

### 1.3 Screens Required per Module

| Module | Screens |
|--------|---------|
| **M1 Onboarding** | Sign-up, Login, Email verify, Company profile, WhatsApp connect, Inventory import, Bot config wizard, Team invite, Go-live checklist |
| **M2 Conversations** | Inbox list, Conversation detail (split: chat + context panel), Pipeline Kanban, Fraud queue, Assignment modal |
| **M3 Bot Engine** | Bot config (tone/language/persona), Intent & flow editor, Handoff rules, Response templates, Test sandbox |
| **M4 Inventory** | Projects list, Project detail, Units list (table + filters), Unit detail, Add/Edit unit, Bulk import |
| **M5 Customers** | Customer list, Customer profile (timeline + tags + preferences), Pipeline view, Segments |
| **M6 Analytics** | Overview dashboard, Conversation analytics, Demand insights, Sales performance, Export |
| **M7 Team** | Members list, Invite modal, Role detail, Audit log |
| **M8 Billing** | Plan & usage, Credit history, Payment methods, Invoices, Upgrade flow |

---

### 1.4 Dependencies Between Modules

```
M1 Onboarding ──► enables all
       │
       ├─► M4 Inventory ──┐
       │                  ├─► M3 Bot Engine ──► M2 Conversations
       │                  │                          │
       │                  │                          ├─► M5 Customers
       │                  │                          │
       └─► M7 Team ───────┴──────────────────────────┤
                                                     │
                                    M6 Analytics ◄───┘
                                          ▲
                                          │
                                    M8 Billing (gates features + tracks credits)
```

- **M3 depends on M4** — bot needs inventory to answer.
- **M2 depends on M3 + M5** — conversations attach to customer profiles and AI context.
- **M6 depends on M2, M4, M5** — pulls from all activity.
- **M7 gates everything via RBAC.**
- **M8 meters usage across M2 and M3.**

---

## 2. Recommended Tech Stack

**Frontend**
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (Radix primitives)
- **TanStack Query** — server state
- **Zustand** — lightweight client state
- **React Hook Form + Zod** — forms & validation
- **Recharts** or **Tremor** — analytics viz
- **dnd-kit** — pipeline Kanban

**Backend**
- **Node.js + Fastify** or **NestJS** (TypeScript)
- **PostgreSQL** + **Prisma** ORM
- **Redis** — sessions, rate limits, queues
- **BullMQ** — async jobs (message processing, imports)
- **WhatsApp Cloud API** (Meta) — messaging
- **Pinecone** or **pgvector** — unit semantic matching

**AI Layer**
- **Claude (Sonnet 4.6)** — conversation, intent, qualification
- **Haiku 4.5** — cheap classification (fraud, intent routing)
- Prompt caching on system prompts + inventory context

**Infra**
- **Vercel** (frontend) + **Railway / Fly.io** (API, workers)
- **Supabase Auth** or **Clerk** — auth + RBAC
- **Stripe** — billing & credits
- **Sentry** + **PostHog** — observability & product analytics

---

## 3. File Structure

```
estatia/
├── apps/
│   ├── web/                          # Next.js dashboard
│   │   ├── app/
│   │   │   ├── (auth)/               # login, signup, verify
│   │   │   ├── (onboarding)/         # wizard steps
│   │   │   ├── (app)/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── conversations/
│   │   │   │   │   ├── [id]/
│   │   │   │   │   └── pipeline/
│   │   │   │   ├── inventory/
│   │   │   │   │   ├── projects/
│   │   │   │   │   └── units/
│   │   │   │   ├── customers/
│   │   │   │   ├── analytics/
│   │   │   │   ├── team/
│   │   │   │   ├── billing/
│   │   │   │   └── bot-config/
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ui/                   # shadcn primitives
│   │   │   ├── conversations/
│   │   │   ├── inventory/
│   │   │   └── shared/
│   │   ├── lib/                      # api client, utils
│   │   └── hooks/
│   │
│   ├── api/                          # Fastify/Nest backend
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   ├── conversations/
│   │   │   │   ├── bot/
│   │   │   │   ├── inventory/
│   │   │   │   ├── customers/
│   │   │   │   ├── analytics/
│   │   │   │   ├── team/
│   │   │   │   └── billing/
│   │   │   ├── integrations/
│   │   │   │   ├── whatsapp/
│   │   │   │   ├── claude/
│   │   │   │   └── stripe/
│   │   │   └── common/               # guards, rbac, logger
│   │   └── prisma/schema.prisma
│   │
│   └── workers/                      # BullMQ job processors
│
├── packages/
│   ├── types/                        # shared TS types
│   ├── config/                       # eslint, tsconfig, tailwind preset
│   └── ui/                           # shared design system (optional)
│
├── docs/
│   ├── prd.md
│   ├── design-system.md
│   └── api.md
└── plan.md
```

---

## 4. Design Considerations

**Experience**
- **WhatsApp-native feel** — the dashboard mirrors real chat affordances (bubbles, read receipts, typing).
- **Context panel always visible** — on conversation detail, show customer profile, matched units, AI suggestions side-by-side.
- **Minimize clicks to human handoff** — one-tap pause-AI + assign.
- **RTL + Arabic-first** — primary MENA market; design tokens must support bidi.

**Information Density**
- Sales reps live in the inbox — prioritize scannable lists, keyboard nav, quick filters.
- Analytics screens go the opposite way: whitespace, few primary KPIs, progressive drill-down.

**Accessibility**
- WCAG AA contrast, focus rings, keyboard flow through Kanban and inbox.

**Design System**
- Build on existing estatia visual identity; define tokens first (color, type, spacing, radius, shadow) → primitives → patterns.
- Single Tailwind preset consumed by all apps.

**Performance**
- Conversation list virtualized (react-virtuoso).
- Optimistic UI on assignment, tagging, pipeline moves.
- Server-side pagination for inventory and customers.

**Permissions**
- RBAC enforced in UI (hide) **and** API (deny). Never trust client.
- Role matrix documented per screen/action.

**AI UX**
- Always show AI state (active/paused) and confidence.
- Let humans edit AI drafts before sending.
- Audit trail for every AI decision (for fraud review).

---

## 5. Step-by-Step Implementation Plan

### Phase 0 — Foundations (Week 1–2)
1. Monorepo scaffold (Turborepo), lint/prettier/ts configs.
2. Auth + org/workspace model, RBAC primitives.
3. Design tokens + shadcn/ui setup, Arabic/RTL baseline.
4. Prisma schema v1 (orgs, users, roles, customers, projects, units, conversations, messages).

### Phase 1 — Onboarding & Inventory (Week 3–4)
5. Sign-up → company profile → invite team.
6. Inventory CRUD: projects, units, media, payment plans.
7. CSV bulk import with validation preview.
8. WhatsApp Cloud API connection flow + webhook verification.

### Phase 2 — Bot Engine (Week 5–7)
9. Webhook ingestion → message queue → Claude handler.
10. Intent router (Haiku) → branches: project, unit, payment, compare, handoff.
11. Unit matching via pgvector on structured + semantic filters.
12. Bot config UI (tone, language, persona, handoff rules).
13. Sandbox/test chat.

### Phase 3 — Conversations & CRM (Week 8–10)
14. Inbox list (virtualized) + conversation detail + context panel.
15. AI pause/resume, assignment, tagging, fraud flag.
16. Customer profiles auto-built from conversations.
17. Pipeline Kanban (dnd-kit) with stage rules.

### Phase 4 — Analytics & Billing (Week 11–12)
18. Event pipeline → aggregated metrics tables.
19. Dashboards: conversation, demand, performance.
20. Stripe integration: plans, credits, usage meter, invoices.
21. Usage alerts + soft/hard limits.

### Phase 5 — Hardening & Launch (Week 13–14)
22. Audit logs, admin tools, data export.
23. Sentry, PostHog, SLO dashboards.
24. Load test WhatsApp webhook + queue.
25. Pilot with 2–3 developers → iterate → GA.

---

**Next immediate step:** review this plan, then lock scope for Phase 0 and produce low-fi wireframes for M1 (Onboarding) and M2 (Conversations) — these unblock everything else.
