"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { Plus, Search, Edit2, Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export const dynamic = "force-dynamic";

export default function RatesPage() {
  const [rates, setRates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newRate, setNewRate] = useState({ label: "", unit: "m²", price: "", category: "" });

  useEffect(() => {
    async function fetchRates() {
      const supabase = createClient();
      if (!supabase.from) return;

      const { data, error } = await supabase
        .from("price_book")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setRates(data);
      if (error) console.error("Erreur chargement tarifs:", error);
      setLoading(false);
    }

    fetchRates();
  }, []);

  async function handleAddRate() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Veuillez vous connecter pour ajouter un tarif.");
      return;
    }

    const { error } = await supabase.from("price_book").insert([
      { 
        label: newRate.label, 
        unit: newRate.unit, 
        unit_price_ht: parseFloat(newRate.price), 
        category: newRate.category,
        user_id: user.id 
      }
    ]);

    if (!error) {
      setNewRate({ label: "", unit: "m²", price: "", category: "" });
      setIsAdding(false);
      fetchRates();
    } else {
      console.error("Erreur ajout tarif:", error);
    }
  }

  async function deleteRate(id: string) {
    const { error } = await supabase.from("price_book").delete().eq("id", id);
    if (!error) fetchRates();
  }

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <Navbar />
      
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Ma Bibliothèque de Prix</h1>
            <p className="text-slate-400">Gérez vos tarifs pour des devis ultra-rapides.</p>
          </div>
          <Button className="flex items-center gap-2" onClick={() => setIsAdding(true)}>
            <Plus className="w-5 h-5" /> Ajouter un tarif
          </Button>
        </div>

        {/* Modal Ajout Rapide */}
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
            <div className="glass-card p-8 rounded-3xl w-full max-w-md">
              <h2 className="text-2xl font-bold text-white mb-6">Nouvelle Prestation</h2>
              <div className="space-y-4 mb-8">
                <input 
                  type="text" placeholder="Libellé (ex: Peinture murale)" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500"
                  value={newRate.label} onChange={(e) => setNewRate({...newRate, label: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="number" placeholder="Prix HT" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500"
                    value={newRate.price} onChange={(e) => setNewRate({...newRate, price: e.target.value})}
                  />
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500"
                    value={newRate.unit} onChange={(e) => setNewRate({...newRate, unit: e.target.value})}
                  >
                    <option value="m²">m²</option>
                    <option value="unité">unité</option>
                    <option value="ml">ml</option>
                    <option value="forfait">forfait</option>
                  </select>
                </div>
                <input 
                  type="text" placeholder="Catégorie (ex: Peinture)" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500"
                  value={newRate.category} onChange={(e) => setNewRate({...newRate, category: e.target.value})}
                />
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsAdding(false)}>Annuler</Button>
                <Button className="flex-1" onClick={handleAddRate}>Enregistrer</Button>
              </div>
            </div>
          </div>
        )}

        <div className="glass-card rounded-3xl overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-slate-500">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-amber-500" />
              Chargement de vos tarifs...
            </div>
          ) : (
            <>
              <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-4">
                <Search className="w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Rechercher une prestation..." 
                  className="bg-transparent border-none focus:outline-none text-white w-full"
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-500 text-sm uppercase tracking-wider">
                      <th className="px-8 py-6 font-medium">Prestation</th>
                      <th className="px-8 py-6 font-medium">Catégorie</th>
                      <th className="px-8 py-6 font-medium">Unité</th>
                      <th className="px-8 py-6 font-medium">Prix Unitaire HT</th>
                      <th className="px-8 py-6 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {rates.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-12 text-center text-slate-500 italic">
                          Aucun tarif enregistré. Commencez par en ajouter un !
                        </td>
                      </tr>
                    ) : (
                      rates.map((rate) => (
                        <tr key={rate.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-8 py-6 text-white font-medium">{rate.label}</td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold uppercase tracking-wider">
                              {rate.category || "Général"}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-slate-400">{rate.unit}</td>
                          <td className="px-8 py-6 text-white font-bold">{rate.unit_price_ht} €</td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteRate(rate.id)}
                                className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
