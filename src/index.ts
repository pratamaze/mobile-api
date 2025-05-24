import express from "express"
import { PrismaClient } from "@prisma/client"

const app = express()
const PORT = process.env.PORT || 3000
const prisma = new PrismaClient()

app.use(express.json())

// Health check
app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({
      status: "OK",
      message: "Mobile API is running",
      database: "Connected",
    })
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed",
    })
  }
})

// Simple endpoints
app.get("/api/users", async (_req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" })
  }
})

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`)
  console.log(` Health check: http://localhost:${PORT}/health`)
})
