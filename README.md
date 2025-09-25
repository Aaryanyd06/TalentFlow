TalentFlow – A Mini Hiring Platform

A front-end only hiring platform built with Next.js, TypeScript, React, and MSW, designed for HR teams to manage jobs, candidates, and assessments.
This project simulates a full hiring workflow using a mocked API layer with local persistence.

🚀 Features
1. Jobs

Job board with server-like pagination & filtering (title, status, tags).

Create/Edit jobs with validation (title required, unique slug).

Archive/Unarchive jobs.

Drag-and-drop reordering with optimistic updates + rollback on error.

Deep linking to job detail page: /jobs/:jobId.

2. Candidates

Virtualized candidate list (1,000+ seeded candidates).

Search by name/email + filter by current stage.

Candidate profile: /candidates/:id showing timeline of status changes.

Kanban board to move candidates between stages via drag-and-drop.

Attach notes with @mentions (suggestions from a local list).

3. Assessments

Assessment builder per job: add sections and questions (MCQ, text, numeric, file upload stub).

Live preview as a fillable form.

Local persistence of builder state and candidate responses.

Runtime validation (required fields, numeric ranges, max length).

Conditional questions (e.g., show Q3 only if Q1 = "Yes").

🛠️ Tech Stack

Framework: Next.js (React + TypeScript)

Mock API: MSW (Mock Service Worker)

State Management: React hooks + Context + Local persistence (IndexedDB via Dexie/localForage)

UI: React components (with accessibility & responsive design)

Data Layer: IndexedDB for offline persistence

Testing: Jest + React Testing Library

Deployment: Vercel

📡 Mock API Endpoints

Implemented via MSW, simulating REST API behavior:

Jobs

GET /jobs?search=&status=&page=&pageSize=&sort=

POST /jobs → { id, title, slug, status, tags, order }

PATCH /jobs/:id

PATCH /jobs/:id/reorder (occasionally returns 500 to test rollback)

Candidates

GET /candidates?search=&stage=&page=

POST /candidates → { id, name, email, stage }

PATCH /candidates/:id (stage transitions)

GET /candidates/:id/timeline

Assessments

GET /assessments/:jobId

PUT /assessments/:jobId

POST /assessments/:jobId/submit

📦 Setup & Installation
# Clone the repo
git clone https://github.com/your-username/talentflow.git
cd talentflow

# Install dependencies
npm install

# Start dev server
npm run dev


The app runs at http://localhost:3000
.

🧩 Architecture & Decisions

Next.js chosen for SSR-ready React + file-based routing (/jobs/:id, /candidates/:id).

TypeScript ensures type safety across components and API contracts.

MSW simulates API with latency (200–1200ms) + error rates (5–10%) to mimic real-world network conditions.

IndexedDB persistence allows restoring state on refresh, mimicking a backend.

Virtualization used for candidates list to handle 1000+ records efficiently.

Drag-and-drop via react-beautiful-dnd for reordering jobs & candidate kanban.

Form validation with custom logic for assessments (conditional rules).

🧪 Testing

Unit tests for components with React Testing Library.

MSW used to mock API calls in tests.

Integration tests for job creation, candidate transitions, and assessment submission.

🚀 Deployment

Deployed on Vercel: Live App Link

GitHub Repository

⚠️ Known Issues & Future Work

Error handling could be extended with global toasts/snackbar system.

Assessment file upload currently stubbed.

Candidate notes mentions are mock-only (no backend integration).

Improve accessibility with ARIA attributes on drag-and-drop areas.

📌 Evaluation Criteria Addressed

Code Quality: Modular, typed, tested.

App Structure: Clear folder organization with Next.js routing.

Functionality: All core flows implemented.

UI/UX: Responsive, drag-and-drop interactions, validation feedback.

State Management: Hooks + Context + IndexedDB persistence.

Deployment: Vercel live link provided.

Documentation: This README.

✨ TalentFlow demonstrates a complete front-end hiring platform with realistic workflows, API simulation, and offline persistence — all without a backend.