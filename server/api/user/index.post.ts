import { prisma } from "~~/server/plugins/supabase";

export default defineEventHandler(async (event) => {
  try {
    const { body } = await readBody(event);
    const { email, name } = JSON.parse(body);
    await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  }
  catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
})