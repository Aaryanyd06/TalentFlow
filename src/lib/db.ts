import Dexie, { type Table } from "dexie";
import type { Job, Candidate, TimelineEvent, Assessment } from "@/types";

export class TalentFlowDB extends Dexie {
  jobs!: Table<Job>;
  candidates!: Table<Candidate>;
  timeline!: Table<TimelineEvent>;
  assessments!: Table<Assessment, string>; // The key is a string (jobId)

  constructor() {
    super("talentFlowDatabase");
    this.version(1).stores({
      jobs: "++id, title, status, slug, order",
      candidates: "++id, name, email, stage, jobId",
      timeline: "++id, candidateId, date",
    });
    // Add a new version for the new assessments table
    this.version(2).stores({
      jobs: "++id, title, status, slug, order",
      candidates: "++id, name, email, stage, jobId",
      timeline: "++id, candidateId, date",
      assessments: "jobId", // Here, jobId is the primary key
    });
  }
}

export const db = new TalentFlowDB();