<template>
  <div
    class="min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-300">
    <!-- Navbar full width -->
    <UApp :toaster="{ position: 'bottom-right', duration: 4000 }">
      <NavBar class="fixed top-0 left-0 right-0 z-50" />

      <!-- Page content under Navbar -->
      <div class="flex pt-[70px] justify-center">
        <SideBar />

        <main
          class="flex-1 ltr:px-5 rtl:px-5 pr-1 md:p-9 container dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300"
          :class="{
            'md:ltr:ml-52 lg:ltr:ml-72 md:rtl:mr-52 lg:rtl:mr-72 ': !collapsed, // sidebar open on large screens
            'lg:ms-20': collapsed,
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
