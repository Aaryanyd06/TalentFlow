"use client";

import type { Candidate } from "@/types";
import { CandidateCard } from "./CandidateCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

type KanbanColumnProps = {
  id: string;
  title: string;
  candidates: Candidate[];
};

export function KanbanColumn({ id, title, candidates }: KanbanColumnProps) {
  return (
    <div className="flex flex-col w-72 flex-shrink-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-md text-slate-700 capitalize">{title}</h3>
        <span className="text-sm font-medium text-slate-500 bg-slate-200 rounded-full px-2 py-0.5">
          {candidates.length}
        </span>
      </div>
      <SortableContext id={id} items={candidates} strategy={verticalListSortingStrategy}>
        <div className="bg-muted rounded-md p-2 space-y-2 h-full overflow-y-auto">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}