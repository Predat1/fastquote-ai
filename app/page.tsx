import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Link from "next/link";
import { Camera, Mic, FileText, Zap, Shield, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden construction-pattern">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="container px-6 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-black tracking-[0.2em] uppercase border-2 border-primary/20 bg-primary/5 text-primary rounded-lg">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary"></span>
              <span className="relative inline-flex w-2 h-2 rounded-full bg-primary"></span>
            </span>
            Technologie Chantier 2.0
          </div>

          <h1 className="text-6xl font-black tracking-tighter text-white md:text-8xl lg:text-9xl uppercase leading-[0.9]">
            Le Devis BTP <br />
            <span className="gradient-text">En 10 Minutes</span>
          </h1>
          
          <p className="max-w-2xl mx-auto mt-12 text-lg font-medium text-slate-400 md:text-xl leading-relaxed">
            Gagnez vos chantiers directement sur place. Prenez des photos, parlez ou tapez, 
            et laissez l'IA générer un chiffrage technique précis selon vos tarifs.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 mt-16 md:flex-row">
            <Link href="/create" className="w-full md:w-auto">
              <Button size="lg" className="w-full border-b-4 border-b-amber-700">
                Lancer un Devis
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full md:w-auto border-2">
              Démo Interactive
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 border-t border-white/5 bg-slate-950/20">
        <div className="container px-6 mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Camera className="w-10 h-10" />,
                title: "Analyse Visuelle",
                description: "Notre IA identifie les matériaux et calcule les surfaces sur vos photos de chantier."
              },
              {
                icon: <Mic className="w-10 h-10" />,
                title: "Dictée Technique",
                description: "Décrivez les travaux avec votre jargon métier, l'IA structure tout en lignes de devis."
              },
              {
                icon: <FileText className="w-10 h-10" />,
                title: "PDF Chantier",
                description: "Exportez des documents premium incluant logos et mentions légales, prêts pour signature."
              }
            ].map((feature, i) => (
              <div key={i} className="p-12 glass-card rounded-3xl border-l-8 border-l-primary group hover:bg-white/5 transition-all">
                <div className="mb-8 text-primary">{feature.icon}</div>
                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center">
            {[
              { label: "Temps gagné / jour", value: "2.5h" },
              { label: "Taux de signature", value: "+38%" },
              { label: "Précision de l'IA", value: "99%" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-black text-white md:text-7xl mb-4 italic tracking-tighter">{stat.value}</div>
                <div className="text-sm font-black uppercase tracking-[0.3em] text-primary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="container px-6 mx-auto text-center text-slate-500 text-sm">
          &copy; 2026 FastQuote AI. Tous droits réservés. Bâtissez l'avenir.
        </div>
      </footer>
    </main>
  );
}
