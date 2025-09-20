"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useAssessmentBuilderStore } from "@/store/assessmentBuilderStore";
import { BuilderControls } from "@/features/assessments/BuilderControls";
import { LivePreview } from "@/features/assessments/LivePreview";
import { getAssessmentByJobId, saveAssessment, getJobById } from "@/services/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function AssessmentBuilderPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const store = useAssessmentBuilderStore();
  const queryClient = useQueryClient();

  const { data: job, isLoading: isLoadingJob } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobById(jobId),
    enabled: !!jobId,
  });

  const { data: existingAssessment, isLoading: isLoadingAssessment } = useQuery({
    queryKey: ["assessment", jobId],
    queryFn: () => getAssessmentByJobId(jobId),
    enabled: !!jobId,
    retry: false,
  });

  const isLoading = isLoadingJob || isLoadingAssessment;

  useEffect(() => {
    if (!isLoadingAssessment) {
      if (existingAssessment) {
        store.setAssessment(existingAssessment);
      } else {
        store.setAssessment({
          id: crypto.randomUUID(),
          jobId: jobId,
          sections: [],
        });
      }
    }
  }, [isLoadingAssessment, existingAssessment, jobId, store.setAssessment]);

  const saveMutation = useMutation({
    mutationFn: saveAssessment,
    onSuccess: () => {
      toast.success("Assessment saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["assessment", jobId] });
      // Reset the store to a new, empty state
      store.setAssessment({
        id: crypto.randomUUID(),
        jobId: jobId,
        sections: [],
      });
    },
    onError: () => {
      toast.error("Failed to save assessment.");
    },
  });

  const handleSave = () => {
    // Only save if there's at least one section with at least one question
    if (store.assessment.sections.some(s => s.questions.length > 0)) {
       saveMutation.mutate(store.assessment);
    } else {
       toast.warning("Cannot save an empty assessment.");
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <div>
          <h1 className="text-xl font-semibold">Assessment Builder</h1>
          {isLoadingJob ? (
             <Skeleton className="h-5 w-64 mt-1" />
          ) : (
            <p className="text-sm text-muted-foreground">
              Designing the assessment for: <span className="font-medium text-foreground">{job?.title}</span>
            </p>
          )}
        </div>
        <Button onClick={handleSave} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Assessment</>}
        </Button>
      </div>
      <div className="flex-1 grid md:grid-cols-2 gap-4 p-4 overflow-y-auto">
        {isLoading ? (
          <div className="col-span-2 flex items-center justify-center">
            <p>Loading assessment...</p>
          </div>
        ) : (
          <>
            <BuilderControls />
            <LivePreview />
          </>
        )}
      </div>
    </div>
  );
}