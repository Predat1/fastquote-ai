"use client";

import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 10, color: "#1e293b" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40 },
  title: { fontSize: 24, fontWeight: "bold", color: "#020617", marginBottom: 10 },
  section: { marginBottom: 20 },
  label: { fontSize: 8, color: "#64748b", textTransform: "uppercase", marginBottom: 4 },
  info: { fontSize: 10, marginBottom: 2 },
  table: { marginTop: 20 },
  tableHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#e2e8f0", paddingBottom: 8, marginBottom: 8 },
  tableRow: { flexDirection: "row", paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: "#f1f5f9" },
  colLabel: { flex: 4 },
  colQty: { flex: 1, textAlign: "right" },
  colUnit: { flex: 1, textAlign: "right" },
  colPrice: { flex: 1.5, textAlign: "right" },
  colTotal: { flex: 1.5, textAlign: "right", fontWeight: "bold" },
  totalSection: { marginTop: 30, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", justifyContent: "flex-end", paddingVertical: 4 },
  totalLabel: { width: 100, textAlign: "right", color: "#64748b" },
  totalValue: { width: 100, textAlign: "right", fontWeight: "bold", fontSize: 12 },
  footer: { position: "absolute", bottom: 40, left: 40, right: 40, borderTopWidth: 0.5, borderTopColor: "#e2e8f0", pt: 10, fontSize: 8, color: "#94a3b8", textAlign: "center" }
});

export const QuotePDF = ({ quote, profile }: { quote: any, profile: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>DEVIS</Text>
          <Text style={styles.info}>N° {quote.id.substring(0, 8).toUpperCase()}</Text>
          <Text style={styles.info}>Date : {new Date().toLocaleDateString("fr-FR")}</Text>
        </View>
        <View style={{ textAlign: "right" }}>
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>{profile.business_name || "Votre Entreprise"}</Text>
          <Text style={styles.info}>{profile.address || "Adresse non renseignée"}</Text>
          <Text style={styles.info}>SIRET : {profile.siret || "N/A"}</Text>
        </View>
      </View>

      {/* Client Info */}
      <View style={styles.section}>
        <Text style={styles.label}>Client</Text>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>{quote.client_name}</Text>
        <Text style={styles.info}>{quote.client_address}</Text>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colLabel}>Désignation</Text>
          <Text style={styles.colQty}>Qté</Text>
          <Text style={styles.colUnit}>Unité</Text>
          <Text style={styles.colPrice}>P.U. HT</Text>
          <Text style={styles.colTotal}>Total HT</Text>
        </View>
        {quote.items.map((item: any, i: number) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.colLabel}>{item.label}</Text>
            <Text style={styles.colQty}>{item.qty}</Text>
            <Text style={styles.colUnit}>{item.unit}</Text>
            <Text style={styles.colPrice}>{item.unit_price_ht} €</Text>
            <Text style={styles.colTotal}>{item.total_ht || item.qty * item.unit_price_ht} €</Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total HT</Text>
          <Text style={styles.totalValue}>{quote.total_ht} €</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TVA (20%)</Text>
          <Text style={styles.totalValue}>{(quote.total_ht * 0.2).toFixed(2)} €</Text>
        </View>
        <View style={[styles.totalRow, { marginTop: 10, borderTopWidth: 1, borderTopColor: "#e2e8f0", paddingTop: 10 }]}>
          <Text style={[styles.totalLabel, { fontSize: 14, color: "#020617" }]}>TOTAL TTC</Text>
          <Text style={[styles.totalValue, { fontSize: 16, color: "#fbbf24" }]}>{(quote.total_ht * 1.2).toFixed(2)} €</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Devis valable 30 jours. Auto-entrepreneur non assujetti à la TVA (si applicable). 
        Merci de votre confiance.
      </Text>
    </Page>
  </Document>
);
