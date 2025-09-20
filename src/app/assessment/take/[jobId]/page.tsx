"use client";

import { useParams } from "next/navigation";
import { AssessmentRuntimeForm } from "@/features/assessments/AssessmentRuntimeForm";

export default function TakeAssessmentPage() {
  const params = useParams();
  const jobId = params.id as string;

  // In a real app, you might have a header/footer for the candidate view
  return (
    <main className="bg-slate-50 min-h-screen">
      {jobId ? <AssessmentRuntimeForm jobId={jobId} /> : <p>Loading...</p>}
    </main>
  );
}