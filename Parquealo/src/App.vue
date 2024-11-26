<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/espacios">Espacios</router-link>
        <template v-if="authStore.isSupervisor || authStore.isAdmin">
          | <router-link to="/supervisor">Supervisor</router-link>
        </template>
        <template v-if="authStore.isAdmin">
          | <router-link to="/admin">Admin</router-link>
        </template>
        <template v-if="authStore.isAuthenticated">
          | <a href="#" @click.prevent="logout">Cerrar Sesión</a>
        </template>
        <template v-else>
          | <router-link to="/login">Iniciar Sesión</router-link>
        </template>
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
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'App',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const logout = () => {
      authStore.logout()
      router.push('/login')
    }

    return {
      authStore,
      logout
    }
  }
})
</script>
