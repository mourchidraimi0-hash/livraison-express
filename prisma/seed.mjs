import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@livraisonexpress.fr";
  const adminPassword = "admin123";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Administrateur",
        email: adminEmail,
        phone: "+212500000000",
        passwordHash: await bcrypt.hash(adminPassword, 10),
        role: "ADMIN",
      },
    });
    console.log(`Compte admin créé : ${adminEmail} / ${adminPassword}`);
  } else {
    console.log("Compte admin déjà existant, aucune action.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
