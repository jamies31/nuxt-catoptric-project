import { supabase } from "~~/server/plugins/supabase";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { access_token, refresh_token } = body;
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token
    })
    if (error) {
      return {
        statusCode: 401,
        body: JSON.stringify(error)
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
});
