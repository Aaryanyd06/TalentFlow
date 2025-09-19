import Dexie, { type Table } from "dexie";
import type { Job, Candidate, TimelineEvent } from "@/types";

export class TalentFlowDB extends Dexie {
  jobs!: Table<Job>;
  candidates!: Table<Candidate>;
  timeline!: Table<TimelineEvent>;

  constructor() {
    super("talentFlowDatabase");
    this.version(1).stores({
      jobs: "++id, title, status, slug, order",
      candidates: "++id, name, email, stage, jobId",
      timeline: "++id, candidateId, date",
    });
  }
}

export const db = new TalentFlowDB();