"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getCandidates } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import type { Candidate, CandidateStage } from "@/types";
import { User } from "lucide-react";

const STAGES: CandidateStage[] = [
  "applied", "screen", "tech", "offer", "hired", "rejected"
];

export function CandidatesList() {
  const [stageFilter, setStageFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: allCandidates, isLoading, isError } = useQuery({
    queryKey: ["candidates", stageFilter],
    queryFn: () => getCandidates(stageFilter),
  });

  const filteredCandidates = useMemo(() => {
    if (!allCandidates) return [];
    if (!debouncedSearchTerm) return allCandidates;

    return allCandidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [allCandidates, debouncedSearchTerm]);
  
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredCandidates.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 73,
    overscan: 5,
  });

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 bg-muted rounded-md">
        <p className="text-red-600 font-medium">Failed to load candidates.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={stageFilter}
          onValueChange={(value) => setStageFilter(value === "all" ? "" : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {STAGES.map(stage => (
              <SelectItem key={stage} value={stage} className="capitalize">{stage}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 border rounded-md bg-card">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={parentRef}
          className="flex-grow overflow-y-auto border rounded-md bg-card"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const candidate = filteredCandidates[virtualItem.index];
              return (
                <Link key={virtualItem.key} href={`/candidates/${candidate.id}`}>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                    className="p-4 border-b flex items-center gap-4 hover:bg-accent"
                  >
                    <div className="h-10 w-10 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-card-foreground">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.email}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">{candidate.stage}</Badge>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}