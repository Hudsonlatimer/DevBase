"use client";

import { useState, useTransition } from "react";
import { MoreVertical, Trash2, CheckCircle2, Clock, Briefcase } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteProject, updateProjectStatus } from "@/app/projects/actions";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/confirm-modal";

export function ProjectActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onDeleteConfirm = () => {
    startTransition(async () => {
      try {
        await deleteProject(id);
        toast.success("Project deleted");
      } catch (err) {
        toast.error("Failed to delete project");
      }
    });
  };

  const onUpdateStatus = (status: string) => {
    startTransition(async () => {
      try {
        await updateProjectStatus(id, status);
        toast.success(`Status updated to ${status}`);
      } catch (err) {
        toast.error("Failed to update status");
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-white" disabled={isPending}>
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-zinc-900 border-zinc-800 text-zinc-400 shadow-2xl">
          <DropdownMenuLabel className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Update Status</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onUpdateStatus('planning')} className="hover:bg-zinc-800 hover:text-white cursor-pointer gap-2">
            <Clock className="size-3.5" /> Planning
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdateStatus('development')} className="hover:bg-zinc-800 hover:text-white cursor-pointer gap-2">
            <Briefcase className="size-3.5 text-blue-500" /> Development
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdateStatus('completed')} className="hover:bg-zinc-800 hover:text-white cursor-pointer gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-500" /> Completed
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-800" />
          <DropdownMenuItem 
            onClick={() => setShowDeleteModal(true)} 
            className="text-red-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer gap-2 focus:bg-red-500/10 focus:text-red-400"
          >
            <Trash2 className="size-3.5" /> Delete Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={onDeleteConfirm}
        title="Delete Project?"
        description="This action is permanent. All associated tasks, invoices, and notes will be wiped immediately."
        confirmText="Delete Forever"
      />
    </>
  );
}
