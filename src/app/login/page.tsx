"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Link from "next/link";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else window.location.href = "/dashboard";
    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 construction-pattern flex items-center justify-center">
      <Navbar />
      <div className="container px-6 mx-auto flex justify-center">
        <div className="glass-card p-10 rounded-3xl w-full max-w-md border-t-8 border-t-primary">
          <h1 className="text-3xl font-black text-white mb-2 uppercase italic">Accès Artisan</h1>
          <p className="text-slate-500 mb-8 font-medium italic uppercase tracking-wider text-xs">FastQuote AI Platform</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Mail className="w-3 h-3 text-primary" /> Email Professionnel
              </label>
              <input 
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all"
                placeholder="artisan@exemple.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Lock className="w-3 h-3 text-primary" /> Mot de passe
              </label>
              <input 
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full py-6">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <LogIn className="w-6 h-6 mr-2" />}
              {loading ? "Connexion..." : "Se Connecter"}
            </Button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm font-bold">
            Pas encore de compte ? <Link href="/signup" className="text-primary hover:underline italic">Créer un compte chantier</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
