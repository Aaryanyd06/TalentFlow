import type { Job } from "@/types";

type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
};

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