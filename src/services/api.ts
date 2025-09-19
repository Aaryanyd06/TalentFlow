import type { Job, Candidate, TimelineEvent, Assessment } from "@/types";

type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
};

type GetJobsParams = {
  page?: number;
  search?: string;
  status?: string;
};

export async function getJobs({
  page = 1,
  search = "",
  status = "",
}: GetJobsParams): Promise<PaginatedResponse<Job>> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (search) params.append("search", search);
  if (status) params.append("status", status);

  const response = await fetch(`/api/jobs?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
}

export async function createJob(
  newJob: Pick<Job, "title" | "slug" | "status" | "tags">
): Promise<Job> {
  const response = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });

  if (!response.ok) {
    throw new Error("Failed to create job");
  }
  return response.json();
}

export async function reorderJob({ jobId }: { jobId: string }): Promise<{ success: true }> {
  const response = await fetch(`/api/jobs/${jobId}/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error("Failed to reorder job");
  }
  return response.json();
}

export async function updateJob(
  jobId: string,
  updates: Partial<Omit<Job, "id">>
): Promise<Job> {
  const response = await fetch(`/api/jobs/${jobId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update job");
  }
  return response.json();
}

export async function getJobById(jobId: string): Promise<Job> {
  const response = await fetch(`/api/jobs/${jobId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }
  return response.json();
}

export async function getCandidates(stage?: string): Promise<Candidate[]> {
  const params = new URLSearchParams();
  if (stage) {
    params.append("stage", stage);
  }

  const response = await fetch(`/api/candidates?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch candidates");
  }
  return response.json();
}

export async function updateCandidate(
  candidateId: string,
  updates: Partial<Omit<Candidate, "id">>
): Promise<Candidate> {
  const response = await fetch(`/api/candidates/${candidateId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update candidate");
  }
  return response.json();
}

export async function getCandidateById(candidateId: string): Promise<Candidate> {
  const response = await fetch(`/api/candidates/${candidateId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch candidate");
  }
  return response.json();
}

export async function getCandidateTimeline(candidateId: string): Promise<TimelineEvent[]> {
  const response = await fetch(`/api/candidates/${candidateId}/timeline`);
  if (!response.ok) {
    throw new Error("Failed to fetch timeline");
  }
  return response.json();
}

export async function getAssessmentByJobId(jobId: string): Promise<Assessment> {
  const response = await fetch(`/api/assessments/${jobId}`);
  if (!response.ok) {
    throw new Error("Assessment not found");
  }
  return response.json();
}

export async function saveAssessment(assessment: Assessment): Promise<Assessment> {
  const response = await fetch(`/api/assessments/${assessment.jobId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assessment),
  });
  if (!response.ok) {
    throw new Error("Failed to save assessment");
  }
  return response.json();
}