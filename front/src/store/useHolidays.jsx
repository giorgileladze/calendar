import { create } from 'zustand'

const useHolidays = create((set) => ({
  holidays: {},
  updateHolidays: (key, val) => set((state) => ({ holidays: {...state.holidays, [key]: val} })),
}))

export default useHolidays;