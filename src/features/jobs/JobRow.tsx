"use client";

import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/types";

type JobRowProps = {
  job: Job;
  onToggleArchive: () => void;
  onEdit: () => void;
};

export function JobRow({ job, onToggleArchive, onEdit }: JobRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const archiveText = job.status === "active" ? "Archive" : "Unarchive";

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell className="w-12">
        <div className="flex justify-center">
          <button {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-5 w-5 text-slate-400" />
          </button>
        </div>
      </TableCell>
      <TableCell className="font-medium text-slate-800">{job.title}</TableCell>
      <TableCell>
        <Badge variant={job.status === "active" ? "default" : "secondary"}>
          {job.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/jobs/${job.id}/assessment`}>Assessment</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onToggleArchive}>
              {archiveText}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}