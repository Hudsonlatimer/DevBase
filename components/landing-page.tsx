"use client";

import Link from "next/link";
import { Code2, ArrowRight, Briefcase, DollarSign, NotebookPen, Terminal, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col bg-[#050505] text-white selection:bg-primary/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
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
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-50" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10 flex flex-col items-center text-center">
          <motion.h1
            className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight mb-8 leading-[0.85] bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Manage your <br />
            freelance <span className="italic">hustle.</span>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-zinc-400 text-xl sm:text-2xl mb-12 font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A high-density project engine for developers. Track builds, notes, and revenue with zero bloat. Designed for those who ship daily.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button asChild size="lg" className="rounded-2xl h-16 px-12 text-lg bg-white text-black hover:bg-zinc-200 font-black shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl h-16 px-10 text-lg border-zinc-800 hover:bg-zinc-900 font-bold transition-all">
              <Link href="/login">Log in</Link>
            </Button>
          </motion.div>

          {/* Hero Image / UI Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-24 relative w-full max-w-5xl group"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-[40px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
            <div className="relative rounded-[40px] border border-white/10 bg-zinc-900/50 p-2 sm:p-4 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black">
              <img
                src="/dashboard.png"
                alt="DevBase Dashboard"
                className="rounded-[32px] w-full h-auto object-cover border border-white/5 shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
            <Feature
              icon={Terminal}
              title="Project Engine"
              description="Keep tabs on every build. Set deadlines, track progress, and ship on time. A high-density view of your active inventory."
            />
            <Feature
              icon={NotebookPen}
              title="Smart Context"
              description="Internal notes and feedback loops for every project. Keep all your developer context right where the work happens."
            />
            <Feature
              icon={DollarSign}
              title="Revenue Tracking"
              description="Real-time finance metrics. Know exactly how much you've earned and what's pending. No complex accounting, just the numbers."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Callout */}
      <section className="py-32 border-y border-white/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-600">
            Engineered for the independent.
          </h2>
          <p className="text-zinc-500 text-lg sm:text-xl font-medium mb-12 max-w-2xl mx-auto">
            Stop juggling spreadsheets and generic CRMs. Use a tool that feels like your IDE. Fast, minimal, and focused on growth.
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
            <Shield className="size-10" />
            <Zap className="size-10" />
            <Code2 className="size-10" />
            <Briefcase className="size-10" />
            <Globe className="size-10" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
              <Code2 className="size-6 text-primary" />
              <span>DevBase</span>
            </div>
            <p className="text-zinc-600 text-sm font-medium max-w-xs">
              The high-performance operating system for freelance developers.
            </p>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 flex justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-800" style={{ fontFamily: 'Arial, sans-serif' }}>
          <span>&copy; 2026 DevBase</span>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="group">
      <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-[24px] w-fit mb-6 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
        <Icon className="size-6 text-zinc-400 group-hover:text-primary transition-colors duration-500" />
      </div>
      <h3 className="font-black text-2xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-600 transition-all duration-500 group-hover:translate-x-1">{title}</h3>
      <p className="text-zinc-500 font-medium leading-relaxed text-lg">
        {description}
      </p>
    </div>
  );
}
