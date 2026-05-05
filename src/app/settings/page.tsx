"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { Save, Building2, MapPin, Hash, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    business_name: "",
    siret: "",
    address: "",
  });

  const supabase = createClient();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (data) setProfile(data);
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          business_name: profile.business_name,
          siret: profile.siret,
          address: profile.address,
          updated_at: new Date().toISOString(),
        });

      if (error) alert("Erreur lors de la sauvegarde");
      else alert("Profil mis à jour !");
    }
    setSaving(false);
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
    </div>
  );

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <Navbar />
      
      <div className="container px-6 mx-auto max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Mon Entreprise</h1>
          <p className="text-slate-400">Ces informations apparaîtront sur vos devis officiels.</p>
        </div>

        <div className="glass-card p-10 rounded-3xl space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Nom de l'entreprise
              </label>
              <input 
                type="text" 
                value={profile.business_name}
                onChange={(e) => setProfile({...profile, business_name: e.target.value})}
                placeholder="Ex: ABC Rénovation"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-amber-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Hash className="w-4 h-4" /> Numéro SIRET
              </label>
              <input 
                type="text" 
                value={profile.siret}
                onChange={(e) => setProfile({...profile, siret: e.target.value})}
                placeholder="123 456 789 00012"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-amber-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Adresse du siège
              </label>
              <textarea 
                value={profile.address}
                onChange={(e) => setProfile({...profile, address: e.target.value})}
                placeholder="Ex: 12 rue de la Paix, 75000 Paris"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-amber-500 transition-all h-32"
              />
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="w-full py-6 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saving ? "Sauvegarde en cours..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </div>
    </main>
  );
}
