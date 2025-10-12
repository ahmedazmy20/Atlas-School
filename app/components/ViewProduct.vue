<template>
  <div
    v-if="show"
    class="fixed inset-0 mb-0 bg-[#0000003f] bg-opacity-50 flex justify-center items-center z-50">
    <div
      class="bg-white rounded-lg w-11/12 sm:w-3/4 lg:w-1/3 p-6 relative shadow-lg max-h-[80vh] overflow-y-auto">
      <h2 class="text-2xl font-semibold mb-4">{{ $t("viewProduct.title") }}</h2>

      <!-- Close button -->
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
        @click="$emit('close')">
        <!-- add close icon-->
        <Icon name="lucide:x" class="w-5 h-5" />
      </button>

      <div class="space-y-5">
        <div v-if="product?.image" class="flex justify-center">
          <img
            :src="product.image"
            alt="Product Image"
            class="w-32 h-32 object-contain rounded border border-gray-200" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- Left side -->
          <div class="space-y-5">
            <div>
              <h3 class="text-blue-500">
                {{ $t("viewProduct.leftSide.nameEn") }}
              </h3>
              <p class="p-2 bg-gray-200 rounded-md">
                {{ product?.name?.slice(0, 20) }}...
              </p>
            </div>
            <div>
              <h3 class="text-blue-500">
                {{ $t("viewProduct.leftSide.sku") }}
              </h3>
              <p class="p-2 bg-gray-200 rounded-md">
                {{ product?.sku }}
              </p>
            </div>
            <div>
              <h3 class="text-blue-500">
                {{ $t("viewProduct.leftSide.categoryEn") }}
              </h3>
              <p class="p-2 bg-gray-200 rounded-md">
                {{ product?.category }}
              </p>
            </div>
            <div>
              <h3 class="text-blue-500">
                {{ $t("viewProduct.leftSide.price") }}
              </h3>
              <p class="p-2 bg-gray-200 rounded-md">{{ product?.price }} SAR</p>
            </div>
          </div>

          <!-- Right side -->
          <div>
            <div class="space-y-5">
              <div>
                <h3 class="text-blue-500">
                  {{ $t("viewProduct.rightSide.nameAr") }}
                </h3>
                <p class="p-2 bg-gray-200 rounded-md">
                  {{ product?.name?.slice(0, 20) }}...
                </p>
              </div>
              <div>
                <h3 class="text-blue-500">
                  {{ $t("viewProduct.rightSide.status") }}
                </h3>
                <p class="p-2 bg-gray-200 rounded-md">
                  {{ product?.status }}
                </p>
              </div>
              <div>
                <h3 class="text-blue-500">
                  {{ $t("viewProduct.rightSide.categoryAr") }}
                </h3>
                <p class="p-2 bg-gray-200 rounded-md">
                  {{ product?.category }}
                </p>
              </div>
              <div>
                <h3 class="text-blue-500">
                  {{ $t("viewProduct.rightSide.stock") }}
                </h3>
                <p class="p-2 bg-gray-200 rounded-md">
                  {{ product?.stock }} {{ $t("viewProduct.units") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-blue-500">{{ $t("viewProduct.description") }}</h3>
          <p class="p-2 bg-gray-200 rounded-md">
            {{ product?.name?.slice(0, 30) }}...
          </p>
        </div>

        <div class="flex justify-between p-2 bg-gray-200 rounded-md">
          <h3 class="text-blue-500">{{ $t("viewProduct.totalInventoryValue") }}</h3>
          <p class="">
            {{ totalInventoryValue(product?.price, product?.stock) }} SAR
          </p>
        </div>

        <div
          class="flex justify-center items-center gap-3 border-t border-gray-200 py-5">
          <!-- add close button -->
          <button
            class="w-sm text-blue-500 border border-gray-200 py-2 rounded-md hover:bg-blue-600 hover:text-white transition-all"
            @click="$emit('close')">
            {{ $t("viewProduct.close") }}
          </button>
          <!-- add Edit Product button -->
          <button
            class="w-sm flex items-center justify-center gap-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            @click="goToEdit(product?.id)">
            <Icon name="lucide:edit" class="w-5 h-5" />
            {{ $t("viewProduct.editProduct") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
}
const totalInventoryValue = (
  price: number | undefined,
  stock: number | undefined
) => {
  if (price === undefined || stock === undefined) return 0;
  return price * stock;
};

defineProps<{
  show: boolean;
  product: Product | null;
}>();

defineEmits<{
  (e: "close"): void;
}>();

function goToEdit(id?: number) {
  if (!id) return;
  router.push(`/edit-product/${id}`);
}
</script>
