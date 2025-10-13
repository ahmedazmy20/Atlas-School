<template>
  <div class="container mx-auto min-h-screen py-4 2xl:px-32 space-y-8">
    <!-- sec 1 top -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- left -->
      <div>
        <p class="text-sm text-blue-600  font-semibold">
          {{ t("dashboard.date") }}
        </p>
        <h2 class="text-xl lg:text-3xl text-blue-900 font-bold mt-2">
          {{ t("dashboard.greeting") }}
        </h2>
        <p class="text-blue-600 w-[100%] mt-3 pe-5">
          {{ t("dashboard.welcome") }}
        </p>
      </div>

      <!-- right -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          class="flex bg-[#002be9c2] w-[100%] mx-auto lg:w-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 items-center justify-between text-white px-6 py-10 rounded-2xl shadow-sm border">
          <div class="text-left rtl:text-right">
            <p class="text-sm">{{ t("dashboard.students.title") }}</p>
            <h3 class="text-3xl py-1 font-extrabold">
              {{ t("dashboard.students.count") }}
            </h3>
            <p class="text-sm">
              <Icon name="lucide:trending-up" />
              {{ t("dashboard.students.change") }}
            </p>
          </div>
          <div class="ml-4">
            <div
              class="w-12 h-12 rounded-full bg-[#4376f7] flex items-center justify-center">
              <Icon name="lucide:users" class="w-6 h-6" />
            </div>
          </div>
        </div>

        <div
          class="flex group hover:bg-[#002b100c2] w-[100%] mx-auto lg:w-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 items-center justify-between bg-[#00AFE9] text-white px-6 py-10 rounded-2xl shadow-sm border">
          <div class="text-left rtl:text-right">
            <p class="text-sm">{{ t("dashboard.staff.title") }}</p>
            <h3 class="text-3xl py-1 font-extrabold">
              {{ t("dashboard.staff.count") }}
            </h3>
            <p class="text-sm">{{ t("dashboard.staff.status") }}</p>
          </div>
          <div class="ml-4">
            <div
              class="w-12 h-12 rounded-full group-hover:bg-[#4376f7] transition-all duration-300 bg-[#43caf7] flex items-center justify-center">
              <Icon name="lucide:user-check" class="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- sec 2 middle -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- left -->
      <div
        class="bg-white w-[100%] mx-auto lg:w-full p-6 rounded-2xl border border-gray-300 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <span class="w-2 h-2 rounded-full bg-blue-500" />
          <h3 class="text-blue-900 font-semibold">
            {{ t("dashboard.quickAction.title") }}
          </h3>
        </div>

        <div class="space-y-3">
          <button
            v-for="(a, index) in quickActions"
            :key="index"
            class="w-full border border-gray-200 text-[#455ecb] flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition">
            <Icon :name="a.icon" class="w-5 h-5" />
            <div class="text-right">
              <div class="font-medium">{{ t(a.label) }}</div>
            </div>
          </button>
        </div>
      </div>

      <!-- right -->
      <div
        class="lg:col-span-2 w-[100%] mx-auto lg:w-full bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <span class="w-2 h-2 rounded-full bg-blue-500" />
          <h3 class="text-blue-900 font-semibold">
            {{ t("dashboard.activity.title") }}
          </h3>
        </div>

        <div class="space-y-3">
          <div
            v-for="(act, index) in activities"
            :key="index"
            :class="[
              'p-3 rounded-lg border overflow-hidden transition',
              act.type === 'success'
                ? 'bg-green-50 border-green-100 hover:bg-green-100'
                : act.type === 'accent'
                ? 'bg-blue-100 border-blue-200 hover:bg-blue-200'
                : 'bg-red-50 border-red-100 hover:bg-red-100',
            ]">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 mt-0.5">
                <span
                  :class="[
                    'w-3 h-3 rounded-full inline-block',
                    act.dotColor,
                  ]" />
              </div>
              <div class="flex-1 text-left rtl:text-right">
                <div class="font-medium text-gray-700">{{ t(act.title) }}</div>
                <div class="text-sm text-gray-600">{{ t(act.subtitle) }}</div>
                <div class="text-xs text-gray-400 mt-1">{{ t(act.time) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- pagination -->
    <PaginationSwip />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
// import locale for pagination direction
const { t } = useI18n();
definePageMeta({
  layout: "dashboard",
});

// Quick Actions
const quickActions = [
  {
    icon: "lucide:users",
    label: "dashboard.quickAction.actions.manageStudents",
  },
  {
    icon: "lucide:book-open",
    label: "dashboard.quickAction.actions.manageCourses",
  },
  {
    icon: "lucide:calendar",
    label: "dashboard.quickAction.actions.attendance",
  },
  {
    icon: "lucide:settings",
    label: "dashboard.quickAction.actions.settings",
  },
];

// Recent Activities
const activities = [
  {
    title: "dashboard.activity.item1.title",
    subtitle: "dashboard.activity.item1.subtitle",
    time: "dashboard.activity.item1.time",
    type: "success",
    dotColor: "bg-green-600",
  },
  {
    title: "dashboard.activity.item2.title",
    subtitle: "dashboard.activity.item2.subtitle",
    time: "dashboard.activity.item2.time",
    type: "accent",
    dotColor: "bg-blue-600",
  },
  {
    title: "dashboard.activity.item3.title",
    subtitle: "dashboard.activity.item3.subtitle",
    time: "dashboard.activity.item3.time",
    type: "danger",
    dotColor: "bg-red-600",
  },
];
</script>

<style scoped></style>
