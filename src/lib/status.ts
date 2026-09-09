import type { StatutColis, StatutDevis } from "@prisma/client";

export const STATUT_COLIS_LABELS: Record<StatutColis, string> = {
  EN_ATTENTE: "En attente de prise en charge",
  PRIS_EN_CHARGE: "Colis pris en charge",
  EN_TRANSIT: "En transit",
  EN_LIVRAISON: "En cours de livraison",
  LIVRE: "Livré",
  ECHEC_LIVRAISON: "Échec de livraison",
  ANNULE: "Annulé",
};

export const STATUT_COLIS_ORDER: StatutColis[] = [
  "EN_ATTENTE",
  "PRIS_EN_CHARGE",
  "EN_TRANSIT",
  "EN_LIVRAISON",
  "LIVRE",
];

export const STATUT_COLIS_COLORS: Record<StatutColis, string> = {
  EN_ATTENTE: "bg-slate-100 text-slate-700 border-slate-300",
  PRIS_EN_CHARGE: "bg-sky-100 text-sky-700 border-sky-300",
  EN_TRANSIT: "bg-blue-100 text-blue-700 border-blue-300",
  EN_LIVRAISON: "bg-amber-100 text-amber-700 border-amber-300",
  LIVRE: "bg-emerald-100 text-emerald-700 border-emerald-300",
  ECHEC_LIVRAISON: "bg-red-100 text-red-700 border-red-300",
  ANNULE: "bg-red-100 text-red-700 border-red-300",
};

export const STATUT_DEVIS_LABELS: Record<StatutDevis, string> = {
  NOUVEAU: "Nouveau",
  EN_COURS: "En cours de traitement",
  TRAITE: "Traité",
  REFUSE: "Refusé",
};

export const STATUT_DEVIS_COLORS: Record<StatutDevis, string> = {
  NOUVEAU: "bg-blue-100 text-blue-700 border-blue-300",
  EN_COURS: "bg-amber-100 text-amber-700 border-amber-300",
  TRAITE: "bg-emerald-100 text-emerald-700 border-emerald-300",
  REFUSE: "bg-red-100 text-red-700 border-red-300",
};
