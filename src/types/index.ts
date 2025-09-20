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

export type QuestionType =
  | "single-choice"
  | "multi-choice"
  | "short-text"
  | "long-text"
  | "numeric"
  | "file-upload";

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  label: string;
  options?: string[];
}

export interface AssessmentSection {
  id: string;
  title: string;
  questions: AssessmentQuestion[];
}

export interface Assessment {
  id: string;
  type: QuestionType;
  jobId: string;
  sections: AssessmentSection[];
}