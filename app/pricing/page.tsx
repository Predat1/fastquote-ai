"use client";

import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { Check, Zap, Building, Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
  const plans = [
    {
      name: "Artisan",
      price: "29€",
      desc: "Idéal pour les indépendants et auto-entrepreneurs.",
      icon: <Zap className="w-8 h-8" />,
      features: ["10 devis / mois", "Analyse vocale illimitée", "Export PDF Standard", "Support par email"],
      color: "border-slate-800"
    },
    {
      name: "PME Pro",
      price: "79€",
      desc: "Pour les entreprises en croissance.",
      icon: <Building className="w-8 h-8" />,
      features: ["Devis illimités", "Analyse Photo Vision", "Profils Multi-Artisans", "Partage WhatsApp direct", "Support Prioritaire"],
      popular: true,
      color: "border-primary"
    },
    {
      name: "Grand Compte",
      price: "Sur mesure",
      desc: "Solutions personnalisées pour flottes de chantiers.",
      icon: <Crown className="w-8 h-8" />,
      features: ["API Dédiée", "Marque Blanche", "Intégration ERP/BIM", "Account Manager dédié"],
      color: "border-slate-800"
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 construction-pattern">
      <Navbar />
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic mb-6">Investissez dans <br /><span className="text-primary">Votre Temps</span></h1>
          <p className="text-slate-400 text-lg">Choisissez le plan qui correspond à la taille de vos chantiers. Pas de frais cachés.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 glass-card rounded-3xl border-4 ${plan.color} relative flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1 font-black uppercase text-xs tracking-[0.2em] rounded-full shadow-lg">
                  Plus Populaire
                </div>
              )}
              
              <div className="mb-8 text-primary">{plan.icon}</div>
              <h3 className="text-3xl font-black text-white uppercase italic mb-2">{plan.name}</h3>
              <p className="text-slate-500 mb-8 text-sm">{plan.desc}</p>
              
              <div className="mb-10">
                <span className="text-5xl font-black text-white">{plan.price}</span>
                {plan.price !== "Sur mesure" && <span className="text-slate-500 ml-2">/ mois</span>}
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-300 font-bold text-sm">
                    <Check className="w-5 h-5 text-primary" strokeWidth={4} /> {feature}
                  </li>
                ))}
              </ul>

              <Button variant={plan.popular ? "primary" : "outline"} className="w-full">
                Choisir ce plan
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
