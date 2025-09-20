"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JobsList } from "@/features/jobs/JobsList";
import { JobForm } from "@/features/jobs/JobForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function JobsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  const isEditModalOpen = !!editingJobId;
  const onEditModalOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setEditingJobId(null);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Job Postings
        </h2>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new job posting</DialogTitle>
            </DialogHeader>
            <JobForm onSuccess={() => setIsCreateModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={onEditModalOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit job posting</DialogTitle>
          </DialogHeader>
          <JobForm
            jobId={editingJobId!}
            onSuccess={() => setEditingJobId(null)}
          />
        </DialogContent>
      </Dialog>

      <JobsList onEditJob={setEditingJobId} />
    </div>
  );
}