<template>
  <div class="admin">
    <h2>Panel de Administración</h2>
    <div class="stats">
      <h3>Estadísticas de Uso</h3>
      <p>Total de usos: {{ parkingStore.getTotalUsage() }}</p>
      <p>Ingresos totales: ${{ parkingStore.getTotalRevenue() }}</p>
    </div>
    <div class="client-usage">
      <h3>Uso por Cliente</h3>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Usos</th>
            <th>Total Gastado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in parkingStore.clients" :key="client.id">
            <td>{{ client.username }} - {{ client.vehiclePlate }}</td>
            <td>{{ getClientUsageCount(client.id) }}</td>
            <td>${{ getClientTotalSpent(client.id) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,} from 'vue'
import { useParkingStore } from '../stores/parking'

export default defineComponent({
  name: 'AdminView',
  setup() {
    const parkingStore = useParkingStore()

    const getClientUsageCount = (clientId: string) => {
      return parkingStore.getClientUsage(clientId).length
    }

    const getClientTotalSpent = (clientId: string) => {
      return parkingStore.getClientUsage(clientId).reduce((total, usage) => total + usage.cost, 0)
    }

    return {
      parkingStore,
      getClientUsageCount,
      getClientTotalSpent
    }
  }
})
</script>

<style scoped>
.admin {
  max-width: 800px;
  margin: 0 auto;
}

.stats, .client-usage {
  margin-bottom: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
