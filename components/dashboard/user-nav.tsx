"use client";

import Link from "next/link";
import { Settings, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/auth/actions";

export function UserNav({ user }: { user: any }) {
  const username = user?.email?.split("@")[0] ?? "User";
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full bg-zinc-800 ring-1 ring-zinc-700 hover:ring-zinc-500 transition-all font-black text-xs"
        >
          {initials}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-zinc-900/95 backdrop-blur-xl border-zinc-800"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal px-3 py-2.5">
          <p className="text-sm font-black truncate">{username}</p>
          <p className="text-xs text-zinc-500 truncate mt-0.5">{user?.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-zinc-800" />

        <DropdownMenuItem asChild className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 gap-2.5 px-3 py-2">
          <Link href="/settings">
            <Settings className="size-4 text-zinc-400" />
            <span className="font-bold text-sm">Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-zinc-800" />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 text-red-400 focus:text-red-400 gap-2.5 px-3 py-2"
        >
          <LogOut className="size-4" />
          <span className="font-bold text-sm">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
