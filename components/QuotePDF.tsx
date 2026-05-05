"use client";

import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Helvetica", fontSize: 9, color: "#334155" },
  
  // Accent bar on the left
  accentBar: { position: "absolute", left: 0, top: 0, bottom: 0, width: 6, backgroundColor: "#fbbf24" },
  
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 60 },
  brand: { fontSize: 28, fontWeight: "bold", color: "#0f172a", letterSpacing: -1 },
  quoteLabel: { fontSize: 10, color: "#fbbf24", fontWeight: "bold", marginTop: 5, textTransform: "uppercase" },
  
  metaBox: { textAlign: "right" },
  metaTitle: { fontSize: 14, fontWeight: "bold", color: "#0f172a", marginBottom: 4 },
  metaText: { fontSize: 9, color: "#64748b", marginBottom: 2 },

  section: { flexDirection: "row", marginBottom: 40, gap: 40 },
  infoCol: { flex: 1 },
  infoLabel: { fontSize: 7, color: "#94a3b8", textTransform: "uppercase", marginBottom: 6, fontWeight: "bold" },
  infoValue: { fontSize: 10, color: "#1e293b", fontWeight: "bold" },
  infoSub: { fontSize: 9, color: "#64748b", marginTop: 2 },

  table: { marginTop: 10 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f8fafc", padding: 10, borderRadius: 4, marginBottom: 5 },
  tableHeaderText: { fontSize: 7, color: "#64748b", textTransform: "uppercase", fontWeight: "bold" },
  
  tableRow: { flexDirection: "row", padding: 10, borderBottomWidth: 0.5, borderBottomColor: "#f1f5f9", alignItems: "center" },
  colDesc: { flex: 5 },
  colQty: { flex: 1, textAlign: "center" },
  colPrice: { flex: 2, textAlign: "right" },
  colTotal: { flex: 2, textAlign: "right", fontWeight: "bold", color: "#0f172a" },

  summaryContainer: { flexDirection: "row", justifyContent: "flex-end", marginTop: 40 },
  summaryBox: { width: 200, backgroundColor: "#f8fafc", padding: 20, borderRadius: 12 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  summaryTotal: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, borderTopWidth: 1, borderTopColor: "#e2e8f0", paddingTop: 12 },
  totalText: { fontSize: 14, fontWeight: "bold", color: "#fbbf24" },

  legal: { position: "absolute", bottom: 40, left: 50, right: 50, textAlign: "center", color: "#94a3b8", fontSize: 7, lineHeight: 1.5 }
});

export const QuotePDF = ({ quote, profile }: { quote: any, profile: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.accentBar} />
      
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>{profile.business_name || "FASTQUOTE AI"}</Text>
          <Text style={styles.quoteLabel}>Document Officiel : Devis de Travaux</Text>
        </View>
        <View style={styles.metaBox}>
          <Text style={styles.metaTitle}>Devis N°{quote.id.substring(0, 8).toUpperCase()}</Text>
          <Text style={styles.metaText}>Émis le {new Date().toLocaleDateString("fr-FR")}</Text>
          <Text style={styles.metaText}>Valable 30 jours</Text>
        </View>
      </View>

      {/* Parties Section */}
      <View style={styles.section}>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Prestataire</Text>
          <Text style={styles.infoValue}>{profile.business_name || "Artisan Partenaire"}</Text>
          <Text style={styles.infoSub}>{profile.address || "Adresse non définie"}</Text>
          <Text style={styles.infoSub}>SIRET : {profile.siret || "N/A"}</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Destinataire</Text>
          <Text style={styles.infoValue}>{quote.client_name}</Text>
          <Text style={styles.infoSub}>{quote.client_address || "Lieu des travaux"}</Text>
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colDesc]}>Description des Prestations</Text>
          <Text style={[styles.tableHeaderText, styles.colQty]}>Qté</Text>
          <Text style={[styles.tableHeaderText, styles.colPrice]}>Prix U. HT</Text>
          <Text style={[styles.tableHeaderText, styles.colTotal]}>Montant HT</Text>
        </View>

        {quote.items.map((item: any, i: number) => (
          <View key={i} style={styles.tableRow}>
            <View style={styles.colDesc}>
              <Text style={{ fontSize: 10, color: "#1e293b", fontWeight: "bold" }}>{item.label}</Text>
              <Text style={{ fontSize: 8, color: "#64748b", marginTop: 2 }}>Prestation forfaitaire réalisée selon les règles de l'art.</Text>
            </View>
            <Text style={styles.colQty}>{item.qty} {item.unit}</Text>
            <Text style={styles.colPrice}>{item.unit_price_ht} €</Text>
            <Text style={styles.colTotal}>{item.total_ht || item.qty * item.unit_price_ht} €</Text>
          </View>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={{ color: "#64748b" }}>Total HT</Text>
            <Text style={{ fontWeight: "bold" }}>{quote.total_ht} €</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{ color: "#64748b" }}>TVA (20%)</Text>
            <Text style={{ fontWeight: "bold" }}>{(quote.total_ht * 0.2).toFixed(2)} €</Text>
          </View>
          <View style={styles.summaryTotal}>
            <Text style={{ fontSize: 11, fontWeight: "bold" }}>TOTAL TTC</Text>
            <Text style={styles.totalText}>{(quote.total_ht * 1.2).toFixed(2)} €</Text>
          </View>
        </View>
      </View>

      {/* Legal Footer */}
      <View style={styles.legal}>
        <Text>TVA non applicable, art. 293 B du CGI (si applicable). Paiement par virement bancaire ou chèque.</Text>
        <Text>En signant ce devis, le client accepte les conditions générales de vente consultables sur demande.</Text>
        <Text style={{ marginTop: 10, fontWeight: "bold", color: "#1e293b" }}>Document généré par FastQuote AI</Text>
      </View>
    </Page>
  </Document>
);
