<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 mb-0 flex items-center justify-center px-8 md:px-0 bg-black/40 dark:bg-black/70 z-50 transition-colors">
      <div
        class="bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-gray-800 p-6 w-96 transition-colors duration-300">
        <!-- Title -->
        <h2
          class="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          <span
            class="text-red-500 bg-red-100 dark:bg-red-900/40 rounded-full w-8 h-8 flex items-center justify-center">
            !
          </span>
          {{ $t("confirmDeletion.title") }}
        </h2>

        <!-- Message -->
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ $t("confirmDeletion.message") }}
          <span class="font-medium text-gray-800 dark:text-gray-100">
            {{ product?.name }} </span
          >?
        </p>

        <!-- Buttons -->
        <div class="flex justify-end gap-3">
          <UButton
            variant="outline"
            class="px-4 py-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            @click="$emit('cancel')">
            {{ $t("confirmDeletion.cancel") }}
          </UButton>

          <UButton
            class="px-4 py-2 text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition"
            @click="$emit('confirm')">
            <Icon name="lucide:trash-2" class="w-4 h-4 mr-1" />
            {{ $t("confirmDeletion.delete") }}
          </UButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  product: { id: number; name: string } | null;
}>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
