"use client";

import { useState, useTransition } from "react";
import { Plus, CheckCircle2, Circle } from "lucide-react";
import { addTask, toggleTask } from "@/app/tasks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Task = {
  id: string;
  title: string;
  is_completed: boolean;
  due_date: string | null;
};

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [isPending, startTransition] = useTransition();
  const [newTitle, setNewTitle] = useState("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    
    setNewTitle("");
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", title);
        await addTask(formData);
      } catch (err) {
        setNewTitle(title); // Restore title on error
        console.error("Failed to add task:", err);
      }
    });
  }

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleAdd} className="p-4 border-b border-zinc-800 flex gap-2">
        <Input 
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task..." 
          className="h-9 bg-zinc-950 border-zinc-800 rounded-xl text-xs font-bold"
          disabled={isPending}
        />
        <Button type="submit" size="sm" className="h-9 w-9 p-0 rounded-xl bg-white text-black hover:bg-zinc-200" disabled={isPending}>
          <Plus className="size-4" />
        </Button>
      </form>
      
      <div className="flex-1 overflow-y-auto max-h-[400px]">
        {tasks.length === 0 ? (
          <div className="p-12 text-center text-zinc-600 font-medium text-xs">No pending tasks.</div>
        ) : (
          <ul className="divide-y divide-zinc-800/50">
            {tasks.map((t) => (
              <li key={t.id} className="flex gap-4 items-start p-4 hover:bg-zinc-800/30 transition-colors group">
                <button 
                  onClick={() => startTransition(() => toggleTask(t.id, t.is_completed))}
                  className="mt-0.5 text-zinc-600 hover:text-primary transition-colors"
                >
                  {t.is_completed ? <CheckCircle2 className="size-4 text-primary" /> : <Circle className="size-4" />}
                </button>
                <div className="flex-1">
                  <p className={`text-sm font-bold transition-all ${t.is_completed ? 'line-through text-zinc-600' : 'text-white'}`}>
                    {t.title}
                  </p>
                  {t.due_date && (
                    <p className="text-[10px] font-bold uppercase tracking-wider mt-1 text-zinc-600">
                      {new Date(t.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
