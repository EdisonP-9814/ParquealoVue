export interface ParkingSpace {
  id: number;
  name: string;
  occupied: boolean;
  occupiedBy: string | null;
  occupiedSince: Date | null;
}

export interface Client {
  id: string;
  username: string;
  vehiclePlate: string;
}

import { defineStore } from 'pinia'

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
    clients: [] as Client[],
    usageHistory: [] as { clientId: string; startTime: Date; endTime: Date; cost: number }[],
  }),
  actions: {
    toggleSpace(id: number, clientId: string | null) {
      const space = this.spaces.find(s => s.id === id)
      if (space) {
        space.occupied = !space.occupied
        if (space.occupied) {
          space.occupiedSince = new Date()
          space.occupiedBy = clientId
        } else {
          const startTime = space.occupiedSince!
          const endTime = new Date()
          const duration = (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 // hours
          const cost = Math.round(duration * 5) // $5 per hour
          this.usageHistory.push({
            clientId: space.occupiedBy!,
            startTime,
            endTime,
            cost
          })
          space.occupiedSince = null
          space.occupiedBy = null
        }
      }
    },
    addClient(client: Client) {
      this.clients.push(client)
    },
    assignSpace(clientId: string, spaceId: number) {
      this.toggleSpace(spaceId, clientId)
    },
    getClientUsage(clientId: string) {
      return this.usageHistory.filter(usage => usage.clientId === clientId)
    },
    getTotalUsage() {
      return this.usageHistory.length
    },
    getTotalRevenue() {
      return this.usageHistory.reduce((total, usage) => total + usage.cost, 0)
    }
  },
})
