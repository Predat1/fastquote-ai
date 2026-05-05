"use client";

import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 construction-pattern">
      <Navbar />
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic mb-8">Besoin d'un <br /><span className="text-primary">Coup de Main ?</span></h1>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Une question sur le chiffrage IA ? Un problème technique sur le chantier ? 
              Notre équipe de support connaît votre métier et vous répond en moins de 2h.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 p-6 glass-card rounded-2xl border-l-4 border-l-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-black uppercase text-xs tracking-widest mb-1">Téléphone</div>
                  <div className="text-xl font-bold text-white">01 23 45 67 89</div>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 glass-card rounded-2xl border-l-4 border-l-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-black uppercase text-xs tracking-widest mb-1">Email</div>
                  <div className="text-xl font-bold text-white">support@fastquote-ai.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="glass-card p-10 rounded-3xl border-2 border-white/5">
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Prénom</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Nom</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Message</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none h-40" />
                </div>
                <Button className="w-full py-6 gap-2">
                  <Send className="w-5 h-5" /> Envoyer ma demande
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
