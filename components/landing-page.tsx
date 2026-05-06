"use client";

import Link from "next/link";
import { Code2, Briefcase, DollarSign, NotebookPen, Terminal, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-hidden bg-[#050505] font-sans text-white selection:bg-primary/20">
      {/* Navigation */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-900 bg-black">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <Code2 className="size-7 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">DevBase</span>
          </Link>
          <div className="flex items-center gap-8 text-sm font-bold">
            <Link href="/login" className="text-zinc-400 hover:text-white transition-colors">Sign in</Link>
            <Button asChild variant="secondary" className="rounded-full bg-white text-black hover:bg-zinc-200 h-10 px-6 font-bold shadow-lg shadow-white/5">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40">

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 text-center">
          <motion.h1
            className="mb-6 text-5xl font-black leading-tight tracking-tight sm:text-7xl md:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Freelance tracker <br />
            for devs.
          </motion.h1>

          <motion.p
            className="mb-10 max-w-2xl text-base font-medium leading-relaxed text-zinc-400 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I built this to track my projects, notes, and invoices in one place. Simple, fast, and no extra stuff.
          </motion.p>

          <motion.div
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button asChild size="lg" className="h-14 rounded-xl bg-white px-10 text-base font-bold text-black transition-all hover:bg-zinc-200">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 rounded-xl border-zinc-800 px-8 text-base font-bold transition-all hover:bg-zinc-900">
              <Link href="/login">Log in</Link>
            </Button>
          </motion.div>

          {/* Hero Image / UI Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="group relative mt-16 w-full max-w-4xl"
          >
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-2 sm:p-3">
              <Image
                src="/dashboard.png"
                alt="DevBase Dashboard"
                width={1920}
                height={1080}
                priority
                className="h-auto w-full rounded-xl border border-zinc-800 object-cover transition-transform duration-500 group-hover:scale-[1.005]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-[#050505] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <Feature
              icon={Terminal}
              title="Projects"
              description="Track deadlines, progress, and client work without using a spreadsheet."
            />
            <Feature
              icon={NotebookPen}
              title="Notes"
              description="Keep quick notes for each project so you do not forget decisions and tasks."
            />
            <Feature
              icon={DollarSign}
              title="Money"
              description="Log paid and pending invoices so you always know what is coming in."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Callout */}
      <section className="border-y border-zinc-900 py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="mb-6 text-3xl font-black tracking-tight sm:text-5xl">
            Built for solo dev work.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-base font-medium text-zinc-500 sm:text-lg">
            Not a huge CRM. Just the core stuff I needed for freelancing.
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
            <Shield className="size-10" />
            <Zap className="size-10" />
            <Code2 className="size-10" />
            <Briefcase className="size-10" />
            <Globe className="size-10" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
              <Code2 className="size-6 text-primary" />
              <span>DevBase</span>
            </div>
            <p className="text-zinc-600 text-sm font-medium max-w-xs">
              Student-built project tracker for freelance devs.
            </p>
          </div>
        </div>
        <div className="mt-12 flex justify-center border-t border-zinc-900 pt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700" style={{ fontFamily: "Arial, sans-serif" }}>
          <span>&copy; 2026 DevBase</span>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="group">
      <div className="mb-4 w-fit rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition-colors duration-300 group-hover:border-zinc-700">
        <Icon className="size-5 text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200" />
      </div>
      <h3 className="mb-3 text-xl font-black transition-all duration-300 group-hover:translate-x-0.5">{title}</h3>
      <p className="text-base font-medium leading-relaxed text-zinc-500">
        {description}
      </p>
    </div>
  );
}
