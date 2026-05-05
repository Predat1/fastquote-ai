import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Link from "next/link";
import { Camera, Mic, FileText, Zap, Shield, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden md:pt-48 md:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-24 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-24 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container px-6 mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
            Votre devis BTP en <br />
            <span className="gradient-text">10 minutes</span> avec l'IA
          </h1>
          <p className="max-w-2xl mx-auto mt-8 text-lg text-slate-400 md:text-xl">
            Gagnez vos chantiers sur place. Prenez des photos, parlez ou tapez, 
            et laissez l'IA générer un devis professionnel prêt à être signé.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mt-12 md:flex-row">
            <Link href="/create" className="w-full md:w-auto">
              <Button size="lg" className="w-full">
                Créer mon premier devis
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full md:w-auto">
              Voir une démo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-950/50">
        <div className="container px-6 mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Camera className="w-8 h-8 text-amber-500" />,
                title: "Analyse Photo",
                description: "L'IA identifie les matériaux et estime les surfaces directement depuis vos photos."
              },
              {
                icon: <Mic className="w-8 h-8 text-amber-500" />,
                title: "Dictée Vocale",
                description: "Parlez naturellement, l'IA traduit votre jargon en lignes de devis professionnelles."
              },
              {
                icon: <FileText className="w-8 h-8 text-amber-500" />,
                title: "PDF Conforme",
                description: "Générez des documents premium incluant toutes les mentions légales obligatoires."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 glass-card rounded-3xl group hover:border-amber-500/50 transition-all">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-20">
        <div className="container px-6 mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {[
              { label: "Temps gagné / jour", value: "2h" },
              { label: "Taux de conversion", value: "+40%" },
              { label: "Artisans satisfaits", value: "500+" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-white md:text-5xl">{stat.value}</div>
                <div className="mt-2 text-sm font-medium uppercase tracking-widest text-amber-500/60">{stat.label}</div>
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
