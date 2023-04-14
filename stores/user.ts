import { defineStore } from 'pinia'

export interface UserState {
  user: any,
  session: any,
}

export const useUser = defineStore('user', {
  state: (): UserState => ({
    user: null,
    session: null,
  }),
  actions: {
    setUser(session: any, user: any) {
      this.session = session
      this.user = user
    }
  },
  getters: {
    getUser(): any {
      return this.session
    }
  },
})