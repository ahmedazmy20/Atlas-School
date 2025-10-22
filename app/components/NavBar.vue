<template>
  <header
    class="flex justify-between items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3 shadow-sm transition-colors duration-200">
    <!-- Left Side -->
    <div class="flex items-center gap-4">
      <!-- Menu Button -->
      <UButton
        variant="ghost"
        size="sm"
        class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="toggleMenu">
        <Icon
          name="lucide:menu"
          class="w-5 h-5 text-gray-700 dark:text-gray-200" />
      </UButton>

      <div class="hidden lg:flex items-center gap-4">
        <!-- School Manager Dropdown -->
        <details
          class="group relative border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <summary
            class="flex items-center justify-between gap-3 px-3 py-1.5 cursor-pointer rounded-lg">
            <span class="truncate min-w-0">{{
              t("header.schoolManager")
            }}</span>
            <Icon
              name="lucide:chevron-down"
              class="w-4 h-4 transition-transform duration-300 group-open:rotate-180" />
          </summary>

          <div
            class="absolute left-0 top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg space-y-1 z-50">
            <NuxtLink
              class="block cursor-pointer px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              {{ t("header.manager1") }}
            </NuxtLink>
            <NuxtLink
              class="block cursor-pointer px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              {{ t("header.manager2") }}
            </NuxtLink>
          </div>
        </details>

        <!-- Branch Dropdown -->
        <details
          class="group relative border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <summary
            class="flex items-center justify-between gap-3 px-3 py-1.5 cursor-pointer rounded-lg">
            <span class="truncate min-w-0">{{ t("header.branch") }}</span>
            <Icon
              name="lucide:chevron-down"
              class="w-4 h-4 transition-transform duration-300 group-open:rotate-180" />
          </summary>

          <div
            class="absolute left-0 top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg space-y-1 z-50">
            <NuxtLink
              class="block cursor-pointer px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              {{ t("header.branch1") }}
            </NuxtLink>
            <NuxtLink
              class="block cursor-pointer px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              {{ t("header.branch2") }}
            </NuxtLink>
          </div>
        </details>

        <!-- Year Dropdown -->
        <details
          class="group relative border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <summary
            class="flex items-center justify-between gap-3 px-3 py-1.5 cursor-pointer rounded-lg">
            <span class="truncate min-w-0">{{ t("header.year") }}</span>
            <Icon
              name="lucide:chevron-down"
              class="w-4 h-4 transition-transform duration-300 group-open:rotate-180" />
          </summary>

          <div
            class="absolute left-0 top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg space-y-1 z-50">
            <NuxtLink
              class="block cursor-pointer px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              {{ t("header.year1") }}
            </NuxtLink>
            <NuxtLink
              class="block cursor-pointer px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              {{ t("header.year2") }}
            </NuxtLink>
          </div>
        </details>
      </div>

      <!-- Search -->
      <div class="relative hidden sm:block">
        <UInput
          placeholder="Search..."
          icon="lucide:search"
          class="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" />
      </div>
    </div>

    <!-- Right Side -->
    <div class="flex items-center gap-5">
      <!--  Dropdown تغيير اللغة -->
      <div ref="dropdownRef" class="relative">
        <UButton
          variant="ghost"
          size="sm"
          class="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-700 dark:text-gray-200 flex items-center gap-2"
          @click.stop="toggle">
          <img
            :src="current.flag"
            alt="flag"
            class="w-5 h-5 rounded-full object-cover" />
          <span class="capitalize">{{ current.label }}</span>
          <Icon name="lucide:chevron-down" class="w-4 h-4 ml-1" />
        </UButton>

        <!-- Dropdown -->
        <transition name="fade">
          <div
            v-if="open"
            class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg overflow-hidden z-50 transition-colors">
            <button
              v-for="lang in languages"
              :key="lang.code"
              class="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              @click="select(lang.code)">
              <img
                :src="lang.flag"
                alt="flag"
                class="w-5 h-5 rounded-full object-cover" />
              <span class="text-sm">{{ lang.label }}</span>
            </button>
          </div>
        </transition>
      </div>

      <!-- Dark Mode -->
      <DarkMode />

      <!-- Notification Bell -->
      <div class="relative">
        <UButton
          variant="ghost"
          size="sm"
          class="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
          <Icon
            name="lucide:bell"
            class="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </UButton>
        <span
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5"
          >{{ t("header.unreadCount") }}</span
        >
      </div>

      <!-- User Info -->
      <div
        class="hidden xl:flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
        <div
          class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          <Icon
            name="lucide:user"
            class="w-5 h-5 text-blue-600 dark:text-blue-300" />
        </div>
        <div class="flex flex-col text-right">
          <span
            class="font-semibold text-gray-800 dark:text-gray-100 text-xs 2xl:text-sm">
            {{ userName || t("header.user.name") }}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ userRole ? t(`role.${userRole}`) : t("header.user.role") }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useLanguage } from "~/composables/useLanguage";
import { useI18n } from "vue-i18n";
import { useUIStore } from "@/stores/ui";

interface User {
  role?: string;
  arabicField?: string;
  englishField?: string;
}

onMounted(() => {
  const dropdowns = document.querySelectorAll("header details");

  dropdowns.forEach((dropdown) => {
    dropdown.querySelectorAll("a, button").forEach((link) => {
      link.addEventListener("click", () => {
        dropdown.removeAttribute("open");
      });
    });
  });

  document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown.contains(e.target as Node)) return;
      dropdown.removeAttribute("open");
    });
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("click", () => {});
});

// Provide a type for the user state so it's not `unknown`
const user = useCookie<User | null>("user", {
  default: () => null,
});
const uiStore = useUIStore();
function toggleMenu() {
  uiStore.toggleSidebar();
}

const { t } = useI18n();
const { locale, switchLanguage } = useLanguage();

const userName = computed(() =>
  locale.value === "ar" ? user.value?.arabicField : user.value?.englishField
);

// Expose a typed computed for the role to use in the template
const userRole = computed(() => user.value?.role ?? null);

type LangCode = "ar" | "en";

const languages: { code: LangCode; label: string; flag: string }[] = [
  { code: "ar", label: "العربية", flag: "https://flagcdn.com/sa.svg" },
  { code: "en", label: "English", flag: "https://flagcdn.com/us.svg" },
];

const open = ref(false);
const dropdownRef = ref<HTMLDivElement | null>(null);

const current = computed(() => {
  return languages.find((l) => l.code === locale.value) ?? languages[0];
});

function toggle() {
  open.value = !open.value;
}

function select(langCode: LangCode) {
  switchLanguage(langCode);
  open.value = false;
}

function onDocClick(e: MouseEvent) {
  if (!dropdownRef.value) return;
  const target = e.target as Node;
  if (open.value && !dropdownRef.value.contains(target)) open.value = false;
}

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
