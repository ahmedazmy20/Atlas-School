<template>
  <aside
    class="fixed z-40 top-[60px] xl:top-[75px] bottom-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 flex flex-col shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform"
    :class="[
      isRTL
        ? 'rtl:right-0 border-l dark:border-gray-700'
        : 'left-0 border-r dark:border-gray-700',

      // 💡 في الشاشات الصغيرة: خارج الشاشة لما تكون مقفولة
      collapsed && isMobile
        ? isRTL
          ? 'translate-x-full'
          : '-translate-x-full'
        : 'translate-x-0',

      // 💡 في الشاشات الكبيرة: فقط تغيير العرض
      !isMobile ? (collapsed ? 'w-20' : 'w-72') : 'w-52',
    ]">
    <!-- Header -->
    <div
      class="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700 transition-all duration-500">
      <div
        class="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md shrink-0">
        <Icon name="lucide:graduation-cap" class="w-6 h-6" />
      </div>

      <div
        class="overflow-hidden transition-all duration-300 delay-150"
        :class="
          collapsed && !isMobile ? 'opacity-0 w-0' : 'opacity-100 w-auto'
        ">
        <p class="font-semibold text-blue-900 dark:text-blue-300 truncate">
          {{ t("sidebar.title") }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
          {{ t("sidebar.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Links -->
    <nav
      class="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent transition-all duration-500">
      <template v-for="(link, index) in sidebarLinks" :key="index">
        <!-- if no children -->
        <NuxtLink
          v-if="!link.children"
          :to="link.to"
          class="group flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-blue-700 dark:text-blue-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white"
          @click="onLinkClick">
          <Icon
            :name="link.icon"
            class="w-5 h-5 shrink-0 transition-all duration-300" />
          <span
            class="transition-all duration-500 delay-150 truncate min-w-0"
            :class="
              collapsed && !isMobile
                ? 'opacity-0 w-0 hidden'
                : 'opacity-100 w-auto block'
            ">
            {{ t(link.label) }}
          </span>
        </NuxtLink>

        <!-- if has children (Dropdown) -->
        <details
          v-else
          class="group rounded-lg font-semibold text-blue-700 dark:text-blue-300 transition-all duration-300 overflow-hidden">
          <summary
            class="flex items-center justify-between gap-3 px-3 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <div class="flex items-center gap-3">
              <Icon
                :name="link.icon"
                class="w-5 h-5 shrink-0 transition-all duration-300" />
              <span
                class="transition-all duration-500 delay-150 truncate min-w-0"
                :class="
                  collapsed && !isMobile
                    ? 'opacity-0 w-0 hidden'
                    : 'opacity-100 w-auto block'
                ">
                {{ t(link.label) }}
              </span>
            </div>

            <!-- السهم -->
            <Icon
              name="lucide:chevron-down"
              class="w-4 h-4 transition-transform duration-300 group-open:rotate-180" />
          </summary>

          <div class="pl-10 mt-1 space-y-1">
            <NuxtLink
              v-for="(child, i) in link.children"
              :key="i"
              :to="child.to"
              class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              {{ t(child.label) }}
            </NuxtLink>
          </div>
        </details>
      </template>
    </nav>
  </aside>
</template>

<script setup>
import { useUIStore } from "@/stores/ui";
import { useI18n } from "vue-i18n";
import { computed, ref, onMounted, onUnmounted } from "vue";

const { t, locale } = useI18n();
const uiStore = useUIStore();
const collapsed = computed(() => uiStore.sidebarCollapsed);
const isRTL = computed(() => locale.value === "ar");

// if the screen is less than 1024px, set isMobile to true
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

function onLinkClick() {
  if (isMobile.value) {
    uiStore.sidebarCollapsed = true;
  }
}

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
  // _____
  {
    icon: "lucide:wallet",
    label: "sidebar.finance",
    children: [
      { to: "", label: "sidebar.revenues" },
      { to: "", label: "sidebar.expenses" },
      { to: "", label: "sidebar.reports" },
    ],
  },

  {
    icon: "lucide:clipboard-check",
    label: "sidebar.evaluation",
    children: [
      { to: "", label: "sidebar.exams" },
      { to: "", label: "sidebar.results" },
    ],
  },

  {
    icon: "lucide:file-text",
    label: "sidebar.reports",
    children: [
      { to: "", label: "sidebar.studentReports" },
      { to: "", label: "sidebar.teacherReports" },
    ],
  },

  {
    icon: "lucide:bus",
    label: "sidebar.transportation",
    children: [
      { to: "", label: "sidebar.routes" },
      { to: "", label: "sidebar.drivers" },
    ],
  },

  {
    icon: "lucide:award",
    label: "sidebar.certificates",
    children: [
      { to: "", label: "sidebar.studentCertificates" },
      { to: "", label: "sidebar.teacherCertificates" },
    ],
  },
];
</script>

<style scoped>
::-webkit-scrollbar {
  width: 3px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(100, 116, 139, 0.4);
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

/* عند المرور عليه */
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 116, 139, 0.7);
}

/* وضع الـ Dark mode */
.dark ::-webkit-scrollbar-thumb {
  background-color: rgba(148, 163, 184, 0.4);
}
.dark ::-webkit-scrollbar-thumb:hover {
  background-color: rgba(148, 163, 184, 0.7);
}
</style>
