"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import type { AuthState } from "@/app/(auth)/actions";
import { motion } from "framer-motion";

type Props = {
  mode: "login" | "signup";
  next: string;
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
};

const COPY = {
  login: {
    title: "Log in",
    description: "Enter your credentials to access your dashboard.",
    submit: "Sign in",
    pending: "Authenticating...",
    altPrompt: "New contractor?",
    altLabel: "Create an account",
    altHref: "/signup",
    autoComplete: "current-password",
  },
  signup: {
    title: "Get Started",
    description: "Start building your high-performance agency today.",
    submit: "Create Account",
    pending: "Initializing...",
    altPrompt: "Already have an account?",
    altLabel: "Log in",
    altHref: "/login",
    autoComplete: "new-password",
  },
} as const;

export function AuthForm({ mode, next, action }: Props) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    action,
    undefined,
  );
  const copy = COPY[mode];
  const altHref =
    next === "/dashboard" ? copy.altHref : `${copy.altHref}?next=${encodeURIComponent(next)}`;

  return (
    <div className="flex flex-col items-center w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full bg-zinc-900/40 border border-white/5 p-8 sm:p-12 rounded-[40px] backdrop-blur-3xl shadow-2xl shadow-black relative overflow-hidden group">
        {/* Subtle accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -top-24 -left-24 size-48 bg-primary/10 blur-[80px] rounded-full opacity-50" />

        <div className="flex flex-col gap-8 relative z-10">
          <div className="flex flex-col gap-2 items-center text-center">
            <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter mb-6 group/logo">
              <Code2 className="size-6 text-primary group-hover/logo:scale-110 transition-transform" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">DevBase</span>
            </Link>
            <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
              {copy.title}
            </h1>
            <p className="text-zinc-500 text-sm font-medium">{copy.description}</p>
          </div>

          <div className="flex flex-col gap-6">
            <form action={async () => {
              const { signInWithGoogle } = await import("@/app/(auth)/actions");
              await signInWithGoogle();
            }}>
              <Button 
                type="submit" 
                variant="outline" 
                className="w-full h-12 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all font-bold text-zinc-300"
              >
                <svg className="mr-2 size-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black">
                <span className="bg-zinc-900 px-4 text-zinc-600">
                  Secure Logic
                </span>
              </div>
            </div>

            <form action={formAction} className="flex flex-col gap-5">
              <input type="hidden" name="next" value={next} />
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  disabled={pending}
                  className="bg-black/40 border-white/5 h-12 rounded-2xl focus:ring-primary/40 focus:border-primary/40 placeholder:text-zinc-700 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={copy.autoComplete}
                  required
                  minLength={8}
                  disabled={pending}
                  className="bg-black/40 border-white/5 h-12 rounded-2xl focus:ring-primary/40 focus:border-primary/40 placeholder:text-zinc-700 font-bold"
                />
              </div>
              
              {state?.error ? (
                <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-bold flex items-center gap-3">
                  <ShieldCheck className="size-4 shrink-0" />
                  {state.error}
                </div>
              ) : null}

              <Button 
                type="submit" 
                disabled={pending}
                className="h-14 rounded-[24px] bg-white text-black hover:bg-zinc-200 font-black text-lg shadow-xl shadow-white/5 transition-all active:scale-[0.98] mt-2 group"
              >
                {pending ? (
                  <span className="flex items-center gap-3">
                    <Zap className="size-4 animate-pulse text-primary fill-primary" />
                    {copy.pending}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {copy.submit}
                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>

            <p className="text-zinc-500 text-center text-sm font-bold mt-4">
              {copy.altPrompt}{" "}
              <Link
                href={altHref}
                className="text-white hover:text-primary transition-colors underline-offset-8 decoration-white/10 hover:decoration-primary/40 underline"
              >
                {copy.altLabel}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 opacity-100 select-none">
        <span style={{ fontFamily: 'Arial, sans-serif' }} className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
          Powered by
        </span>
        <a href="https://supabase.com" target="_blank" rel="noreferrer" className="group/supa">
          <img 
            src="/supabase.png" 
            alt="Supabase" 
            className="h-10 w-auto transition-all duration-500 group-hover:scale-105"
          />
        </a>
      </div>
    </div>
  );
}