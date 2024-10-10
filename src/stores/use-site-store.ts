import axios from 'axios'
import { signOut } from 'next-auth/react'
import { create } from 'zustand'

export const useSiteStore = create((set) => ({
  site: null,
  loading: true,
  fetch: async (id: string) => {
    try {
      const {
        data: {
          data: { sites },
        },
      } = await axios.get(`/api/sites/${id}`)
      set({ site: sites[0] })
      set({ loading: false })

      return sites[0]
    } catch (err) {
      signOut()
    }
  },
}))
