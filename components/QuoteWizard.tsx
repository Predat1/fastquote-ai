"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Mic, Type, ArrowRight, ArrowLeft, Check, Plus, Trash2, Loader2 } from "lucide-react";
import Button from "./Button";
import { createClient } from "@/utils/supabase/client";

type Step = "photos" | "description" | "review" | "finalize";

export default function QuoteWizard() {
  const [step, setStep] = useState<Step>("photos");
  const [inputType, setInputType] = useState<"voice" | "text">("voice");
  const [description, setDescription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [totalHt, setTotalHt] = useState(0);

  const supabase = createClient();

  const nextStep = () => {
    if (step === "photos") setStep("description");
    else if (step === "description") generateQuote();
    else if (step === "review") setStep("finalize");
  };

  const prevStep = () => {
    if (step === "description") setStep("photos");
    else if (step === "review") setStep("description");
    else if (step === "finalize") setStep("review");
  };

  async function generateQuote() {
    setLoading(true);
    try {
      // 1. Récupérer le catalogue de prix de l'utilisateur
      const { data: priceBook } = await supabase.from("price_book").select("*");

      // 2. Appeler l'API OpenRouter
      const response = await fetch("/api/generate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, priceBook }),
      });

      const data = await response.json();
      if (data.items) {
        setItems(data.items);
        setTotalHt(data.total_ht);
        setStep("review");
      }
    } catch (error) {
      console.error("Erreur génération devis:", error);
      alert("Une erreur est survenue lors de la génération du devis.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex justify-between mb-12">
        {(["photos", "description", "review", "finalize"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                step === s ? "border-amber-500 bg-amber-500/10 text-amber-500" : 
                i < ["photos", "description", "review", "finalize"].indexOf(step) ? "border-green-500 bg-green-500 text-white" : "border-white/10 text-white/30"
              }`}
            >
              {i < ["photos", "description", "review", "finalize"].indexOf(step) ? <Check className="w-5 h-5" /> : i + 1}
            </div>
            {i < 3 && <div className={`w-12 h-0.5 mx-2 ${i < ["photos", "description", "review", "finalize"].indexOf(step) ? "bg-green-500" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "photos" && (
          <motion.div
            key="photos"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-12 rounded-3xl text-center"
          >
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-10 h-10 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Prenez des photos du chantier</h2>
            <p className="text-slate-400 mb-8">Plus l'IA voit de détails, plus le devis sera précis.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="aspect-square border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-all">
                <Plus className="w-8 h-8 text-white/20 mb-2" />
                <span className="text-xs text-white/40">Ajouter photo</span>
              </div>
            </div>

            <Button onClick={nextStep} className="w-full">Continuer</Button>
          </motion.div>
        )}

        {step === "description" && (
          <motion.div
            key="description"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-12 rounded-3xl"
          >
            <div className="flex justify-center gap-4 mb-8 p-1 bg-white/5 rounded-xl w-fit mx-auto">
              <button 
                onClick={() => setInputType("voice")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${inputType === "voice" ? "bg-amber-500 text-slate-950 font-bold" : "text-white/50 hover:text-white"}`}
              >
                <Mic className="w-4 h-4" /> Voix
              </button>
              <button 
                onClick={() => setInputType("text")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${inputType === "text" ? "bg-amber-500 text-slate-950 font-bold" : "text-white/50 hover:text-white"}`}
              >
                <Type className="w-4 h-4" /> Texte
              </button>
            </div>

            <h2 className="text-2xl font-bold text-white text-center mb-8">Décrivez les travaux</h2>

            {inputType === "voice" ? (
              <div className="text-center">
                <motion.button
                  animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 transition-all ${isRecording ? "bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]" : "bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)]"}`}
                >
                  <Mic className={`w-12 h-12 ${isRecording ? "text-white" : "text-slate-950"}`} />
                </motion.button>
                <p className="text-slate-400">{isRecording ? "L'IA vous écoute..." : "Appuyez pour commencer à parler"}</p>
              </div>
            ) : (
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Pose de carrelage 60x60, environ 15m2 avec ragréage..."
                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-amber-500 transition-all mb-8"
              />
            )}

            <div className="flex gap-4 mt-8">
              <Button variant="outline" onClick={prevStep} className="flex-1">Retour</Button>
              <Button onClick={nextStep} disabled={loading} className="flex-1 gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? "Génération..." : "Générer le devis"}
              </Button>
            </div>
          </motion.div>
        )}

        {step === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-12 rounded-3xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Révision des items</h2>
            <div className="space-y-4 mb-8">
              {items.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <div className="text-white font-medium">{item.label}</div>
                    <div className="text-xs text-white/40">{item.qty} {item.unit} x {item.unit_price_ht}€</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-amber-500 font-bold">{item.total_ht || item.qty * item.unit_price_ht}€</div>
                    <button className="text-white/20 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center p-6 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-8">
              <span className="text-white font-bold">Total HT</span>
              <span className="text-2xl font-bold text-amber-500">{totalHt}€</span>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={prevStep} className="flex-1">Retour</Button>
              <Button onClick={nextStep} className="flex-1">Finaliser</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
