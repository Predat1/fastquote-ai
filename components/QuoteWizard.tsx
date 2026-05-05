"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Mic, Type, ArrowRight, ArrowLeft, Check, Plus, Trash2, Loader2, Download, Share2 } from "lucide-react";
import Button from "./Button";
import { createClient } from "@/utils/supabase/client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { QuotePDF } from "./QuotePDF";

type Step = "photos" | "description" | "review" | "finalize";

export default function QuoteWizard() {
  const [step, setStep] = useState<Step>("photos");
  const [inputType, setInputType] = useState<"voice" | "text">("voice");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [totalHt, setTotalHt] = useState(0);
  const [profile, setProfile] = useState<any>(null);
  const [finalizedQuote, setFinalizedQuote] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(data);
    }
  }

  const nextStep = () => {
    if (step === "photos") setStep("description");
    else if (step === "description") generateQuote();
    else if (step === "review") finalizeQuote();
  };

  const prevStep = () => {
    if (step === "description") setStep("photos");
    else if (step === "review") setStep("description");
    else if (step === "finalize") setStep("review");
  };

  async function generateQuote() {
    if (!description) return alert("Veuillez décrire les travaux.");
    setLoading(true);
    try {
      const { data: priceBook } = await supabase.from("price_book").select("*");
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
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function finalizeQuote() {
    if (!clientName) return alert("Veuillez saisir le nom du client.");
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const quoteData = {
        user_id: user?.id,
        client_name: clientName,
        items,
        total_ht: totalHt,
        status: "finalized"
      };

      const { data, error } = await supabase.from("quotes").insert([quoteData]).select().single();
      if (!error) {
        setFinalizedQuote(data);
        setStep("finalize");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const shareOnWhatsApp = () => {
    const text = `Bonjour ${clientName}, voici votre devis pour les travaux : ${totalHt}€ HT. Vous pouvez le consulter en pièce jointe.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex justify-between mb-12 px-4">
        {(["photos", "description", "review", "finalize"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center border-4 transition-all ${
                step === s ? "border-primary bg-primary/20 text-primary shadow-[0_0_15px_rgba(251,191,36,0.3)]" : 
                i < ["photos", "description", "review", "finalize"].indexOf(step) ? "border-green-500 bg-green-500 text-white" : "border-white/10 text-white/30"
              }`}
            >
              {i < ["photos", "description", "review", "finalize"].indexOf(step) ? <Check className="w-6 h-6" strokeWidth={3} /> : <span className="font-black text-lg">{i + 1}</span>}
            </div>
            {i < 3 && <div className={`flex-1 h-2 mx-2 rounded-full overflow-hidden ${i < ["photos", "description", "review", "finalize"].indexOf(step) ? "bg-green-500" : "bg-white/5"}`}>
               {i === ["photos", "description", "review", "finalize"].indexOf(step) && <div className="h-full w-full construction-pattern opacity-50 animate-pulse" />}
            </div>}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "photos" && (
          <motion.div key="photos" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-12 rounded-3xl text-center">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-10 h-10 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Prenez des photos</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="aspect-square border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50">
                <Plus className="w-8 h-8 text-white/20 mb-2" />
                <span className="text-xs text-white/40">Ajouter photo</span>
              </div>
            </div>
            <Button onClick={nextStep} className="w-full">Continuer</Button>
          </motion.div>
        )}

        {step === "description" && (
          <motion.div key="description" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-12 rounded-3xl">
            <div className="flex justify-center gap-4 mb-8 p-1 bg-white/5 rounded-xl w-fit mx-auto">
              <button onClick={() => setInputType("voice")} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${inputType === "voice" ? "bg-amber-500 text-slate-950 font-bold" : "text-white/50"}`}><Mic className="w-4 h-4" /> Voix</button>
              <button onClick={() => setInputType("text")} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${inputType === "text" ? "bg-amber-500 text-slate-950 font-bold" : "text-white/50"}`}><Type className="w-4 h-4" /> Texte</button>
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-8">Description des travaux</h2>
            {inputType === "voice" ? (
              <div className="text-center">
                <motion.button animate={isRecording ? { scale: [1, 1.1, 1] } : {}} transition={{ repeat: Infinity, duration: 1.5 }} onClick={() => setIsRecording(!isRecording)} className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 ${isRecording ? "bg-red-500" : "bg-amber-500"}`}><Mic className="w-12 h-12 text-slate-950" /></motion.button>
              </div>
            ) : (
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Décrivez les travaux..." className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-white mb-8 focus:border-amber-500 outline-none" />
            )}
            <div className="flex gap-4">
              <Button variant="outline" onClick={prevStep} className="flex-1">Retour</Button>
              <Button onClick={nextStep} disabled={loading} className="flex-1">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Générer"}
              </Button>
            </div>
          </motion.div>
        )}

        {step === "review" && (
          <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-12 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Détails du Devis</h2>
            <div className="mb-8">
              <input type="text" placeholder="Nom du client" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white mb-6 focus:border-amber-500 outline-none" />
              <div className="space-y-4">
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-white">{item.label}</div>
                    <div className="text-amber-500 font-bold">{item.total_ht || item.qty * item.unit_price_ht}€</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center p-6 bg-amber-500/10 rounded-2xl mb-8">
              <span className="text-white font-bold">Total HT</span>
              <span className="text-2xl font-bold text-amber-500">{totalHt}€</span>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={prevStep} className="flex-1">Retour</Button>
              <Button onClick={nextStep} disabled={loading} className="flex-1">Finaliser</Button>
            </div>
          </motion.div>
        )}

        {step === "finalize" && (
          <motion.div key="finalize" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-12 rounded-3xl text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Devis Finalisé !</h2>
            <p className="text-slate-400 mb-12">Votre devis a été enregistré avec succès.</p>
            
            <div className="flex flex-col gap-4">
              <PDFDownloadLink document={<QuotePDF quote={finalizedQuote} profile={profile || {}} />} fileName={`Devis_${clientName}.pdf`}>
                {({ loading }) => (
                  <Button className="w-full gap-2" disabled={loading}>
                    <Download className="w-5 h-5" />
                    {loading ? "Préparation..." : "Télécharger le PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
              
              <Button variant="outline" className="w-full gap-2 text-green-500 border-green-500/20" onClick={shareOnWhatsApp}>
                <Share2 className="w-5 h-5" />
                Partager sur WhatsApp
              </Button>
              
              <Button variant="ghost" onClick={() => window.location.href = "/"} className="mt-4">Retour à l'accueil</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
