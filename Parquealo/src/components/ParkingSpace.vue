<template>
  <div
    :class="['parking-space', { occupied: space.occupied }]"
    @click="$emit('toggle', space.id)"
  >
    <h3>{{ space.name }}</h3>
    <p>{{ space.occupied ? 'Ocupado' : 'Libre' }}</p>
    <p v-if="space.occupied">
      Ocupado por: {{ space.occupiedBy }}<br>
      Desde: {{ formatDate(space.occupiedSince) }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface ParkingSpace {
  id: number;
  name: string;
  occupied: boolean;
  occupiedBy: string | null;
  occupiedSince: Date | null;
}

export default defineComponent({
  name: 'ParkingSpace',
  props: {
    space: {
      type: Object as PropType<ParkingSpace>,
      required: true
    }
  },
  emits: ['toggle'],
  setup() {
    const formatDate = (date: Date | null) => {
      if (!date) return ''
      return new Date(date).toLocaleString()
    }

    return {
      formatDate
    }
  }
})
</script>
