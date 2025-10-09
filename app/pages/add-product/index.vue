<template>
  <div class="p-6 bg-[#F6FAFF] min-h-screen px-28">
    <!-- الفورم -->
    <form
      class="bg-white shadow-md md:w-1/2 mx-auto rounded-2xl p-6 space-y-6"
      @submit.prevent="handleSubmit">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- اسم المنتج بالعربية -->
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end"
            >اسم المنتج (بالعربية)</label
          >
          <input
            v-model="product.name_ar"
            type="text"
            placeholder="ادخل اسم المنتج"
            class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <!-- اسم المنتج بالانجليزية -->
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end"
            >اسم المنتج (بالإنجليزية)</label
          >
          <input
            v-model="product.name_en"
            type="text"
            placeholder="Enter Product Name"
            class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <!-- رمز المنتج -->

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end"
            >رمز المنتج (SKU)</label
          >
          <input
            v-model="product.sku"
            type="text"
            placeholder="PROD-001"
            class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <!-- الفئة -->
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end"
            >الفئة</label
          >
          <select
            v-model="product.category"
            class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option disabled value="">اختر الفئة</option>
            <option value="electronics">إلكترونيات</option>
            <option value="clothes">ملابس</option>
            <option value="food">أطعمة</option>
          </select>
        </div>
      </div>

      <p class="text-gray-500 text-sm text-end">يمكنك البحث باسم الفئة</p>

      <!-- السعر -->
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end"
            >السعر (ريال)</label
          >
          <input
            v-model.number="product.price"
            type="number"
            min="0"
            class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <!-- الكمية المتوفرة -->
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end"
            >الكمية المتوفرة</label
          >
          <input
            v-model.number="product.quantity"
            type="number"
            min="0"
            class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <!-- الوصف -->
      <div>
        <label class="block text-gray-700 font-medium mb-2 text-end"
          >الوصف</label
        >
        <textarea
          v-model="product.description"
          rows="3"
          placeholder="أدخل وصف المنتج"
          class="w-full border text-end border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <!-- الحالة -->
      <div>
        <label class="block text-gray-700 font-medium mb-2 text-end"
          >الحالة</label
        >
        <select
          v-model="product.status"
          class="border w-fit border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option disabled value="" class="text-end">اختر الحالة</option>
          <option value="Active">نشط (Active)</option>
          <option value="Inactive">غير نشط (Inactive)</option>
        </select>
      </div>

      <!-- زر الإضافة -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          إضافة المنتج
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useProductsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const router = useRouter();
const productsStore = useProductsStore();

const product = reactive({
  name_en: "",
  name_ar: "",
  category: "",
  sku: "",
  quantity: 0,
  price: 0,
  description: "",
  status: "",
});

definePageMeta({
  layout: "add-product",
});

const handleSubmit = () => {
  // check required fields
  if (
    !product.name_en ||
    !product.name_ar ||
    !product.category ||
    !product.sku ||
    !product.quantity ||
    !product.price ||
    !product.status
  ) {
    alert("يرجى ملء جميع الحقول المطلوبة!");
    return;
  }

  // add product to store
  productsStore.addProduct({ ...product });

  // clear form
  Object.keys(product).forEach((key) => {
    product[key] = key === "quantity" || key === "price" ? 0 : "";
  });

  // navigate to products management page
  router.push("/products-management");
};
</script>
