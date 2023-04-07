import { supabase } from "~~/server/plugins/supabase";

export default defineEventHandler(async (event) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return {
        statusCode: error.status ? error.status : 500,
        body: error.message
      }
    }
    return {
      statusCode: 200,
      body: "Signed out"
    }
  }
  catch (error: any) {
    return {
      statusCode: 500,
      body: error.message
    }
  }
})