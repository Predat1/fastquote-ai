"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./Button";
import { Hammer } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mx-auto mt-4 max-w-7xl glass-card rounded-2xl"
    >
      <Link href="/" className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          <Hammer className="w-6 h-6 text-slate-950" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          FastQuote <span className="text-amber-500">AI</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/create" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
          Nouveau Devis
        </Link>
        <Link href="/rates" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
          Mes Tarifs
        </Link>
        <Link href="/#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
          Fonctionnalités
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">Connexion</Button>
        <Link href="/create">
          <Button size="sm">Essai gratuit</Button>
        </Link>
      </div>
    </motion.nav>
  );
}
