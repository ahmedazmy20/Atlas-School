import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", {
  state: () => ({
    sidebarCollapsed: false,
  }),

  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },

    setSidebarByScreen() {
      if (typeof window !== "undefined") {
        this.sidebarCollapsed = window.innerWidth < 1024; // يخفي في الشاشات الصغيرة
      }
    },
  },
});
