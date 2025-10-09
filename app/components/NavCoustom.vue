<template>
  <nav
    class="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-start">
    <!-- Back Button -->
    <button
      class="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
      @click="goBack">
      <Icon name="lucide:arrow-left" class="w-5 h-5" />
      Back
    </button>

    <!-- Icon + Titles -->
    <div class="flex items-center gap-3 ml-8">
      <!-- Blue Box with Icon -->
      <div class="bg-blue-100 p-2 rounded-lg flex items-center justify-center">
        <Icon name="lucide:plus" class="w-6 h-6 text-blue-500" />
      </div>

      <!-- Titles -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 leading-tight">
          إضافة منتج جديد
        </h2>
        <p class="text-sm text-gray-500">Add New Product</p>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
