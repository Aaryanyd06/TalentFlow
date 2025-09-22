"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobs, reorderJob, updateJob } from "@/services/api";
import type { Job, ReorderJobResponse } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { JobRow } from "./JobRow";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

function JobsListSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12" />
            <TableHead className="w-[40%]"><Skeleton className="h-5 w-20" /></TableHead>
            <TableHead><Skeleton className="h-5 w-20" /></TableHead>
            <TableHead><Skeleton className="h-5 w-24" /></TableHead>
            <TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-5 w-5" /></TableCell>
              <TableCell><Skeleton className="h-5 w-48" /></TableCell>
              <TableCell><Skeleton className="h-5 w-24" /></TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </TableCell>
              <TableCell><Skeleton className="h-8 w-8" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

type JobsListProps = {
  onEditJob: (jobId: string) => void;
};

type JobsQueryData = {
  data: Job[];
  pagination: { page: number; totalPages: number };
};

type ReorderVariables = {
  activeId: string;
  overId: string;
};

type UpdateJobVariables = {
  jobId: string;
  updates: Partial<Job>;
};

type ReorderContext = {
  previousJobsData?: JobsQueryData;
};

export function JobsList({ onEditJob }: JobsListProps) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const queryKey = ["jobs", page, debouncedSearchTerm, statusFilter];

  const { data, isLoading, isError } = useQuery<JobsQueryData>({
    queryKey,
    queryFn: () => getJobs({ page, search: debouncedSearchTerm, status: statusFilter }),
    placeholderData: (previousData) => previousData,
  });

  const reorderMutation = useMutation<
    ReorderJobResponse,
    Error, 
    ReorderVariables,
    ReorderContext
  >({
    mutationFn: (variables) => reorderJob({ jobId: variables.activeId }),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });
      const previousJobsData = queryClient.getQueryData<JobsQueryData>(queryKey);
      queryClient.setQueryData<JobsQueryData>(queryKey, (oldData: JobsQueryData | undefined) => {
        if (!oldData) return oldData;

        const oldJobs = oldData.data;
        const { activeId, overId } = variables;
        const activeIndex = oldJobs.findIndex((j) => j.id === activeId);
        const overIndex = oldJobs.findIndex((j) => j.id === overId);

        if (activeIndex === -1 || overIndex === -1) return oldData;
        
        return { ...oldData, data: arrayMove(oldJobs, activeIndex, overIndex) };
      });

      return { previousJobsData };
    },
    onError: (_err: Error, _variables, context) => { // Type the error parameter
      toast.error("Failed to reorder job. Reverting.");
      if (context?.previousJobsData) {
        queryClient.setQueryData(queryKey, context.previousJobsData);
      }
    },
  });

  const updateJobMutation = useMutation<Job, Error, UpdateJobVariables>({
    mutationFn: ({ jobId, updates }) => updateJob(jobId, updates),
    onSuccess: () => {
      toast.success("Job status updated.");
      queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error("Failed to update job status.");
    },
  });

  function handleToggleArchive(job: Job) {
    const newStatus = job.status === "active" ? "archived" : "active";
    updateJobMutation.mutate({ jobId: job.id, updates: { status: newStatus } });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderMutation.mutate({ activeId: active.id as string, overId: over.id as string });
    }
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 bg-muted rounded-md">
        <p className="text-red-600 font-medium">Failed to load jobs.</p>
      </div>
    );
  }

  const jobs = data?.data ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading && !data ? (
        <JobsListSkeleton />
      ) : (
        <div className="rounded-md border bg-card">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={jobs.map((j) => j.id)} strategy={verticalListSortingStrategy}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12" />
                    <TableHead className="w-[40%]">Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <JobRow
                      key={job.id}
                      job={job}
                      onToggleArchive={() => handleToggleArchive(job)}
                      onEdit={() => onEditJob(job.id)}
                    />
                  ))}
                </TableBody>
              </Table>
            </SortableContext>
          </DndContext>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Page {data?.pagination.page} of {data?.pagination.totalPages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === data?.pagination.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}