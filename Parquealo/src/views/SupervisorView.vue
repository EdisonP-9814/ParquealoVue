<template>
  <div class="supervisor">
    <h2>Panel de Supervisor</h2>
    <div class="actions">
      <h3>Registrar Nuevo Cliente</h3>
      <form @submit.prevent="registerClient">
        <input v-model="newClient.username" placeholder="Identificación" required>
        <input v-model="newClient.vehiclePlate" placeholder="Placa del Vehículo" required>
        <button type="submit">Registrar Cliente</button>
      </form>
    </div>
    <div class="actions">
      <h3>Asignar Espacio de Parqueo</h3>
      <form @submit.prevent="assignSpace">
        <select v-model="selectedClient">
          <option value="">Seleccionar Cliente</option>
          <option v-for="client in parkingStore.clients" :key="client.id" :value="client.id">
            {{ client.username }} - {{ client.vehiclePlate }}
          </option>
        </select>
        <select v-model="selectedSpace">
          <option value="">Seleccionar Espacio</option>
          <option v-for="space in availableSpaces" :key="space.id" :value="space.id">
            {{ space.name }}
          </option>
        </select>
        <button type="submit">Asignar Espacio</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useParkingStore } from '../stores/parking'

export default defineComponent({
  name: 'SupervisorView',
  setup() {
    const parkingStore = useParkingStore()
    const newClient = ref({ username: '', vehiclePlate: '' })
    const selectedClient = ref('')
    const selectedSpace = ref('')

    const availableSpaces = computed(() =>
      parkingStore.spaces.filter(space => !space.occupied)
    )

    const registerClient = () => {
      parkingStore.addClient({
        id: Date.now().toString(),
        username: newClient.value.username,
        vehiclePlate: newClient.value.vehiclePlate
      })
      newClient.value = { username: '', vehiclePlate: '' }
    }

    const assignSpace = () => {
      if (selectedClient.value && selectedSpace.value) {
        parkingStore.assignSpace(selectedClient.value, parseInt(selectedSpace.value))
        selectedClient.value = ''
        selectedSpace.value = ''
      }
    }

    return {
      parkingStore,
      newClient,
      selectedClient,
      selectedSpace,
      availableSpaces,
      registerClient,
      assignSpace
    }
  }
})
</script>

<style scoped>
.supervisor {
  max-width: 600px;
  margin: 0 auto;
}

.actions {
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input, select, button {
  padding: 0.5rem;
}
</style>
