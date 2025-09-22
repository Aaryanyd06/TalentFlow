import Dexie, { type Table } from "dexie";
import type { Job, Candidate, TimelineEvent, Assessment } from "@/types";


export type AssessmentResponse = {
  id?: number;
  assessmentId: string;
  candidateId: string;
  answers: Record<string, unknown>;
};

export class TalentFlowDB extends Dexie {
  jobs!: Table<Job, string>;
  candidates!: Table<Candidate, string>;
  timeline!: Table<TimelineEvent, string>;
  assessments!: Table<Assessment, string>;
  assessmentResponses!: Table<AssessmentResponse, number>;

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
      assessmentResponses: "++id, assessmentId, candidateId", // Added indexes for querying
    });
  }
}

export const db = new TalentFlowDB();