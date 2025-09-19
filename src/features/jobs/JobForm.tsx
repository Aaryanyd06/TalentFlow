"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createJob, getJobById, updateJob } from "@/services/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import type { Job } from "@/types";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  slug: z.string().min(1, { message: "Slug is required." }),
});

type JobFormProps = {
  jobId?: string;
  onSuccess: () => void;
};

export function JobForm({ jobId, onSuccess }: JobFormProps) {
  const queryClient = useQueryClient();
  const isEditMode = !!jobId;

  const { data: jobData, isLoading: isLoadingJob } = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => getJobById(jobId!),
    enabled: isEditMode,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  useEffect(() => {
    if (jobData) {
      form.reset(jobData);
    }
  }, [jobData, form]);

  const createMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast.success("Job created successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to create job. Please try again.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: Partial<Job>) => updateJob(jobId!, values),
     onSuccess: () => {
      toast.success("Job updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs", jobId] });
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to update job. Please try again.");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate({
        ...values,
        status: "active",
        tags: [],
      });
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (isEditMode && isLoadingJob) {
    return (
       <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior Frontend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Slug</FormLabel>
              <FormControl>
                <Input placeholder="e.g. senior-frontend-dev" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending
            ? (isEditMode ? "Saving..." : "Creating...")
            : (isEditMode ? "Save Changes" : "Create Job")}
        </Button>
      </form>
    </Form>
  );
}