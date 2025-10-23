<template>
  <nav
    class="w-full bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800 py-4 px-8 flex gap-6 items-center justify-start transition-colors duration-300">
    <!-- Back Button -->
    <button
      class="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
      @click="goBack">
      <Icon name="lucide:arrow-left" class="w-5 h-5 rtl:rotate-180" />
      {{ $t("productNav.back") }}
    </button>

    <!-- Icon + Titles -->
    <div class="flex items-center gap-3">
      <!-- Blue Box with Icon -->
      <div
        class="p-2 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 transition-colors">
        <Icon
          :name="iconName"
          class="w-6 h-6"
          :class="isEdit ? 'text-yellow-500' : 'text-blue-500'" />
      </div>

      <!-- Titles -->
      <div>
        <h2
          class="md:text-xl font-semibold text-gray-800 dark:text-gray-100 leading-tight">
          {{ mainTitle }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ subTitle }}
        </p>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductsStore } from "@/stores/products";

const router = useRouter();
const route = useRoute();
const productsStore = useProductsStore();

const goBack = () => {
  router.back();
};

// indicate if the page is edit or add
const isEdit = computed(() => route.name?.toString().includes("edit-product"));

// get the product based on the id
const product = computed(() => {
  if (!isEdit.value) return null;
  const id = Number(route.params.id);
  return productsStore.products.find((p) => p.id === id);
});

// icon based on the page is edit or add
const iconName = computed(() =>
  isEdit.value ? "lucide:edit-3" : "lucide:plus"
);

// the main title based on the page is edit or add
const mainTitle = computed(() =>
  isEdit.value
    ? ` ${product.value ? `(${product.value.name.slice(0, 20)})` : ""}`
    : ` ${$t("productNav.add.mainTitle")}`
);

// the sub title based on the page is edit or add
const subTitle = computed(() =>
  isEdit.value ? "Edit Product" : "Add New Product"
);
</script>
