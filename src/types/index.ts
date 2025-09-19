export type JobStatus = "active" | "archived";

export interface Job {
  id: string;
  title: string;
  slug: string;
  status: JobStatus;
  tags: string[];
  order: number;
}

export type CandidateStage =
  | "applied"
  | "screen"
  | "tech"
  | "offer"
  | "hired"
  | "rejected";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  jobId: string;
  stage: CandidateStage;
}

export interface TimelineEvent {
  id: string;
  candidateId: string;
  stage: CandidateStage;
  date: string;
  notes?: string;
}