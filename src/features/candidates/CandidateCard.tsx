"use client";

import Link from "next/link";
import type { Candidate } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
        className="p-3 bg-card rounded-md border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary"
      >
        <p className="font-semibold text-sm text-card-foreground">{candidate.name}</p>
        <p className="text-xs text-muted-foreground">{candidate.email}</p>
      </div>
    </Link>
  );
}