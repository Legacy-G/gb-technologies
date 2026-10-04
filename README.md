# GB Technologies — Enterprise Digital Transformation & Custom Software

Enterprise decoupled platform for **GB Technologies**, positioned as a premier **Enterprise Digital Transformation & Custom Software Development** consultancy.

- **Frontend**: Next.js 16 App Router (React 19, TypeScript, Tailwind CSS v4, **Deep Slate & Royal Indigo** OKLCH design system, shadcn/ui primitives, Framer Motion)
- **Backend**: Headless Django 5 REST Framework API (`/api/v1/`), OpenAPI 3.1 schema engine (`drf-spectacular`), secure HTTP-only cookie JWT authentication (`SimpleJWT`), and CORS controls.

---

## Strategic Differentiator

* **GB Technologies (`/gb-technologies`)**: Specializes in **Enterprise Digital Transformation & Custom Software Development** (legacy monolith modernization, bespoke enterprise application engineering, dedicated senior engineering pods, domain-driven architecture).
* **GB Cloud (`/gbcloud`)**: Dedicated to **Autonomous Cloud Infrastructure & DevOps** (multi-cloud orchestration, serverless meshes, real-time telemetry, 99.999% SLA edge computing).

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
- API Base URL: `http://localhost:8000/api/v1/`
- Interactive Swagger UI: `http://localhost:8000/api/v1/docs/`
- OpenAPI Schema: `http://localhost:8000/api/v1/schema/`
- Service Health Probe: `http://localhost:8000/api/v1/health/`

### 2. Frontend Application (Next.js)
```bash
cd frontend
npm run dev
```
- Web Application: `http://localhost:3000`
