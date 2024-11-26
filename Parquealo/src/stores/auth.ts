import { defineStore } from 'pinia'

export interface User {
  id: string;
  username: string;
  role: 'client' | 'supervisor' | 'admin';
  vehiclePlate?: string;
  password?: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    isSupervisor: (state) => state.user?.role === 'supervisor',
    isClient: (state) => state.user?.role === 'client',
  },
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await fetch('/users.json')
        const users: User[] = await response.json()

        const user = users.find(u =>
          u.username === username &&
          (u.role === 'client' ? u.vehiclePlate === password : u.password === password)
        )

        if (user) {
          this.user = user
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
    },
  },
})
