"use client";

import { useState } from "react";
import { CandidatesList } from "@/features/candidates/CandidatesList";
import { KanbanBoard } from "@/features/candidates/KanbanBoard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, LayoutGrid } from "lucide-react";

export default function CandidatesPage() {
  const [view, setView] = useState<"list" | "board">("list");

  return (
    <div className="flex flex-col overflow-hidden p-8 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Candidates
        </h2>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(value: "list" | "board") => {
            if (value) setView(value);
          }}
        >
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="board" aria-label="Board view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex-grow overflow-hidden">
        {view === "list" ? <CandidatesList /> : <KanbanBoard />}
      </div>
    </div>
  );
}