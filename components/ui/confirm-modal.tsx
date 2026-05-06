"use client";

import * as React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  isDestructive?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  isDestructive = true,
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-zinc-900 sm:max-w-[400px] rounded-[32px] p-8 gap-6 shadow-2xl">
        <DialogHeader className="gap-3">
          <div className="flex items-center justify-center size-12 rounded-2xl bg-red-500/10 border border-red-500/20 mb-2">
            <AlertTriangle className="size-6 text-red-500" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-white">{title}</DialogTitle>
          <DialogDescription className="text-zinc-500 font-medium leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 h-12 rounded-2xl font-bold border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 h-12 rounded-2xl font-black shadow-lg transition-all active:scale-[0.98] ${
              isDestructive 
                ? "bg-red-500 text-white hover:bg-red-600 shadow-red-500/10" 
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
