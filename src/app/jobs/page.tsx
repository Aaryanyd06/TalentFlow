"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
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
    <div className="flex h-screen w-full flex-col bg-slate-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-22xl font-semibold text-slate-900">
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
      </div>
    </div>
  );
}