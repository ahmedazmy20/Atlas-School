<template>
  <div class="p-6 bg-[#F6FAFF] min-h-screen px-28">
    <!-- الفورم -->
    <form
      class="bg-white shadow-md md:w-1/2 mx-auto rounded-2xl p-6 space-y-6"
      @submit.prevent="handleSubmit">
      <!-- الاسم بالعربية والانجليزية -->
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            اسم المنتج (بالعربية)
          </label>
          <input
            v-model="product.name_ar"
            type="text"
            placeholder="ادخل اسم المنتج"
            class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            اسم المنتج (بالإنجليزية)
          </label>
          <input
            v-model="product.name_en"
            type="text"
            placeholder="Enter Product Name"
            class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <!-- رمز المنتج والفئة -->
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            رمز المنتج (SKU)
          </label>
          <input
            v-model="product.sku"
            type="text"
            placeholder="PROD-001"
            class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            الفئة
          </label>
          <select
            v-model="product.category"
            class="border w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option disabled value="">اختر الفئة</option>
            <option value="electronics">إلكترونيات</option>
            <option value="clothes">ملابس</option>
            <option value="food">أطعمة</option>
          </select>
        </div>
      </div>

      <!-- السعر والكمية -->
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            السعر (ريال)
          </label>
          <input
            v-model.number="product.price"
            type="number"
            min="0"
            step="any"
            class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            الكمية المتوفرة
          </label>
          <input
            v-model.number="product.quantity"
            type="number"
            min="0"
            class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <!-- الحالة -->
      <div>
        <label class="block text-gray-700 font-medium mb-2 text-end">
          الحالة
        </label>
        <select
          v-model="product.status"
          class="border w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option disabled value="" class="text-end">اختر الحالة</option>
          <option value="Active">نشط (Active)</option>
          <option value="Inactive">غير نشط (Inactive)</option>
        </select>
      </div>
      <!-- الوصف -->
      <div>
        <label class="block text-gray-700 font-medium mb-2 text-end">
          الوصف
        </label>
        <textarea
          v-model="product.description"
          rows="3"
          placeholder="أدخل وصف المنتج"
          class="w-full border text-end border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <!-- زر حفظ التغييرات -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          حفظ التغييرات
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useProductsStore } from "@/stores/products";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const productsStore = useProductsStore();
const toast = useToast();

// المنتج اللي هيتعدل
const product = reactive({
  id: 0,
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

// جلب بيانات المنتج حسب الـ id اللي جاي من الرابط
onMounted(() => {
  const productId = Number(route.params.id);
  const existingProduct = productsStore.viewProduct(productId);
  if (existingProduct) {
    Object.assign(product, {
      id: existingProduct.id,
      name_en: existingProduct.name,
      name_ar: existingProduct.name_ar || existingProduct.name,
      category: existingProduct.category,
      sku: existingProduct.sku,
      quantity: existingProduct.stock,
      price: Number(existingProduct.price),
      description: existingProduct.description || "",
      status: existingProduct.status,
    });
  } else {
    alert("المنتج غير موجود!");
    router.push("/products-management");
  }
});

const handleSubmit = () => {
  // sure all required fields are filled
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

  // update product in the store
  productsStore.updateProduct({
    id: product.id,
    name: product.name_en,
    category: product.category,
    sku: product.sku,
    stock: product.quantity,
    price: Number(product.price).toFixed(2),
    description: product.description,
    status: product.status,
  });
  toast.add({
    title: "تم الحفظ ✅",
    description: "تم حفظ التعديلات على المنتج بنجاح.",
    color: "success",
    icon: "i-heroicons-check-circle",
    duration: 3000,
  });
  router.push("/products-management");
};
</script>
