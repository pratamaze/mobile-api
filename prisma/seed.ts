import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        full_name: "John Doe",
        email: "john@example.com",
        
      },
    }),
    prisma.user.create({
      data: {
        full_name: "Jane Smith",
        email: "jane@example.com",
      },
    }),
    prisma.user.create({
      data: {
        full_name: "Bob Johnson",
        email: "bob@example.com",
      },
    }),
  ])

  console.log("✅ Created users:", users)
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
