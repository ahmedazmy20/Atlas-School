<template>
  <div class="min-h-screen flex flex-col bg-green-50">
    <!-- Navbar full width -->
    <UApp :toaster="{ position: 'bottom-right', duration: 4000 }">
      <NavBar class="fixed top-0 left-0 right-0 z-50" />

      <!-- Page content under Navbar -->
      <div class="flex pt-[70px]">
        <SideBar />

        <main
          class="flex-1 p-6 bg-green-50 transition-all duration-300"
          :class="{
            'ltr:ml-72 rtl:mr-72': !collapsed, // sidebar open
            'ltr:ml-16 md:ltr:ml-20 rtl:mr-20': collapsed, // sidebar collapsed
          }">
          <slot />
        </main>
      </div>
    </UApp>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUIStore } from "@/stores/ui";

const uiStore = useUIStore();
const collapsed = computed(() => uiStore.sidebarCollapsed);

onMounted(() => {
  // handle sidebar state based on screen size on initial load
  uiStore.setSidebarByScreen();

  // update sidebar state on window resize
  window.addEventListener("resize", () => {
    uiStore.setSidebarByScreen();
  });
});
</script>
