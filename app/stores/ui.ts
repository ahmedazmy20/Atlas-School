// stores/ui.ts
import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", {
  state: () => ({
    sidebarCollapsed: true as boolean,
  }),

  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },

    setSidebarByScreen() {
      // make sidebar collapsed by default on small screens and expanded on large screens
      if (typeof window !== "undefined") {
        const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
        this.sidebarCollapsed = !isLargeScreen; // collapsed on small screens, expanded on large screens
      }
    },
  },
});
