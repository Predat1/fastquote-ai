import { NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": "https://fastquote-ai.vercel.app",
      "X-Title": "FastQuote AI",
    },
  });

  try {
    const { description, priceBook } = await req.json();

    const prompt = `
      Tu es un expert en chiffrage de travaux BTP. 
      Ton but est de transformer une description de travaux (texte ou transcription vocale) en une liste d'items de devis structurés.

      DESCRIPTION DES TRAVAUX :
      "${description}"

      CATALOGUE DE PRIX DE L'ARTISAN :
      ${JSON.stringify(priceBook, null, 2)}

      RÈGLES :
      1. Utilise uniquement les items présents dans le catalogue de prix si possible.
      2. Estime les quantités en te basant sur la description.
      3. Réponds UNIQUEMENT au format JSON comme ceci :
      {
        "items": [
          { "label": "Nom de la prestation", "qty": 10, "unit": "m2", "unit_price_ht": 25, "total_ht": 250 },
          ...
        ],
        "total_ht": 250
      }
    `;

    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet", // Modèle par défaut recommandé
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("OpenRouter Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
