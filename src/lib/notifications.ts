import type { Parcel, StatutColis } from "@prisma/client";
import { sendMail } from "@/lib/mail";
import { STATUT_COLIS_LABELS } from "@/lib/status";

const appUrl = process.env.APP_URL || "http://localhost:3000";

export async function sendParcelStatusEmail({
  to,
  parcel,
  status,
  location,
  note,
}: {
  to: string;
  parcel: Pick<Parcel, "trackingNumber" | "recipientName">;
  status: StatutColis;
  location?: string | null;
  note?: string | null;
}) {
  const statusLabel = STATUT_COLIS_LABELS[status];
  const trackingUrl = `${appUrl}/suivi?code=${parcel.trackingNumber}`;

  const subject = `Votre colis ${parcel.trackingNumber} : ${statusLabel}`;

  const text = [
    `Bonjour,`,
    ``,
    `Le statut de votre colis ${parcel.trackingNumber} a été mis à jour :`,
    `${statusLabel}`,
    location ? `Position actuelle : ${location}` : null,
    note ? `Note : ${note}` : null,
    ``,
    `Suivez votre colis en temps réel : ${trackingUrl}`,
    ``,
    `— L'équipe LivraisonExpress`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #0f1b2d;">
      <div style="background: #0b2545; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <span style="color: #ffffff; font-size: 18px; font-weight: bold;">
          Livraison<span style="color: #ff6a3d;">Express</span>
        </span>
      </div>
      <div style="border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; padding: 24px;">
        <p>Bonjour${parcel.recipientName ? " " + parcel.recipientName : ""},</p>
        <p>Le statut de votre colis <strong>${parcel.trackingNumber}</strong> vient d'être mis à jour :</p>
        <p style="display: inline-block; background: #fff1ea; color: #e2551f; font-weight: 600; padding: 8px 14px; border-radius: 999px; margin: 8px 0;">
          ${statusLabel}
        </p>
        ${location ? `<p>📍 Position actuelle : <strong>${location}</strong></p>` : ""}
        ${note ? `<p style="color: #475569;">${note}</p>` : ""}
        <p style="margin-top: 24px;">
          <a href="${trackingUrl}" style="background: #ff6a3d; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 10px; font-weight: 600;">
            Suivre mon colis
          </a>
        </p>
        <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">
          — L'équipe LivraisonExpress
        </p>
      </div>
    </div>
  `;

  await sendMail({ to, subject, html, text });
}
