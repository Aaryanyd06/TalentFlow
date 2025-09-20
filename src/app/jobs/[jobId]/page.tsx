"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getJobById } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Tag } from "lucide-react";

function JobDetailSkeleton() {
  return (
    <div className="p-8">
      <div className="space-y-3 mb-8">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-5 w-1/4" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  const { data: job, isLoading, isError } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobById(jobId),
    enabled: !!jobId,
  });

  if (isLoading) {
    return <JobDetailSkeleton />;
  }

  if (isError || !job) {
    return <div className="p-8">Job not found.</div>;
  }

  return (
    <div className="p-8">
      <div className="pb-6 border-b mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
        <div className="flex items-center gap-4 mt-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="capitalize">
              Status: <Badge variant={job.status === "active" ? "default" : "secondary"}>{job.status}</Badge>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span>Tags:</span>
            <div className="flex items-center gap-2">
              {job.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Job Description Placeholder</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
          </p>
          <p>
            Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
          </p>
        </div>
      </div>
    </div>
  );
}