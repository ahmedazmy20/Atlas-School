<template>
  <header
    class="flex justify-between items-center bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
    <!-- 🔹 الجزء الشمال -->
    <div class="flex items-center gap-4">
      <!-- Menu Button -->
      <UButton
        variant="ghost"
        size="sm"
        class="p-2 rounded-md hover:bg-gray-100">
        <Icon name="lucide:menu" class="w-5 h-5 text-gray-700" />
      </UButton>

      <!-- School Manager Dropdown -->
      <UDropdown class="min-w-[170px]">
        <UButton
          class="border border-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-md bg-white hover:bg-gray-50">
          School Manager
          <Icon name="lucide:chevron-down" class="w-4 h-4 ml-1" />
        </UButton>
      </UDropdown>

      <!-- Branch Dropdown -->
      <UDropdown class="min-w-[170px]">
        <UButton
          class="border border-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-md bg-white hover:bg-gray-50">
          Testing Branch
          <Icon name="lucide:chevron-down" class="w-4 h-4 ml-1" />
        </UButton>
      </UDropdown>

      <!-- Year Dropdown -->
      <UDropdown class="min-w-[150px]">
        <UButton
          class="border border-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-md bg-white hover:bg-gray-50">
          2025 / 2026
          <Icon name="lucide:chevron-down" class="w-4 h-4 ml-1" />
        </UButton>
      </UDropdown>

      <!-- Search -->
      <div class="relative">
        <UInput
          placeholder="Search..."
          icon="lucide:search"
          class="border border-gray-200 bg-white rounded-md w-56" />
      </div>
    </div>

    <!-- 🔹 الجزء اليمين -->
    <div class="flex items-center gap-5">
      <!-- Translation Button -->
      <UButton
        variant="ghost"
        size="sm"
        class="hover:bg-gray-100 rounded-md text-gray-700"
        @click="toggleLocale">
        <Icon name="lucide:languages" class="w-5 h-5" />
        <span class="ml-2 capitalize">{{ localeLabel }}</span>
      </UButton>

      <!-- Notification Bell -->
      <div class="relative">
        <UButton variant="ghost" size="sm" class="hover:bg-gray-100 rounded-md">
          <Icon name="lucide:bell" class="w-5 h-5 text-gray-700" />
        </UButton>
        <span
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5"
          >32</span
        >
      </div>

      <!-- User Info -->
      <div
        class="flex items-center gap-3 border border-gray-200 rounded-md px-3 py-2 bg-white hover:bg-gray-50 cursor-pointer">
        <div
          class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Icon name="lucide:user" class="w-5 h-5 text-blue-600" />
        </div>
        <div class="flex flex-col text-right">
          <span class="font-semibold text-gray-800 text-sm"
            >International Manager</span
          >
          <span class="text-xs text-gray-500">Administrator</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// دالة لتبديل اللغة
const toggleLocale = () => {
  locale.value = locale.value === "en" ? "ar" : "en";
};

// نص اللغة الحالية لعرضها بجانب الأيقونة
const localeLabel = computed(() =>
  locale.value === "en" ? "English" : "العربية"
);
</script>
