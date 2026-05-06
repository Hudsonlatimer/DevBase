"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, DollarSign, Settings } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Home",     icon: Home },
    { href: "/projects",  label: "Projects", icon: Briefcase },
    { href: "/finance",   label: "Finance",  icon: DollarSign },
    { href: "/settings",  label: "Settings", icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-t border-white/5 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full gap-1 group"
            >
              <div className={`transition-all duration-300 ${isActive ? "text-white scale-110" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                <link.icon className="size-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest transition-all ${isActive ? "text-white opacity-100" : "text-zinc-500 opacity-60"}`}>
                {link.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute -top-px left-1/4 right-1/4 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
