import { PrismaClient, Prisma } from "@prisma/client"
import { createClient } from "@supabase/supabase-js"

export const prisma = new PrismaClient()
export const supabase = createClient('https://tzbgocnlfgdvvnchhxts.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6YmdvY25sZmdkdnZuY2hoeHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4MDIwMjQsImV4cCI6MTk5NjM3ODAyNH0.w7FJ1J3p7Cn0VJFpCT4VpzLDUceuOb0TWlfzMXGCNog')

export default defineNitroPlugin(async (app) => {
  await prisma.$connect()
})