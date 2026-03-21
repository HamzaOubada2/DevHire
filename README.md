# DevHire 🚀

> Job Board SaaS built for developers — by a developer.

## Tech Stack

**Backend** — NestJS, PostgreSQL, TypeORM, JWT, Nodemailer, Cloudinary, Stripe  
**Frontend** — React + Vite, Tailwind CSS, ShadCN UI, Zustand, React Query  
**DevOps** — Docker, Railway (backend), Vercel (frontend)

## Project Structure
```
devhire/
├── backend/     # NestJS REST API
├── frontend/    # React + Vite SPA
└── README.md
```

## Roles

| Role | Description |
|------|-------------|
| 👨‍💻 Developer | Create profile, apply to jobs, track applications |
| 🏢 Company | Post jobs, review applicants, manage pipeline |
| 👑 Admin | Approve jobs, manage users, view analytics |

## Features

- JWT Auth with 3 roles + refresh tokens
- Developer profiles with CV upload
- Company profiles with logo upload
- Job posts with search & filters
- Application pipeline (Applied → Reviewed → Interview → Hired/Rejected)
- Email notifications on status change
- Find Developers page (search by stack)
- Stripe subscription (Free / Pro)
- Admin panel with analytics
- Docker + deployed on Railway + Vercel

## Getting Started
```bash
# Backend
cd backend
cp .env.example .env
npm install
npm run start:dev

# Frontend
cd frontend
npm install
npm run dev
```

## Progress

- [ ] Phase 1 — Foundation & Auth
- [ ] Phase 2 — Profiles & Jobs
- [ ] Phase 3 — Uploads, Emails & Dev Search
- [ ] Phase 4 — Stripe, Admin & Deploy

## Live Demo

Coming soon...
