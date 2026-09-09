"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { StatutDevis } from "@prisma/client";

export type ActionState = {
  error?: string;
  success?: boolean;
};

const quoteSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z.string().min(6, "Numéro de téléphone invalide"),
  pickupAddress: z.string().min(5, "Adresse d'enlèvement requise"),
  deliveryAddress: z.string().min(5, "Adresse de livraison requise"),
  packageDetails: z.string().min(5, "Merci de décrire votre colis"),
});

export async function createQuoteAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = quoteSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    pickupAddress: formData.get("pickupAddress"),
    deliveryAddress: formData.get("deliveryAddress"),
    packageDetails: formData.get("packageDetails"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const session = await getSession();

  await prisma.quoteRequest.create({
    data: {
      ...parsed.data,
      clientId: session?.userId,
    },
  });

  revalidatePath("/admin/devis");
  return { success: true };
}

const updateQuoteSchema = z.object({
  quoteId: z.string().min(1),
  status: z.string().min(1),
  adminNote: z.string().optional(),
});

export async function updateQuoteStatusAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { error: "Accès refusé." };
  }

  const parsed = updateQuoteSchema.safeParse({
    quoteId: formData.get("quoteId"),
    status: formData.get("status"),
    adminNote: formData.get("adminNote") || undefined,
  });

  if (!parsed.success) {
    return { error: "Données invalides." };
  }

  await prisma.quoteRequest.update({
    where: { id: parsed.data.quoteId },
    data: {
      status: parsed.data.status as StatutDevis,
      adminNote: parsed.data.adminNote,
    },
  });

  revalidatePath("/admin/devis");
  return { success: true };
}
