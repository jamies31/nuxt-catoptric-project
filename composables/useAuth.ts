interface SetSessionResponse {
  statusCode: number,
  body: string,
}

import { useUser } from "~~/stores/user"

export const useAuth = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const user = useUser()
  const route = useRoute()
  const localAuth = user.getLocalAuth
  const session = localAuth.session
  const { data } = await useFetch('api/auth/set-session', {
    method: 'POST',
    body: JSON.stringify(session),
  })
  const dataValue = data.value as SetSessionResponse | null
  if (!dataValue) {
    return
  }
  const { statusCode, body } = dataValue
  if (statusCode === 500) {
    if (route.path === "/dashboard" || route.path === "/controller") {
      return navigateTo('/')
    }
    if (route.path === "/" || route.path === "/register" || route.path === "/login") {
      return
    }
  }
  if (statusCode !== 200) {
    if (route.path === "/" || route.path === "/register" || route.path === "/login") {
      return
    }
    else {
      return navigateTo('/')
    }
  }
  const { session: newSession, user: newUser } = JSON.parse(body)
  user.setLocalAuth(newUser, newSession)
  return navigateTo('/dashboard')
} 