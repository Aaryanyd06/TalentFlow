import { http, HttpResponse, delay } from "msw";
import { db } from "@/lib/db";
import { seedDatabase } from "./seed";
import type { Job, Candidate } from "@/types";
import { faker } from "@faker-js/faker";


const API_URL = "/api";

export const handlers = [
  http.post(`${API_URL}/seed`, async () => {
    await seedDatabase();
    return HttpResponse.json({ success: true });
  }),

  http.get(`${API_URL}/jobs`, async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");

    let jobsQuery = db.jobs.orderBy("order");

    if (status) {
      jobsQuery = jobsQuery.filter((job) => job.status === status);
    }
    if (search) {
      jobsQuery = jobsQuery.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    const totalJobs = await jobsQuery.count();
    const jobs = await jobsQuery
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    
    await delay(faker.number.int({ min: 200, max: 1200 }));

    return HttpResponse.json({
      data: jobs,
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(totalJobs / pageSize),
        totalItems: totalJobs,
      },
    });
  }),

  http.post(`${API_URL}/jobs`, async ({ request }) => {
    const newJob = (await request.json()) as Omit<Job, "id" | "order">;
    const highestOrderJob = await db.jobs.orderBy("order").last();
    const newOrder = (highestOrderJob?.order ?? -1) + 1;

    const jobToCreate: Job = {
      ...newJob,
      id: crypto.randomUUID(),
      order: newOrder,
    };
    
    await db.jobs.add(jobToCreate);
    await delay(faker.number.int({ min: 200, max: 1200 }));
    
    return HttpResponse.json(jobToCreate, { status: 201 });
  }),

  http.patch(`${API_URL}/jobs/:id/reorder`, async () => {
    if (Math.random() < 0.1) {
      await delay(1000);
      return new HttpResponse(null, { status: 500, statusText: "Internal Server Error" });
    }
    
    await delay(faker.number.int({ min: 200, max: 1200 }));
    return HttpResponse.json({ success: true });
  }),

  http.patch(`${API_URL}/jobs/:id`, async ({ request, params }) => {
    const { id } = params;
    const updates = await request.json() as Partial<Job>;

    const updatedCount = await db.jobs.update(id as string, updates);

    if (updatedCount === 0) {
      return HttpResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const updatedJob = await db.jobs.get(id as string);
    await delay(faker.number.int({ min: 200, max: 800 }));

    return HttpResponse.json(updatedJob);
  }),

   http.get(`${API_URL}/jobs/:id`, async ({ params }) => {
    const { id } = params;
    const job = await db.jobs.get(id as string);

    if (!job) {
      return HttpResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    await delay(faker.number.int({ min: 100, max: 500 }));
    return HttpResponse.json(job);
  }),

  http.get(`${API_URL}/candidates`, async ({ request }) => {
    const url = new URL(request.url);
    const stage = url.searchParams.get("stage");

    let candidatesQuery = db.candidates.toCollection();

    if (stage) {
      candidatesQuery = candidatesQuery.filter(
        (candidate) => candidate.stage === stage
      );
    }
    
    const candidates = await candidatesQuery.toArray();
    await delay(faker.number.int({ min: 200, max: 1000 }));

    return HttpResponse.json(candidates);
  }),


  http.patch(`${API_URL}/candidates/:id`, async ({ request, params }) => {
    const { id } = params;
    const updates = await request.json() as Partial<Candidate>;

    const updatedCount = await db.candidates.update(id as string, updates);

    if (updatedCount === 0) {
      return HttpResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    const updatedCandidate = await db.candidates.get(id as string);
    await delay(faker.number.int({ min: 200, max: 800 }));

    return HttpResponse.json(updatedCandidate);
  }),

  http.get(`${API_URL}/candidates/:id`, async ({ params }) => {
    const { id } = params;
    const candidate = await db.candidates.get(id as string);

    if (!candidate) {
      return HttpResponse.json({ error: "Candidate not found" }, { status: 404 });
    }
    
    await delay(faker.number.int({ min: 100, max: 400 }));
    return HttpResponse.json(candidate);
  }),

  http.get(`${API_URL}/candidates/:id/timeline`, async ({ params }) => {
    const { id } = params;
    const timelineEvents = await db.timeline
      .where('candidateId')
      .equals(id as string)
      .sortBy('date');

    await delay(faker.number.int({ min: 200, max: 600 }));
    return HttpResponse.json(timelineEvents);
  }),

  
];