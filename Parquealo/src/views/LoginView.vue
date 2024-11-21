<template>
  <div class="login">
    <h2>Inicio de Sesión</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Identificación:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Placa del Vehículo:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const username = ref('')
    const password = ref('')
    const error = ref('')
    const router = useRouter()
    const authStore = useAuthStore()

    const handleLogin = async () => {
      try {
        await authStore.login(username.value, password.value)
        router.push('/espacios')
      } catch (err) {
        error.value = 'Credenciales inválidas'
        console.error('Error de inicio de sesión:', err)
      }
    }

    return {
      username,
      password,
      error,
      handleLogin
    }
  }
})
</script>
