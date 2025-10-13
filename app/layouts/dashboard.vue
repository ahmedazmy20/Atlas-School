<template>
  <div class="min-h-screen flex flex-col bg-green-50">
    <!-- 🔹 Navbar full width -->
    <NavBar class="fixed top-0 left-0 right-0 z-50" />

    <!-- 🔹 محتوى الصفحة تحت الـ Navbar -->
    <div class="flex pt-[70px]">
      <SideBar class="z-10 fixed top-[60px] xl:top-[75px] left-0 rtl:right-0" />
      <main
        class="flex-1 p-6 bg-green-50 transition-all duration-300"
        :class="{
          'ltr:ml-72 rtl:mr-72': !collapsed, // if sidebar is open
          'ltr:ml-20 rtl:mr-20': collapsed, // if sidebar is collapsed
        }">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useUIStore } from "@/stores/ui";

const uiStore = useUIStore();
const collapsed = computed(() => uiStore.sidebarCollapsed);
</script>
