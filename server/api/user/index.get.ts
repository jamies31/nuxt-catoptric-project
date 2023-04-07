import { prisma } from "~~/server/plugins/supabase"
// import { getServerSession } from "#auth"

export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany()
  return {
    statusCode: 200,
    body: JSON.stringify(users),
  }
})
