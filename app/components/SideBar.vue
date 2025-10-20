<template>
  <aside
    class="fixed z-10 top-[60px] xl:top-[75px] bottom-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 flex flex-col shadow-2xl transition-all duration-500 ease-in-out will-change-transform overflow-x-hidden"
    :class="[
      isRTL
        ? 'rtl:right-0 border-l dark:border-gray-700'
        : 'left-0 border-r dark:border-gray-700',
      collapsed
        ? isRTL
          ? 'translate-x-full xl:translate-x-0  xl:w-20'
          : '-translate-x-full xl:translate-x-0 xl:w-20'
        : 'translate-x-0  md:w-72',
    ]">
    <!-- Header -->
    <div
      class="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700 transition-all duration-300">
      <div
        class="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md">
        <Icon name="lucide:graduation-cap" class="w-6 h-6" />
      </div>

      <!-- Labels -->
      <div
        v-if="showLabels"
        class="transition-opacity duration-300 ease-in-out opacity-0"
        :class="{ 'opacity-100': showLabels }">
        <p class="font-semibold text-blue-900 dark:text-blue-300">
          {{ t("sidebar.title") }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ t("sidebar.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Dynamic Links -->
    <nav
      class="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent transition-colors">
      <NuxtLink
        v-for="(link, index) in sidebarLinks"
        :key="index"
        :to="link.to"
        class="group flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 dark:text-blue-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700"
        @click="onLinkClick">
        <Icon :name="link.icon" class="w-5 h-5" />
        <transition name="fade" mode="default">
          <span
            v-if="showLabels"
            class="block overflow-x-hidden transition-opacity duration-500 ease-in-out">
            {{ t(link.label) }}
          </span>
        </transition>
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup>
import { useUIStore } from "@/stores/ui";
import { useI18n } from "vue-i18n";
import { computed, ref, watch } from "vue";

const { t, locale } = useI18n();
const uiStore = useUIStore();
const collapsed = computed(() => uiStore.sidebarCollapsed);

// ✅ تحديد إذا كانت اللغة RTL (مثل العربية)
const isRTL = computed(() => locale.value === "ar");

// transition state for showing/hiding labels
const showLabels = ref(!collapsed.value);

watch(collapsed, (newVal) => {
  if (newVal) {
    showLabels.value = false;
  } else {
    setTimeout(() => {
      showLabels.value = true;
    }, 200);
  }
});

const isSmallScreen = () =>
  typeof window !== "undefined" && window.innerWidth < 1024;

function onLinkClick() {
  if (isSmallScreen()) {
    uiStore.sidebarCollapsed = true;
  }
}

// Sidebar Links Data
const sidebarLinks = [
  { to: "/dash-board", icon: "lucide:home", label: "sidebar.dashboard" },
  { to: "", icon: "lucide:graduation-cap", label: "sidebar.subtitle" },
  { to: "", icon: "lucide:library", label: "sidebar.Administration" },
  { to: "", icon: "lucide:users", label: "sidebar.classrooms" },
  { to: "", icon: "lucide:book", label: "sidebar.Acadimic" },
  {
    to: "/products-management",
    icon: "lucide:package",
    label: "sidebar.products",
  },
  { to: "", icon: "lucide:library", label: "sidebar.behavior" },
  { to: "", icon: "lucide:printer", label: "sidebar.printing" },
  { to: "", icon: "lucide:wallet", label: "sidebar.withdrawals" },
  { to: "", icon: "lucide:line-chart", label: "sidebar.studentAcademic" },
  { to: "", icon: "lucide:users", label: "sidebar.dropout" },
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
