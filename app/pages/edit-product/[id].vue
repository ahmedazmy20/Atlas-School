<template>
  <div
    class="p-6 min-h-screen md:px-28 bg-[#F6FAFF] dark:bg-gray-800 transition-colors duration-300">
    <!-- الفورم -->
    <form
      class="bg-white dark:bg-gray-900 shadow-md md:w-11/12 lg:w-9/12 xl:w-6/12 mx-auto rounded-2xl p-6 space-y-6 transition-colors duration-300"
      @submit.prevent="handleSubmit">
      <!-- name in arabic and english -->
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label
            class="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-end">
            {{ $t('editProduct.nameAr') }}
          </label>
          <input
            v-model="product.name_ar"
            type="text"
            placeholder="ادخل اسم المنتج"
            class="w-full text-end border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label
            class="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-end">
            {{ $t('editProduct.nameEn') }}
          </label>
          <input
            v-model="product.name_en"
            type="text"
            placeholder="Enter Product Name"
            class="w-full text-end border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
      </div>

      <!-- sku and category -->
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label
            class="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-end">
            {{ $t('editProduct.sku') }}
          </label>
          <input
            v-model="product.sku"
            type="text"
            placeholder="PROD-001"
            class="w-full text-end border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label
            class="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-end">
            {{ $t('editProduct.category') }}
          </label>
          <select
            v-model="product.category"
            class="border w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            <option disabled value="">
              {{ $t('editProduct.selectCategory') }}
            </option>
            <option value="electronics">
              {{ $t('editProduct.categories.electronics') }}
            </option>
            <option value="clothes">
              {{ $t('editProduct.categories.clothes') }}
            </option>
            <option value="food">
              {{ $t('editProduct.categories.food') }}
            </option>
          </select>
        </div>
      </div>

      <!-- السعر والكمية -->
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label
            class="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-end">
            {{ $t('editProduct.price') }}
          </label>
          <input
            v-model.number="product.price"
            type="number"
            min="0"
            step="any"
            class="w-full text-end border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label
            class="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-end">
            {{ $t('editProduct.quantity') }}
          </label>
          <input
            v-model.number="product.quantity"
            type="number"
            min="0"
            class="w-full text-end border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
      </div>

      <!-- الحالة -->
      <div>
        <label
          class="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-end">
          {{ $t('editProduct.status') }}
        </label>
        <select
          v-model="product.status"
          class="border w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
          <option disabled value="" class="text-end">
            {{ $t('editProduct.selectStatus') }}
          </option>
          <option value="Active">{{ $t('editProduct.statusActive') }}</option>
          <option value="Inactive">
            {{ $t('editProduct.statusInactive') }}
          </option>
        </select>
      </div>

      <!-- الوصف -->
      <div>
        <label
          class="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-end">
          {{ $t('editProduct.description') }}
        </label>
        <textarea
          v-model="product.description"
          rows="3"
          :placeholder="$t('editProduct.descriptionPlaceholder')"
          class="w-full text-end border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
      </div>

      <!-- save changes btn -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800">
          {{ $t('editProduct.saveChanges') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const productsStore = useProductsStore()
const toast = useToast()

// المنتج اللي هيتعدل
const product = reactive({
  id: 0,
  name_en: '',
  name_ar: '',
  category: '',
  sku: '',
  quantity: 0,
  price: 0,
  description: '',
  status: '',
})

definePageMeta({
  layout: 'add-product',
})

// جلب بيانات المنتج حسب الـ id اللي جاي من الرابط
onMounted(() => {
  const productId = Number(route.params.id)
  const existingProduct = productsStore.viewProduct(productId)
  if (existingProduct) {
    Object.assign(product, {
      id: existingProduct.id,
      name_en: existingProduct.name,
      name_ar: existingProduct.name,
      category: existingProduct.category,
      sku: existingProduct.sku,
      quantity: existingProduct.stock,
      price: Number(existingProduct.price),
      description: existingProduct.description || '',
      status: existingProduct.status,
    })
  } else {
    alert('المنتج غير موجود!')
    router.push('/products-management')
  }
})

const handleSubmit = () => {
  if (
    !product.name_en ||
    !product.name_ar ||
    !product.category ||
    !product.sku ||
    !product.quantity ||
    !product.price ||
    !product.status
  ) {
    alert('يرجى ملء جميع الحقول المطلوبة!')
    return
  }

  productsStore.updateProduct({
    id: product.id,
    name: product.name_en,
    category: product.category,
    sku: product.sku,
    stock: product.quantity,
    price: Number(product.price).toFixed(2),
    description: product.description,
    status: product.status,
  })
  toast.add({
    title: 'تم الحفظ ✅',
    description: 'تم حفظ التعديلات على المنتج بنجاح.',
    color: 'success',
    icon: 'i-heroicons-check-circle',
    duration: 3000,
  })
  router.push('/products-management')
}
</script>
