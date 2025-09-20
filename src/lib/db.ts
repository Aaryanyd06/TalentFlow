import Dexie, { type Table } from "dexie";
import type { Job, Candidate, TimelineEvent, Assessment } from "@/types";

export class TalentFlowDB extends Dexie {
  jobs!: Table<Job>;
  candidates!: Table<Candidate>;
  timeline!: Table<TimelineEvent>;
  assessments!: Table<Assessment, string>;
  assessmentResponses!: Table<any, string>;

  constructor() {
    super("talentFlowDatabase");
    this.version(1).stores({
      jobs: "++id, title, status, slug, order",
      candidates: "++id, name, email, stage, jobId",
      timeline: "++id, candidateId, date",
    });
    this.version(2).stores({
      jobs: "++id, title, status, slug, order",
      candidates: "++id, name, email, stage, jobId",
      timeline: "++id, candidateId, date",
      assessments: "jobId",
    });
    this.version(3).stores({
      jobs: "++id, title, status, slug, order",
      candidates: "++id, name, email, stage, jobId",
      timeline: "++id, candidateId, date",
      assessments: "jobId",
      assessmentResponses: "++id", // Add the new table
    });
  }
}

export const db = new TalentFlowDB();