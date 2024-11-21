<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/login" v-if="!isLoggedIn">Inicio de Sesión</router-link>
        <router-link to="/espacios" v-if="isLoggedIn">Espacios</router-link>
        <button v-if="isLoggedIn" @click="logout">Cerrar Sesión</button>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2023 Gestión de Parqueadero</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

export default defineComponent({
  name: 'App',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const isLoggedIn = computed(() => authStore.isAuthenticated)

    const logout = () => {
      authStore.logout()
      router.push('/login')
    }

    return {
      isLoggedIn,
      logout
    }
  }
})
</script>
