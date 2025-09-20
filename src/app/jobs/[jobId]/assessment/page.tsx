"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useAssessmentBuilderStore } from "@/store/assessmentBuilderStore";
import { BuilderControls } from "@/features/assessments/BuilderControls";
import { LivePreview } from "@/features/assessments/LivePreview";
import { getAssessmentByJobId, saveAssessment } from "@/services/api";
import { toast } from "sonner";

export default function AssessmentBuilderPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const store = useAssessmentBuilderStore();
  const queryClient = useQueryClient();

  const { data: existingAssessment, isLoading } = useQuery({
    queryKey: ["assessment", jobId],
    queryFn: () => getAssessmentByJobId(jobId),
    enabled: !!jobId,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
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
  }, [isLoading, existingAssessment, jobId, store.setAssessment]);

  const saveMutation = useMutation({
    mutationFn: saveAssessment,
    onSuccess: () => {
      toast.success("Assessment saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["assessment", jobId] });
    },
    onError: () => {
      toast.error("Failed to save assessment.");
    },
  });

  const handleSave = () => {
    saveMutation.mutate(store.assessment);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <div>
          <h1 className="text-xl font-semibold">Assessment Builder</h1>
          <p className="text-sm text-muted-foreground">
            Designing the assessment for job: {jobId}
          </p>
        </div>
        <Button onClick={handleSave} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Assessment</>}
        </Button>
      </div>
      <div className="flex-1 grid md:grid-cols-2 gap-4 p-4 overflow-y-auto">
        {isLoading ? <p>Loading assessment...</p> : (
          <>
            <BuilderControls />
            <LivePreview />
          </>
        )}
      </div>
    </div>
  );
}