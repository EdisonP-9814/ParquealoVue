import { defineStore } from 'pinia'

interface ParkingSpace {
  id: number;
  name: string;
  occupied: boolean;
  occupiedBy: string | null;
  occupiedSince: Date | null;
}

export const useParkingStore = defineStore('parking', {
  state: () => ({
    spaces: [
      { id: 1, name: 'A1', occupied: false, occupiedBy: null, occupiedSince: null },
      { id: 2, name: 'A2', occupied: false, occupiedBy: null, occupiedSince: null },
      { id: 3, name: 'A3', occupied: false, occupiedBy: null, occupiedSince: null },
      { id: 4, name: 'B1', occupied: false, occupiedBy: null, occupiedSince: null },
      { id: 5, name: 'B2', occupied: false, occupiedBy: null, occupiedSince: null },
      { id: 6, name: 'B3', occupied: false, occupiedBy: null, occupiedSince: null },
    ] as ParkingSpace[],
  }),
  actions: {
    toggleSpace(id: number) {
      const space = this.spaces.find(s => s.id === id)
      if (space) {
        space.occupied = !space.occupied
        if (space.occupied) {
          space.occupiedSince = new Date()
          space.occupiedBy = 'Current User' // This should be replaced with actual user info
        } else {
          space.occupiedSince = null
          space.occupiedBy = null
        }
      }
    },
  },
})
