<template>
  <div class="bg-white py-6 rounded-2xl border border-gray-300 shadow-sm">
    <!-- notification header -->
    <div class="flex items-center bg-blue-50 py-3 px-6 justify-between mb-4">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-md bg-blue-400 text-white flex items-center justify-center">
          <Icon name="lucide:bell" class="w-5 h-5" />
        </div>
        <h3 class="text-lg font-semibold text-[#1C398E]">
          {{ t("dashboard.notifications.title") }}
        </h3>
      </div>

      <div class="flex items-center gap-3">
        <button class="bg-blue-600 text-white text-sm px-3 py-1 rounded-md">
          {{ t("dashboard.notifications.buttons.all") }}
        </button>
        <span
          class="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded-md">
          {{ t("dashboard.notifications.buttons.unread") }} ({{ unreadCount }})
        </span>
      </div>
    </div>

    <!-- notification list -->
    <div class="space-y-2 px-6">
      <div
        v-for="note in pagedNotifications"
        :key="note.id"
        class="flex flex-col lg:flex-row lg:items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition cursor-pointer">
        <!-- date box -->
        <div
          class="min-w-[130px] flex gap-1 bg-blue-50 text-blue-700 text-xs rounded-md p-2 border border-blue-200 text-center">
          <div>{{ note.dateShort }}</div>
          <div class="text-xs">{{ note.time }}</div>
        </div>

        <!-- icon & text -->
        <div class="flex items-start gap-3 flex-1">
          <div
            class="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center">
            <Icon name="lucide:alert-circle" class="w-5 h-5" />
          </div>
          <div class="text-left rtl:text-right">
            <div class="font-medium text-[#193CB8]">{{ t(note.title) }}</div>
            <div class="text-sm text-[#155DFC]">{{ t(note.message) }}</div>
          </div>
        </div>

        <!-- action -->
        <div class="flex items-center gap-2">
          <button
            class="text-xs px-3 py-1 border border-gray-300 text-[#294db8] font-semibold rounded-md">
            {{ t("dashboard.notifications.view") }}
          </button>
          <span class="w-3 h-3 rounded-full bg-blue-600" />
        </div>
      </div>
    </div>

    <!-- pagination controls -->
    <div class="flex items-center bg-blue-50 py-3 justify-center mt-4">
      <button
        class="px-3 py-2 flex rounded-md border border-gray-400 hover:border-blue-400 hover:text-blue-400 transition-all"
        @click="prevPage">
        <Icon
          name="lucide:chevron-left"
          :class="['w-4 h-4', locale === 'ar' ? 'rotate-180' : '']" />
      </button>

      <div class="flex items-center gap-2 mx-3">
        <button
          v-for="p in totalPages"
          :key="p"
          :class="[
            'w-9 h-9 flex items-center justify-center rounded-md border',
            currentPage === p
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-200',
          ]"
          @click="goToPage(p)">
          {{ p }}
        </button>
      </div>

      <button
        class="px-3 py-2 flex rounded-md hover:bg-gray-100 border border-gray-400 hover:border-blue-400 hover:text-blue-400 transition-all"
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

const totalPages = computed(
  () => Math.max(1, Math.ceil(notifications.value.length / pageSize)) // Ensure at least 1 page
);

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

<!-- pagination with NuxtUi UPagination -->
<!-- 
<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50 py-10">
    <div class="bg-white shadow p-6 rounded-2xl w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-4 text-center">
        الصفحة رقم {{ currentPage }}
      </h2>

      <ul class="space-y-3">
        <li
          v-for="(student, index) in paginatedStudents"
          :key="index"
          class="border rounded-lg p-3 text-right bg-gray-50"
        >
          <p class="font-bold">👨‍🎓 {{ student.name }}</p>
          <p class="text-gray-600">{{ student.message }}</p>
        </li>
      </ul>
    </div>

    <UPagination
      :page="currentPage"
      :total="students.length"
      :page-size="itemsPerPage"
      :show-edges="true"
      :show-controls="true"
      class="mt-4"
      @update:page="handlePageChange"
    />
  </div>
</template> -->

<!-- <script setup>
import { ref, computed } from "vue";

const students = ref(
  Array.from({ length: 50 }, (_, i) => ({
    name: `الطالب رقم ${i + 1}`,
    message: `هذه رسالة من الطالب رقم ${i + 1}`,
  }))
);

const itemsPerPage = ref(5);
const currentPage = ref(1);

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return students.value.slice(start, end);
});

function handlePageChange(page) {
  currentPage.value = page;
}
</script> -->

<!-- <style scoped>
:deep(.u-pagination) {
  --ui-primary: #2563eb;
}
</style> -->
