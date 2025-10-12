<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 mb-0 flex items-center justify-center bg-[#0000003f] bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2
          class="flex items-center gap-1 text-lg font-semibold text-gray-800 mb-4">
          <span
            class="text-red-500 bg-red-200 rounded-full w-8 h-8 flex items-center justify-center"
            >!</span
          >
          {{ $t("confirmDeletion.title") }}
        </h2>
        <p class="text-gray-600 mb-6">
          {{ $t("confirmDeletion.message") }}
          <span class="font-medium">{{ product?.name }}</span
          >?
        </p>
        <div class="flex justify-end gap-3">
          <UButton variant="outline" class="px-4 py-2" @click="$emit('cancel')">
            {{ $t("confirmDeletion.cancel") }}
          </UButton>
          <UButton
            class="px-4 py-2 text-white bg-red-500 hover:bg-red-800"
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
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
