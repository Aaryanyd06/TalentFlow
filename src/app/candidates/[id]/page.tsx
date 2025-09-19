"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getCandidateById, getCandidateTimeline } from "@/services/api";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Mail, Briefcase, User } from "lucide-react";

function ProfileSkeleton() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-80" />
        </div>
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

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          {isLoading ? <ProfileSkeleton /> : (
            candidate && (
              <div className="p-8">
                <div className="flex items-center gap-6 mb-8 pb-6 border-b">
                  <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center">
                    <User className="h-10 w-10 text-slate-500" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800">{candidate.name}</h1>
                    <div className="flex items-center gap-4 mt-1 text-slate-500">
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

                <h2 className="text-xl font-semibold text-slate-700 mb-4">Hiring Timeline</h2>
                <ol className="relative border-s border-gray-200">
                  {timeline?.map((event, index) => (
                    <li key={event.id} className="mb-6 ms-4">
                      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                      <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </time>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">{event.stage}</h3>
                    </li>
                  ))}
                </ol>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}