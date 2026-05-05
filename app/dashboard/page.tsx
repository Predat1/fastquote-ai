"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Link from "next/link";
import { FileText, Calendar, User, ArrowUpRight, Loader2, Plus } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setQuotes(data);
    setLoading(false);
  }

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <Navbar />
      
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Tableau de bord</h1>
            <p className="text-slate-400">Retrouvez l'historique de vos chantiers et devis.</p>
          </div>
          <Link href="/create">
            <Button className="flex items-center gap-2">
              <Plus className="w-5 h-5" /> Nouveau Devis
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-amber-500" />
            Chargement de vos devis...
          </div>
        ) : (
          <div className="grid gap-6">
            {quotes.length === 0 ? (
              <div className="glass-card p-20 rounded-3xl text-center">
                <FileText className="w-16 h-16 text-white/10 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Aucun devis pour le moment</h3>
                <p className="text-slate-500 mb-8">Commencez par créer votre premier devis intelligent.</p>
                <Link href="/create">
                  <Button variant="outline">Créer mon premier devis</Button>
                </Link>
              </div>
            ) : (
              quotes.map((quote) => (
                <div key={quote.id} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between hover:border-amber-500/30 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg mb-1">{quote.client_name}</div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(quote.created_at).toLocaleDateString()}</span>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded text-[10px] font-bold uppercase tracking-wider">{quote.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-12">
                    <div className="text-right">
                      <div className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Total HT</div>
                      <div className="text-2xl font-bold text-white">{quote.total_ht} €</div>
                    </div>
                    <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Détails <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
