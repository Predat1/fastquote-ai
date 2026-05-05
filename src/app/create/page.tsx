import Navbar from "@/components/Navbar";
import QuoteWizard from "@/components/QuoteWizard";

export default function CreateQuote() {
  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container px-6 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Nouveau Devis</h1>
          <p className="text-slate-400">Suivez les étapes pour générer votre document professionnel.</p>
        </div>
        
        <QuoteWizard />
      </div>
    </main>
  );
}
