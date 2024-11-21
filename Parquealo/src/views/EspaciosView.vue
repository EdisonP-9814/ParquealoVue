<template>
  <div class="espacios">
    <h2>Gestión de Espacios de Parqueo</h2>
    <div class="parking-grid">
      <ParkingSpace
        v-for="space in parkingStore.spaces"
        :key="space.id"
        :space="space"
        @toggle="toggleSpace"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useParkingStore } from '../stores/parking'
import ParkingSpace from '../components/ParkingSpace.vue'

export default defineComponent({
  name: 'EspaciosView',
  components: {
    ParkingSpace
  },
  setup() {
    const parkingStore = useParkingStore()

    const toggleSpace = (id: number) => {
      parkingStore.toggleSpace(id)
    }

    return {
      parkingStore,
      toggleSpace
    }
  }
})
</script>
