import { faker } from "@faker-js/faker";
import { db } from "@/lib/db";
import type { Job, Candidate, JobStatus, CandidateStage } from "@/types";

const JOB_COUNT = 25;
const CANDIDATE_COUNT = 1000;

export async function seedDatabase() {
  const jobCount = await db.jobs.count();

  if (jobCount >= JOB_COUNT) {
    console.log("Database already seeded.");
    return;
  }

  console.log("Seeding database...");

  const jobs: Job[] = [];
  for (let i = 0; i < JOB_COUNT; i++) {
    jobs.push({
      id: faker.string.uuid(),
      title: faker.person.jobTitle(),
      slug: faker.helpers.slugify(faker.person.jobTitle()).toLowerCase(),
      status: faker.helpers.arrayElement<JobStatus>(["active", "archived"]),
      tags: faker.helpers.arrayElements(
        ["React", "TypeScript", "Remote", "Node.js", "GraphQL"],
        { min: 1, max: 3 }
      ),
      order: i,
    });
  }
  await db.jobs.bulkAdd(jobs);

  const candidates: Candidate[] = [];
  for (let i = 0; i < CANDIDATE_COUNT; i++) {
    candidates.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      jobId: faker.helpers.arrayElement(jobs).id,
      stage: faker.helpers.arrayElement<CandidateStage>([
        "applied", "screen", "tech", "offer", "hired", "rejected"
      ]),
    });
  }
  await db.candidates.bulkAdd(candidates);

  console.log("Database seeded successfully!");
}