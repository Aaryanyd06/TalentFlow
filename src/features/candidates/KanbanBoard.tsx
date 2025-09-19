"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCandidates, updateCandidate } from "@/services/api";
import { KanbanColumn } from "./KanbanColumn";
import type { Candidate, CandidateStage } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { CandidateCard } from "./CandidateCard";

const STAGES: CandidateStage[] = ["applied", "screen", "tech", "offer", "hired", "rejected"];

export function KanbanBoard() {
  const queryClient = useQueryClient();
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);

  const { data: candidates, isLoading, isError } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => getCandidates(),
  });
  
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  }));

  const columns = useMemo(() => {
    const grouped = new Map<CandidateStage, Candidate[]>();
    STAGES.forEach(stage => grouped.set(stage, []));
    candidates?.forEach(candidate => {
      if (grouped.has(candidate.stage)) {
        grouped.get(candidate.stage)!.push(candidate);
      }
    });
    return grouped;
  }, [candidates]);

  const updateCandidateMutation = useMutation({
    mutationFn: ({ candidateId, stage }: { candidateId: string, stage: CandidateStage }) =>
      updateCandidate(candidateId, { stage }),
    onMutate: async ({ candidateId, stage }) => {
      await queryClient.cancelQueries({ queryKey: ["candidates"] });
      const previousCandidates = queryClient.getQueryData<Candidate[]>(["candidates"]);

      queryClient.setQueryData<Candidate[]>(["candidates"], (old) =>
        old?.map(c => c.id === candidateId ? { ...c, stage } : c)
      );
      
      return { previousCandidates };
    },
    onError: (err, variables, context) => {
      toast.error("Failed to move candidate.");
      if (context?.previousCandidates) {
        queryClient.setQueryData(["candidates"], context.previousCandidates);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });

  function handleDragStart(event: DragStartEvent) {
    const candidate = candidates?.find(c => c.id === event.active.id);
    if (candidate) {
      setActiveCandidate(candidate);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveCandidate(null);
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeCandidate = candidates?.find(c => c.id === activeId);
    if (!activeCandidate) return;
    
    // Find the destination stage
    let newStage: CandidateStage | undefined;
    if (STAGES.includes(overId as CandidateStage)) {
      // Dropped on a column
      newStage = overId as CandidateStage;
    } else {
      // Dropped on another card
      const overCandidate = candidates?.find(c => c.id === overId);
      newStage = overCandidate?.stage;
    }

    if (newStage && newStage !== activeCandidate.stage) {
      updateCandidateMutation.mutate({ candidateId: activeId, stage: newStage });
    }
  }

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto p-1">
        {STAGES.map(stage => (
          <div key={stage} className="flex flex-col w-72 flex-shrink-0">
            <Skeleton className="h-6 w-24 mb-2" />
            <div className="bg-slate-100 rounded-md p-2 space-y-2">
              <Skeleton className="h-16 w-full" /> <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading candidates.</div>
  }
  
  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-1 h-full">
        {Array.from(columns.entries()).map(([stage, candidatesInStage]) => (
          <KanbanColumn 
            key={stage} 
            id={stage}
            title={stage} 
            candidates={candidatesInStage} 
          />
        ))}
      </div>
      <DragOverlay>
        {activeCandidate ? <CandidateCard candidate={activeCandidate} /> : null}
      </DragOverlay>
    </DndContext>
  );
}