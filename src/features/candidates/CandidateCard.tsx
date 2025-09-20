"use client";

import Link from "next/link";
import type { Candidate } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { User } from "lucide-react";

type CandidateCardProps = {
  candidate: Candidate;
};

export function CandidateCard({ candidate }: CandidateCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: candidate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Link href={`/candidates/${candidate.id}`}>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="p-3 bg-card rounded-md border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary flex items-center gap-3"
      >
        <div className="h-8 w-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold text-sm text-card-foreground">{candidate.name}</p>
          <p className="text-xs text-muted-foreground">{candidate.email}</p>
        </div>
      </div>
    </Link>
  );
}