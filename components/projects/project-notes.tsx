"use client";

import { useState, useTransition } from "react";
import { NotebookPen, Check, X } from "lucide-react";
import { saveProjectNotes } from "@/app/projects/notes-action";
import { toast } from "sonner";

export function ProjectNotes({ projectId, initialNotes }: { projectId: string; initialNotes: string | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await saveProjectNotes(projectId, notes);
        toast.success("Notes saved");
        setIsEditing(false);
      } catch {
        toast.error("Failed to save notes");
      }
    });
  };

  const handleCancel = () => {
    setNotes(initialNotes ?? "");
    setIsEditing(false);
  };

  return (
    <div className="mt-4 pt-4 border-t border-zinc-800">
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add project notes..."
            rows={3}
            autoFocus
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-zinc-600 font-medium resize-none focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Check className="size-3" /> Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="size-3" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full text-left group"
        >
          {notes ? (
            <p className="text-xs text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-200 transition-colors line-clamp-3">
              {notes}
            </p>
          ) : (
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
              <NotebookPen className="size-3" /> Add notes
            </span>
          )}
        </button>
      )}
    </div>
  );
}
