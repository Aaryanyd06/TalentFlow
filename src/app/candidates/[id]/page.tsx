"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getCandidateById, getCandidateTimeline } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Mail, Briefcase, User, MessageSquare, CheckSquare } from "lucide-react";
import { AddNoteForm } from "@/features/candidates/AddNoteForm";

function ProfileSkeleton() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-6 mb-8 pb-6 border-b">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-80" />
        </div>
      </div>
      <div className="space-y-4 mb-8">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-28" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function CandidateProfilePage() {
  const params = useParams();
  const candidateId = params.id as string;

  const { data: candidate, isLoading: isLoadingCandidate } = useQuery({
    queryKey: ["candidate", candidateId],
    queryFn: () => getCandidateById(candidateId),
    enabled: !!candidateId,
  });

  const { data: timeline, isLoading: isLoadingTimeline } = useQuery({
    queryKey: ["candidateTimeline", candidateId],
    queryFn: () => getCandidateTimeline(candidateId),
    enabled: !!candidateId,
  });
  
  const isLoading = isLoadingCandidate || isLoadingTimeline;

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!candidate) {
    return <div className="p-8">Candidate not found.</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-6 mb-8 pb-6 border-b">
        <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
          <User className="h-10 w-10 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{candidate.name}</h1>
          <div className="flex items-center gap-4 mt-1 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="capitalize">Currently in <Badge>{candidate.stage}</Badge> stage</span>
              </div>
          </div>
        </div>
      </div>
      
      <AddNoteForm candidateId={candidateId} />

      <h2 className="text-2xl font-bold tracking-tight mb-6">Hiring Timeline</h2>
      <ol className="relative border-s border-border ml-1">
        {timeline?.map((event) => (
          <li key={event.id} className="mb-8 ms-4">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-secondary rounded-full -start-3 ring-8 ring-background">
              {event.type === 'note' ? <MessageSquare className="w-3 h-3 text-muted-foreground" /> : <CheckSquare className="w-3 h-3 text-muted-foreground" />}
            </span>
            <div className="ml-4">
              <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </time>
              {event.type === 'stage-change' && (
                <h3 className="text-lg font-semibold capitalize">Moved to "{event.stage}" stage</h3>
              )}
              {event.type === 'note' && (
                <p className="text-base font-normal text-foreground bg-card border rounded-md p-3 mt-1 whitespace-pre-wrap">{event.notes}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}