"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateTrackingNumber } from "@/lib/tracking";
import { sendParcelStatusEmail } from "@/lib/notifications";
import type { StatutColis } from "@prisma/client";

export type ActionState = {
  error?: string;
  success?: boolean;
  trackingNumber?: string;
};

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Access denied: administrators only.");
  }
  return session;
}

const createParcelSchema = z.object({
  senderName: z.string().min(2, "Sender name is required"),
  senderAddress: z.string().min(5, "Sender address is required"),
  recipientName: z.string().min(2, "Recipient name is required"),
  recipientAddress: z.string().min(5, "Recipient address is required"),
  recipientPhone: z.string().optional(),
  description: z.string().optional(),
  weightKg: z.string().optional(),
  clientEmail: z.string().optional(),
  estimatedDelivery: z.string().optional(),
});

export async function createParcelAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const parsed = createParcelSchema.safeParse({
    senderName: formData.get("senderName"),
    senderAddress: formData.get("senderAddress"),
    recipientName: formData.get("recipientName"),
    recipientAddress: formData.get("recipientAddress"),
    recipientPhone: formData.get("recipientPhone") || undefined,
    description: formData.get("description") || undefined,
    weightKg: formData.get("weightKg") || undefined,
    clientEmail: formData.get("clientEmail") || undefined,
    estimatedDelivery: formData.get("estimatedDelivery") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  let clientId: string | undefined;
  if (data.clientEmail) {
    const client = await prisma.user.findUnique({ where: { email: data.clientEmail } });
    if (client) clientId = client.id;
  }

  const trackingNumber = generateTrackingNumber();

  const parcel = await prisma.parcel.create({
    data: {
      trackingNumber,
      senderName: data.senderName,
      senderAddress: data.senderAddress,
      recipientName: data.recipientName,
      recipientAddress: data.recipientAddress,
      recipientPhone: data.recipientPhone,
      notifyEmail: data.clientEmail,
      description: data.description,
      weightKg: data.weightKg ? parseFloat(data.weightKg) : undefined,
      estimatedDelivery: data.estimatedDelivery ? new Date(data.estimatedDelivery) : undefined,
      clientId,
      events: {
        create: {
          status: "EN_ATTENTE",
          note: "Package registered in the system.",
        },
      },
    },
  });

  if (parcel.notifyEmail) {
    await sendParcelStatusEmail({
      to: parcel.notifyEmail,
      parcel,
      status: "EN_ATTENTE",
      note: "Your package has been registered in our system.",
    });
  }

  revalidatePath("/admin/colis");
  return { success: true, trackingNumber: parcel.trackingNumber };
}

const addEventSchema = z.object({
  parcelId: z.string().min(1),
  status: z.string().min(1),
  location: z.string().optional(),
  note: z.string().optional(),
});

export async function addTrackingEventAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const parsed = addEventSchema.safeParse({
    parcelId: formData.get("parcelId"),
    status: formData.get("status"),
    location: formData.get("location") || undefined,
    note: formData.get("note") || undefined,
  });

  if (!parsed.success) {
    return { error: "Invalid data." };
  }

  const { parcelId, status, location, note } = parsed.data;

  const parcel = await prisma.parcel.update({
    where: { id: parcelId },
    data: {
      status: status as StatutColis,
      currentLocation: location,
      events: {
        create: {
          status: status as StatutColis,
          location,
          note,
        },
      },
    },
    include: { client: true },
  });

  const recipientEmail = parcel.notifyEmail || parcel.client?.email;
  if (recipientEmail) {
    await sendParcelStatusEmail({
      to: recipientEmail,
      parcel,
      status: status as StatutColis,
      location,
      note,
    });
  }

  revalidatePath(`/admin/colis/${parcelId}`);
  revalidatePath("/admin/colis");
  return { success: true };
}
