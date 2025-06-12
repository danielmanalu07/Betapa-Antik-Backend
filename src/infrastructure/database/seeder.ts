import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma";

async function seeder() {
  const hashPassword = await bcrypt.hash("admin12345", 10);
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin seeded");
}

seeder().catch((e) => {
  console.error(e);
  process.exit(1);
});
