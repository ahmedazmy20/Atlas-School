<script setup>
// import { ref } from "vue";
import { useRouter } from "vue-router";
import { School, BookOpen, User } from "lucide-vue-next";

// const id = ref("");
// const password = ref("");
const router = useRouter();

const user = useState("user", () => ({
  id: "",
  role: "",
  branch: "",
  arabicField: "",
  englishField: "",
}));

function goHome() {
  router.push("/dash-board");
}
</script>

<template>
  <form @submit.prevent="goHome">
    <!-- شرط: لو مفيش user.id → عرض login form -->
    <div
      class="flex flex-col bg-[#F8FAFC] justify-center items-center gap-3 md:min-w-md rounded-2xl px-8 py-10 mx-auto shadow-2xl">
      <!-- success Icon -->
      <div
        class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <span class="text-2xl text-green-600"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-9 h-9">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      </div>
      <h1 class="text-2xl font-bold">Welcome Back!</h1>
      <p class="text-gray-500">Ready to continue learning</p>

      <div class="input mt-8 w-full flex flex-col gap-4">
        <!-- Student Name & ID -->
        <div class="flex gap-3 bg-[#F1F5F9] p-3 rounded-lg">
          <div
            class="w-12 h-12 border border-blue-300 bg-[#DCE6F7] rounded-full flex items-center justify-center">
            <User class="text-blue-600 w-6 h-6" />
          </div>
          <div class="flex flex-col">
            <span class="font-medium text-gray-700">{{ user?.englishField }}</span>
            <span class="text-sm text-gray-500">ID: {{ user?.id }}</span>
          </div>
        </div>

        <!-- Position & Branch -->
        <div class="flex flex-col gap-3 bg-[#F1F5F9] p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <BookOpen class="text-[#64748B] w-4 h-4" />
            <span class="text-slate-500"> Position: </span>
            <span
              class="text-sm font-medium text-blue-400 ms-2 bg-[#DCE6F7] px-2 rounded-md"
              >{{ user?.role }}</span
            >
          </div>

          <div class="flex items-center gap-2">
            <School class="text-[#64748B] w-4 h-4" />
            <span class="text-slate-500"> Branch: </span>
            <span
              class="text-sm font-medium text-blue-400 ms-2 border border-gray-300 px-2 rounded-md"
              >{{ user?.branch }}</span
            >
          </div>
        </div>

        <UButton
          class="mt-4 w-full bg-[#2B67EC] hover:bg-[#2B67EC]/90 active:bg-[#2B67EC]/80 flex items-center justify-center py-3"
          @click="goHome">
          <span>Enter Dashboard</span>
        </UButton>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
