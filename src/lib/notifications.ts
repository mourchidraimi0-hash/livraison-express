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

  const subject = `Your package ${parcel.trackingNumber}: ${statusLabel}`;

  const text = [
    `Hello,`,
    ``,
    `The status of your package ${parcel.trackingNumber} has been updated:`,
    `${statusLabel}`,
    location ? `Current location: ${location}` : null,
    note ? `Note: ${note}` : null,
    ``,
    `Track your package in real time: ${trackingUrl}`,
    ``,
    `— The LivraisonExpress team`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #0f1b2d;">
      <div style="background: #0b2545; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <span style="color: #ffffff; font-size: 18px; font-weight: bold;">
          Livraison<span style="color: #ec0f7b;">Express</span>
        </span>
      </div>
      <div style="border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; padding: 24px;">
        <p>Hello${parcel.recipientName ? " " + parcel.recipientName : ""},</p>
        <p>The status of your package <strong>${parcel.trackingNumber}</strong> has just been updated:</p>
        <p style="display: inline-block; background: #fce7f3; color: #c40a66; font-weight: 600; padding: 8px 14px; border-radius: 999px; margin: 8px 0;">
          ${statusLabel}
        </p>
        ${location ? `<p>📍 Current location: <strong>${location}</strong></p>` : ""}
        ${note ? `<p style="color: #475569;">${note}</p>` : ""}
        <p style="margin-top: 24px;">
          <a href="${trackingUrl}" style="background: #ec0f7b; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 10px; font-weight: 600;">
            Track My Package
          </a>
        </p>
        <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">
          — The LivraisonExpress team
        </p>
      </div>
    </div>
  `;

  await sendMail({ to, subject, html, text });
}
