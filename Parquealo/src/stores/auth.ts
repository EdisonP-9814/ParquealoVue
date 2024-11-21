import { defineStore } from 'pinia'

interface User {
  id: string;
  username: string;
  vehiclePlate: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await fetch('/users.json')
        const users: User[] = await response.json()

        const user = users.find(u => u.username === username && u.vehiclePlate === password)

        if (user) {
          this.user = user
          localStorage.setItem('user', JSON.stringify(user))
        } else {
          throw new Error('Invalid credentials')
        }
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
  },
})
