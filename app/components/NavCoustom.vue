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
        <Icon
          :name="iconName"
          class="w-6 h-6"
          :class="isEdit ? 'text-yellow-500' : 'text-blue-500'" />
      </div>

      <!-- Titles -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 leading-tight">
          {{ mainTitle }}
        </h2>
        <p class="text-sm text-gray-500">{{ subTitle }}</p>
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

// add or edit page
const isEdit = computed(() => route.name?.toString().includes("edit-product"));

// get product if edit page
const product = computed(() => {
  if (!isEdit.value) return null;
  const id = Number(route.params.id);
  return productsStore.products.find((p) => p.id === id);
});

// icon changes based on page
const iconName = computed(() =>
  isEdit.value ? "lucide:edit-3" : "lucide:plus"
);

// titles change based on page
const mainTitle = computed(() =>
  isEdit.value
    ? `تعديل المنتج ${product.value ? `(${product.value.name})` : ""}`
    : "إضافة منتج جديد"
);

const subTitle = computed(() =>
  isEdit.value ? "Edit Product" : "Add New Product"
);
</script>
