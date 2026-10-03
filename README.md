# GB Technologies — Enterprise Platform Modernization

This repository contains the enterprise platform for **GB Technologies**, organized as a decoupled Level 3 architecture:
- **`backend/`**: Headless Django REST Framework API (`/api/v1/`), OpenAPI schema generator (`drf-spectacular`), secure HTTP-only cookie JWT authentication, and data models.
- **`frontend/`**: Next.js App Router (TypeScript, Tailwind CSS, OKLCH design system, shadcn/ui, Radix primitives, Framer Motion).

---

## Directory Structure

```
gb-technologies/
├── backend/                  # Django REST API service
│   ├── web/                  # Core application (models, serializers, API views)
│   ├── webint/               # Django project settings & URL configuration
│   ├── manage.py             # Django management CLI
│   └── requirements.txt      # Python dependencies
├── frontend/                 # Next.js App Router front end
│   ├── app/                  # Routes (Marketing, Auth, Portal)
│   ├── components/           # UI primitives & design system components
│   ├── lib/                  # API client & utility functions
│   └── schemas/              # Zod data validation schemas
├── .gitignore
└── README.md
```

---

## Quick Start (Local Development)

### 1. Backend Service (Django REST API)
```bash
cd backend
python manage.py migrate
python manage.py runserver 8000
```
- API Root: `http://localhost:8000/api/v1/`
- OpenAPI Schema: `http://localhost:8000/api/v1/schema/`
- Interactive Swagger UI: `http://localhost:8000/api/v1/docs/`
- Django Admin: `http://localhost:8000/admin/`

### 2. Frontend Application (Next.js)
```bash
cd frontend
npm install
npm run dev
```
- Web Application: `http://localhost:3000`

---

## Architecture & Specifications

For comprehensive architecture plans, visual design tokens, and migration schedules, refer to the documentation:
- **Color Tokens**: OKLCH palette, contrast matrix, and theme system.
- **Design System**: Typography scales, spacing grid, 8-state component specs.
- **Implementation Plan**: API specifications, serializers, caching, and security boundaries.
- **Migration Roadmap**: Strangler reverse proxy routing and phase-by-phase delivery schedule.
