<template>
  <div
    class="bg-white dark:bg-[#121023] py-6 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-sm transition-colors duration-300">
    <!-- notification header -->
    <div
      class="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center bg-blue-50 dark:bg-[#2a2a3a] py-3 px-6 justify-between mb-4 transition-colors duration-300">
      <div class="flex items-center gap-3">
        <div
          class="p-2 md:p-3 rounded-md bg-blue-400 text-white flex items-center justify-center">
          <Icon name="lucide:bell" class="md:w-5 md:h-5" />
        </div>
        <h3
          class="text-sm md:text-lg font-semibold text-[#1C398E] dark:text-blue-300 transition-colors duration-300">
          {{ t("dashboard.notifications.title") }}
        </h3>
      </div>

      <div class="flex items-center gap-3">
        <button
          class="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition">
          {{ t("dashboard.notifications.buttons.all") }}
        </button>
        <span
          class="text-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-md">
          {{ t("dashboard.notifications.buttons.unread") }} ({{ unreadCount }})
        </span>
      </div>
    </div>

    <!-- notification list -->
    <div class="space-y-2 px-6">
      <div
        v-for="note in pagedNotifications"
        :key="note.id"
        class="flex flex-col lg:flex-row lg:items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-[#2f2f3f] transition cursor-pointer">
        <!-- date box -->
        <div
          class="min-w-[130px] flex gap-1 bg-blue-50 dark:bg-[#2d2d3a] text-blue-700 dark:text-blue-300 text-xs rounded-md p-2 border border-blue-200 dark:border-blue-700 text-center transition-colors duration-300">
          <div>{{ note.dateShort }}</div>
          <div class="text-xs">{{ note.time }}</div>
        </div>

        <!-- icon & text -->
        <div class="flex items-start gap-3 flex-1">
          <div
            class="p-2 rounded-full bg-blue-400 text-white flex items-center justify-center">
            <Icon name="lucide:alert-circle" class="w-5 h-5" />
          </div>
          <div class="text-left rtl:text-right">
            <div
              class="font-medium text-[#193CB8] dark:text-blue-300 transition-colors duration-300">
              {{ t(note.title) }}
            </div>
            <div
              class="text-sm text-[#155DFC] dark:text-blue-400 transition-colors duration-300">
              {{ t(note.message) }}
            </div>
          </div>
        </div>

        <!-- action -->
        <div class="flex items-center gap-2">
          <button
            class="text-xs px-3 py-1 border border-gray-300 dark:border-gray-600 text-[#294db8] dark:text-blue-300 font-semibold rounded-md hover:border-blue-400 dark:hover:border-blue-500 transition">
            {{ t("dashboard.notifications.view") }}
          </button>
          <span class="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400" />
        </div>
      </div>
    </div>

    <!-- pagination controls -->
    <div
      class="flex items-center bg-blue-50 dark:bg-[#2a2a3a] py-3 justify-center mt-4 transition-colors duration-300">
      <!-- Prev Button -->
      <button
        class="px-1 py-1 md:px-3 md:py-2 flex rounded-md border border-gray-400 dark:border-gray-600 hover:border-blue-400 hover:text-blue-400 dark:hover:text-blue-300 transition-all"
        :disabled="currentPage === 1"
        @click="prevPage">
        <Icon
          name="lucide:chevron-left"
          :class="['w-4 h-4', locale === 'ar' ? 'rotate-180' : '']" />
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center gap-2 mx-3">
        <button
          v-for="p in visiblePages"
          :key="p"
          :class="[
            'w-6 h-6 md:w-9 md:h-9 flex items-center justify-center rounded-md border transition-all',
            currentPage === p
              ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500'
              : 'bg-white dark:bg-[#1e1e1e] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-300',
          ]"
          @click="goToPage(p)">
          {{ p }}
        </button>

        <!-- Dots (...) -->
        <span
          v-if="endPage < totalPages"
          class="text-gray-500 dark:text-gray-400"
          >...</span
        >
      </div>

      <!-- Next Button -->
      <button
        class="px-1 py-1 md:px-3 md:py-2 flex rounded-md border border-gray-400 dark:border-gray-600 hover:border-blue-400 hover:text-blue-400 dark:hover:text-blue-300 transition-all"
        :disabled="currentPage === totalPages"
        @click="nextPage">
        <Icon
          name="lucide:chevron-right"
          :class="['w-4 h-4', locale === 'ar' ? 'rotate-180' : '']" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();

//  Sample notifications data for pagination
const notifications = ref([
  {
    id: 1,
    dateShort: "Mon, Sep 1, 2025",
    time: "12:23 PM",
    title: "dashboard.notifications.items.withdrawRequest",
    message: "dashboard.notifications.items.withdrawRequest",
  },
  {
    id: 2,
    dateShort: "Tue, Sep 2, 2025",
    time: "09:15 AM",
    title: "dashboard.notifications.items.newStudent",
    message: "dashboard.notifications.items.newStudent",
  },
  {
    id: 3,
    dateShort: "Wed, Sep 3, 2025",
    time: "04:50 PM",
    title: "dashboard.notifications.items.paymentReceived",
    message: "dashboard.notifications.items.paymentReceived",
  },
  {
    id: 4,
    dateShort: "Thu, Sep 4, 2025",
    time: "10:32 AM",
    title: "dashboard.notifications.items.courseUpdate",
    message: "dashboard.notifications.items.courseUpdate",
  },
  {
    id: 5,
    dateShort: "Fri, Sep 5, 2025",
    time: "02:10 PM",
    title: "dashboard.notifications.items.newMessage",
    message: "dashboard.notifications.items.newMessage",
  },
  {
    id: 6,
    dateShort: "Sat, Sep 6, 2025",
    time: "08:45 AM",
    title: "dashboard.notifications.items.withdrawalApproved",
    message: "dashboard.notifications.items.withdrawalApproved",
  },
  {
    id: 7,
    dateShort: "Sun, Sep 7, 2025",
    time: "06:20 PM",
    title: "dashboard.notifications.items.newComment",
    message: "dashboard.notifications.items.newComment",
  },
  {
    id: 8,
    dateShort: "Mon, Sep 8, 2025",
    time: "11:55 AM",
    title: "dashboard.notifications.items.maintenance",
    message: "dashboard.notifications.items.maintenance",
  },
  {
    id: 9,
    dateShort: "Tue, Sep 9, 2025",
    time: "03:37 PM",
    title: "dashboard.notifications.items.newEnrollment",
    message: "dashboard.notifications.items.newEnrollment",
  },
  {
    id: 10,
    dateShort: "Wed, Sep 10, 2025",
    time: "09:10 AM",
    title: "dashboard.notifications.items.pendingRequest",
    message: "dashboard.notifications.items.pendingRequest",
  },
]);

const unreadCount = computed(() => notifications.value.length); // Example count
const pageSize = 3; // Notifications per page
const currentPage = ref(1); // Current page number
const windowSize = 3; // Number of pages to display

const startPage = computed(() => {
  // the first page in the current window
  return Math.floor((currentPage.value - 1) / windowSize) * windowSize + 1;
});

const endPage = computed(() => {
  // the last page in the current window
  return Math.min(startPage.value + windowSize - 1, totalPages.value);
});
const totalPages = computed(
  () => Math.max(1, Math.ceil(notifications.value.length / pageSize)) // Ensure at least 1 page
);

const visiblePages = computed(() => {
  // Pages to display in pagination
  const pages = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i);
  }
  return pages;
});

const pagedNotifications = computed(() => {
  const start = (currentPage.value - 1) * pageSize; // Calculate start index
  return notifications.value.slice(start, start + pageSize); // Return sliced array
});

function goToPage(p: number) {
  if (p >= 1 && p <= totalPages.value) currentPage.value = p; // Validate and set page
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--; // Decrement page if possible
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++; // Increment page if possible
}
</script>
