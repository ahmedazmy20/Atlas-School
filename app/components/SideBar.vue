<template>
  <aside
    class="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col shadow-2xl transition-all duration-300"
    :class="collapsed ? 'w-20' : 'w-72'">
    <!-- Header -->
    <div
      class="flex overflow-hidden items-center gap-3 p-4 border-b border-gray-100 transition-all duration-300">
      <div
        class="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md">
        <Icon name="lucide:graduation-cap" class="w-6 h-6" />
      </div>

      <!-- النص يختفي عند التصغير -->
      <div v-if="!collapsed" class="transition-opacity duration-200">
        <p class="font-semibold text-blue-900">{{ t("sidebar.title") }}</p>
        <p class="text-sm text-gray-500">{{ t("sidebar.subtitle") }}</p>
      </div>
    </div>

    <!-- Links -->
    <nav class="flex-1 p-4 space-y-2 overflow-hidden">
      <NuxtLink
        to="/dash-board"
        class="group overflow-hidden flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:home" class="w-5 h-5" />
        <span v-if="!collapsed" class="transition-opacity duration-200">{{
          t("sidebar.dashboard")
        }}</span>
      </NuxtLink>

      <NuxtLink
        to=""
        class="group overflow-hidden flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:graduation-cap" class="w-5 h-5" />
        <span v-if="!collapsed" class="transition-opacity duration-200"
          >School Manager</span
        >
      </NuxtLink>

      <NuxtLink
        to=""
        class="group overflow-hidden flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:library" class="w-5 h-5" />
        <span v-if="!collapsed" class="transition-opacity duration-200"
          >Administration Assi...</span
        >
      </NuxtLink>

      <NuxtLink
        to=""
        class="group overflow-hidden flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:users" class="w-5 h-5" />
        <span v-if="!collapsed" class="transition-opacity duration-200"
          >Classroom Management</span
        >
      </NuxtLink>

      <NuxtLink
        to=""
        class="group overflow-hidden flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:book" class="w-5 h-5" />
        <span v-if="!collapsed" class="transition-opacity duration-200"
          >Acadimic Managent</span
        >
      </NuxtLink>

      <NuxtLink
        to="/products-management"
        class="group flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:package" class="w-5 h-5" />
        <span v-if="!collapsed" class="transition-opacity duration-200">{{
          t("sidebar.products")
        }}</span>
      </NuxtLink>

      <NuxtLink
        to=""
        class="group overflow-hidden flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:library" class="w-5 h-5" />
        <span v-if="!collapsed" class="transition-opacity duration-200"
          >Behavior Notes</span
        >
      </NuxtLink>

      <NuxtLink
        to=""
        class="group overflow-hidden flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:printer" class="w-5 h-5" />
        <span v-if="!collapsed" class="transition-opacity duration-200"
          >Printing Press</span
        >
      </NuxtLink>

      <NuxtLink
        to=""
        class="group overflow-hidden flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:wallet" class="w-5 h-5" />
        <span v-if="!collapsed" class="transition-opacity duration-200"
          >Withdrawals</span
        >
      </NuxtLink>

      <NuxtLink
        to=""
        class="group overflow-hidden flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:line-chart" class="w-5 h-5" />
        <span v-if="!collapsed" class="transition-opacity duration-200"
          >Student Academic Pe...</span
        >
      </NuxtLink>

      <NuxtLink
        to=""
        class="group overflow-hidden flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:users" class="w-5 h-5" />
        <span v-if="!collapsed" class="transition-opacity duration-200"
          >Dropout Students</span
        >
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup>
// add translation later if needed
import { useUIStore } from "@/stores/ui";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const uiStore = useUIStore();
const collapsed = computed(() => uiStore.sidebarCollapsed);
</script>

<style scoped>
/* ممكن تضيف استايل خاص هنا لو عايز */
</style>
