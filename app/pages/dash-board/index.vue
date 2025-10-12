<template>
  <div class="container mx-auto min-h-screen py-4 2xl:px-32 space-y-8">
    <!-- sec 1 top -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- left -->
      <div class="">
        <p class="text-sm text-blue-600 font-semibold">
          {{ t("dashboard.date") }}
        </p>
        <h2 class="text-3xl text-blue-900 font-bold mt-2">
          {{ t("dashboard.greeting") }}
        </h2>
        <p class="text-blue-600 mt-3 pe-5">
          {{ t("dashboard.welcome") }}
        </p>
      </div>

      <!-- right -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          class="flex bg-[#002be9c2] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 items-center justify-between text-white px-6 py-10 rounded-2xl shadow-sm border">
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
          class="flex group hover:bg-[#002be9c2] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 items-center justify-between bg-[#00AFE9] text-white px-6 py-10 rounded-2xl shadow-sm border">
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
      <div class="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
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
        class="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
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

    <!-- sec 3 bottom -->
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
            class="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded-md"
            >{{ t("dashboard.notifications.buttons.unread") }} ({{
              unreadCount
            }})</span
          >
        </div>
      </div>

      <!-- notification list -->
      <div class="space-y-2 px-6">
        <div
          v-for="(note, index) in pagedNotifications"
          :key="index"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition cursor-pointer">
          <!-- date box -->
          <div
            class="min-w-[130px] flex gap-1 bg-blue-50 text-blue-700 text-xs rounded-md p-2 border border-blue-200 text-center">
            <div>{{ t(note.dateShort) }}</div>
            <div class="text-xs">{{ t(note.time) }}</div>
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

      <!-- pagination -->
      <div class="flex items-center bg-blue-50 py-3 justify-center mt-4">
        <button
          class="px-3 py-1 rounded-md hover:bg-gray-100"
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
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700',
            ]"
            @click="goToPage(p)">
            {{ p }}
          </button>
        </div>

        <button
          class="px-3 py-1 rounded-md hover:bg-gray-100"
          @click="nextPage">
          <Icon
            name="lucide:chevron-right"
            :class="['w-4 h-4', locale === 'ar' ? 'rotate-180' : '']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
// import locale for pagination direction
const { locale, t } = useI18n();
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

// simulated api notifications
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

const unreadCount = computed(() => notifications.value.length);

// pagination functions
const pageSize = 3;
const currentPage = ref(1);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(notifications.value.length / pageSize))
);

const pagedNotifications = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return notifications.value.slice(start, start + pageSize);
});

function goToPage(p: number) {
  if (p >= 1 && p <= totalPages.value) currentPage.value = p;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
</script>

<style scoped></style>
