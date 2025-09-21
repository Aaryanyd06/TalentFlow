import { faker } from "@faker-js/faker";
import { db } from "@/lib/db";
import type { Job, Candidate, JobStatus, CandidateStage, TimelineEvent } from "@/types";

const JOB_COUNT = 25;
const CANDIDATE_COUNT = 1000;

const STAGE_PROGRESSION: CandidateStage[] = ["applied", "screen", "tech", "offer", "hired"];

export async function seedDatabase() {
  const jobCount = await db.jobs.count();

  if (jobCount >= JOB_COUNT) {
    console.log("Database already seeded.");
    return;
  }

  console.log("Seeding database...");

  const jobs: Job[] = [];
  for (let i = 0; i < JOB_COUNT; i++) {
    const jobTitle = faker.person.jobTitle();
    jobs.push({
      id: faker.string.uuid(),
      title: jobTitle,
      slug: faker.helpers.slugify(jobTitle).toLowerCase(),
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
  const timelineEvents: TimelineEvent[] = [];
  const currentDate = new Date();

  for (let i = 0; i < CANDIDATE_COUNT; i++) {
    const candidateId = faker.string.uuid();
    const currentStage = faker.helpers.arrayElement<CandidateStage>([
      "applied",
      "screen",
      "tech",
      "offer",
      "hired",
      "rejected",
    ]);

    const jobId = faker.helpers.arrayElement(jobs).id;

    candidates.push({
      id: candidateId,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      jobId,
      stage: currentStage,
    });

    let lastStageDate = faker.date.past({ years: 1, refDate: currentDate });

    if (currentStage === "rejected") {
      const rejectionPoint = faker.number.int({ min: 0, max: STAGE_PROGRESSION.indexOf("tech") });
      for (let j = 0; j <= rejectionPoint; j++) {
        lastStageDate = faker.date.future({ years: 0.1, refDate: lastStageDate });
        timelineEvents.push({
          id: faker.string.uuid(),
          candidateId,
          type: "stage-change",
          stage: STAGE_PROGRESSION[j],
          date: lastStageDate.toISOString(),
        });
      }
      lastStageDate = faker.date.future({ years: 0.1, refDate: lastStageDate });
      timelineEvents.push({
        id: faker.string.uuid(),
        candidateId,
        type: "stage-change",
        stage: "rejected",
        date: lastStageDate.toISOString(),
      });
    } else {
      const currentStageIndex = STAGE_PROGRESSION.indexOf(currentStage);
      for (let j = 0; j <= currentStageIndex; j++) {
        lastStageDate = faker.date.future({ years: 0.1, refDate: lastStageDate });
        timelineEvents.push({
          id: faker.string.uuid(),
          candidateId,
          type: "stage-change",
          stage: STAGE_PROGRESSION[j],
          date: lastStageDate.toISOString(),
        });
      }
    }
  }

  await db.candidates.bulkAdd(candidates);
  await db.timeline.bulkAdd(timelineEvents);

  console.log("Database seeded successfully with timeline data!");
}
