import { supabase } from "~~/server/plugins/supabase"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if (error) {
      return {
        statusCode: error.status ? error.status : 500,
        error: error.message
      }
    }
    return {
      statusCode: 200,
      user: data.user,
      session: data.session
    }
  }
  catch(error: any) {
    return {
      statusCode: 500,
      error: error.message
    }
  }
})