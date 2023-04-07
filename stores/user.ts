import { defineStore } from 'pinia'

export interface UserState {
  user: Object | null,
  session: Session | null,
}

interface Session {
  access_token: string,
  expires_at: number,
  expires_in: number,
  refresh_token: string,
  token_type: string,
  user: Object,
}

export const useUser = defineStore('user', {
  state: (): UserState => ({
    user: null,
    session: null,
  }),
  actions: {
    setLocalAuth(user: Object | null, session: Session | null) {
      this.user = user
      this.session = session
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('session', JSON.stringify(session))
    },
    setAuthSession(session: Session | null) {
      this.session = session
    },
    setAuthUser(user: Object | null) {
      this.user = user
    }
  },
  getters: {
    getLocalAuth(): UserState {
      const _user = localStorage.getItem('user')
      const _session = localStorage.getItem('session')
      if (_user !== null && _session !== null) {
        this.user = JSON.parse(_user)
        this.session = JSON.parse(_session)
      }
      return {
        user: this.user,
        session: this.session,
      }
    }
  },
})