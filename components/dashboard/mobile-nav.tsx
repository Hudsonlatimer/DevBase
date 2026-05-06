"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Briefcase, DollarSign, Calculator, Info, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/projects",  label: "Projects",  icon: Briefcase },
    { href: "/finance",   label: "Finance",   icon: DollarSign },
    { href: "/tools/calculator", label: "Estimator", icon: Calculator },
    { href: "/guide",     label: "Growth Guide", icon: Info },
  ];

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="text-zinc-400 hover:text-white"
      >
        <Menu className="size-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col min-h-screen w-screen overflow-y-auto">
          {/* Header Area */}
          <div className="flex justify-between items-center px-6 py-6 border-b border-zinc-900 bg-black/50 backdrop-blur-xl sticky top-0 z-10">
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
              <Code2 className="size-5 text-primary" />
              <span>DevBase</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-xl"
            >
              <X className="size-5" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-10 flex flex-col gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-5 rounded-2xl transition-all ${
                    isActive 
                      ? "bg-zinc-900 text-white border border-zinc-800" 
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <link.icon className={`size-6 ${isActive ? "text-primary" : "text-zinc-600"}`} />
                    <span className="text-xl font-bold tracking-tight">{link.label}</span>
                  </div>
                  {isActive && <div className="size-2 rounded-full bg-primary shadow-[0_0_10px_rgba(255,255,255,0.5)]" />}
                </Link>
              );
            })}
          </nav>

          {/* Simplified Footer */}
          <div className="p-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-800" style={{ fontFamily: 'Arial, sans-serif' }}>
              &copy; 2026 DevBase
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
