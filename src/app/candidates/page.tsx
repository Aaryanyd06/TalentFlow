"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { CandidatesList } from "@/features/candidates/CandidatesList";
import { KanbanBoard } from "@/features/candidates/KanbanBoard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, LayoutGrid } from "lucide-react";

export default function CandidatesPage() {
  const [view, setView] = useState<"list" | "board">("list");

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
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
      </div>
    </div>
  );
}