"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";

export default function RatesPage() {
  const [rates, setRates] = useState([
    { id: 1, label: "Peinture murale (2 couches)", unit: "m²", price: 28, category: "Peinture" },
    { id: 2, label: "Pose carrelage 60x60", unit: "m²", price: 45, category: "Carrelage" },
    { id: 3, label: "Installation robinetterie", unit: "unité", price: 120, category: "Plomberie" },
    { id: 4, label: "Dépose de cloison", unit: "m²", price: 22, category: "Démolition" },
  ]);

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <Navbar />
      
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Ma Bibliothèque de Prix</h1>
            <p className="text-slate-400">Gérez vos tarifs pour des devis ultra-rapides.</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-5 h-5" /> Ajouter un tarif
          </Button>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden">
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
                {rates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6 text-white font-medium">{rate.label}</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold uppercase tracking-wider">
                        {rate.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-400">{rate.unit}</td>
                    <td className="px-8 py-6 text-white font-bold">{rate.price} €</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
