<template>
  <div class="container mx-auto py-5 2xl:px-32 space-y-6 dark:bg-gray-900">
    <ConfirmDelete
      :show="showDeleteModal"
      :product="selectedProduct"
      @cancel="cancelDelete"
      @confirm="confirmDelete" />

    <!-- first part -->
    <div
      class="flex flex-col w-[100%] sm:w-full sm:flex-row sm:justify-between sm:items-center">
      <div class="text-start">
        <h1 class="md:text-3xl font-bold text-[#1C398E] dark:text-blue-400">
          {{ t("products.title") }}
        </h1>
        <p
          class="text-sm w-[16rem] md:w-full md:text-md text-[#1447E6] my-1 dark:text-blue-300">
          {{ t("products.subtitle") }}
        </p>
      </div>
      <UButton
        to="/dash-board"
        variant="outline"
        class="border w-fit border-gray-300 text-[#5881ff] px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors dark:border-gray-600 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
        {{ t("products.backToDashboard") }}
      </UButton>
    </div>

    <!-- second part -->
    <div
      class="flex flex-col sm:flex-row md:items-center w-[100%] sm:w-full gap-4 border border-gray-200 rounded-md p-4 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <!-- Search -->
      <div class="relative flex-1">
        <UInput
          v-model="searchInput"
          placeholder="Search by product name"
          icon="lucide:search"
          class="border border-gray-300 bg-white rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
      </div>

      <!-- Categories Dropdown -->
      <div class="flex justify-start items-center gap-3">
        <div ref="dropdownRef" class="relative">
          <button
            class="border border-gray-300 text-gray-700 text-sm md:text-base font-medium px-3 py-2 rounded-md bg-white hover:bg-gray-50 flex items-center gap-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-600"
            @click.stop="showDropdown = !showDropdown">
            {{ selectedCategory }}
            <Icon name="lucide:chevron-down" class="w-4 h-4" />
          </button>

          <transition name="fade">
            <div
              v-if="showDropdown"
              class="absolute left-0 mt-2 w-40 md:w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 dark:bg-gray-800 dark:border-gray-700">
              <button
                v-for="cat in categories"
                :key="cat"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 dark:text-gray-100 dark:hover:bg-blue-900"
                @click.stop="
                  selectCategory(cat);
                  showDropdown = false;
                ">
                {{ cat }}
              </button>
            </div>
          </transition>
        </div>

        <UButton
          to="/add-product"
          class="text-white md:text-base bg-blue-500 px-5 py-2 rounded-md dark:bg-blue-600 dark:hover:bg-blue-700">
          {{ t("products.addProduct") }}
        </UButton>
      </div>
    </div>

    <ViewProduct
      :show="showViewModal"
      :product="viewedProduct"
      @close="closeViewModal" />

    <!-- third part (table) -->
    <div
      class="border border-gray-200 rounded-md bg-white w-[100%] overflow-x-scroll sm:w-full shadow-sm md:overflow-x-auto dark:bg-gray-800 dark:border-gray-700">
      <table class="min-w-full border-collapse text-sm">
        <thead
          class="bg-blue-50 text-gray-700 font-medium dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th class="px-4 py-3 text-left rtl:text-right">
              {{ t("products.table.sku") }}
            </th>
            <th class="px-4 py-3 text-left rtl:text-right">
              {{ t("products.table.name") }}
            </th>
            <th class="px-4 py-3 text-left rtl:text-right">
              {{ t("products.table.category") }}
            </th>
            <th class="px-4 py-3 text-left rtl:text-right">
              {{ t("products.table.price") }}
            </th>
            <th class="px-4 py-3 text-left rtl:text-right">
              {{ t("products.table.stock") }}
            </th>
            <th class="px-4 py-3 text-left rtl:text-right">
              {{ t("products.table.status") }}
            </th>
            <th class="px-4 py-3 text-center">
              {{ t("products.table.actions") }}
            </th>
          </tr>
        </thead>

        <tbody v-if="productsStore.loading">
          <tr
            v-for="i in 5"
            :key="i"
            class="border-b border-gray-200 dark:border-gray-700">
            <td v-for="n in 7" :key="n" class="px-4 py-3">
              <USkeleton class="h-4 w-full rounded" />
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr
            v-for="product in paginatedProducts"
            :key="product.id"
            class="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
            <td class="ps-2 md:px-4 py-3 text-blue-600 dark:text-blue-400">
              {{ product.sku }}
            </td>
            <td class="px-2 md:px-4 py-3 md:font-medium dark:text-gray-100">
              {{ product.name.slice(0, 20) }}...
            </td>
            <td class="px-2 md:px-4 py-3 dark:text-gray-100">
              {{ product.category }}
            </td>
            <td class="px-2 md:px-4 py-3 dark:text-gray-100">
              {{ product.price }}
            </td>
            <td class="px-2 md:px-4 py-3 dark:text-gray-100">
              {{ product.stock }}
            </td>
            <td class="px-2 md:px-4 py-3">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-semibold',
                  product.status === 'Active'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
                ]">
                {{ product.status }}
              </span>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2 justify-center">
                <UButton
                  variant="ghost"
                  size="sm"
                  class="p-2 hover:bg-red-50 dark:hover:bg-red-900"
                  @click="
                    deleteProduct({ ...product, price: Number(product.price) })
                  ">
                  <Icon
                    name="lucide:trash-2"
                    class="w-4 h-4 text-red-600 dark:text-red-400" />
                </UButton>
                <UButton
                  variant="ghost"
                  size="sm"
                  class="p-2 hover:bg-blue-50 dark:hover:bg-blue-900"
                  @click="editProduct(product.id)">
                  <Icon
                    name="lucide:edit-3"
                    class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </UButton>
                <UButton
                  variant="ghost"
                  size="sm"
                  class="p-2 hover:bg-blue-50 dark:hover:bg-blue-900"
                  @click="viewProduct(product.id)">
                  <Icon
                    name="lucide:eye"
                    class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer -->
      <div
        class="flex w-[37rem] sm:w-full flex-col md:flex-row justify-center md:justify-between items-center bg-blue-50 px-4 py-3 text-sm dark:bg-gray-700">
        <span class="text-blue-600 dark:text-blue-300">
          {{ t("products.footer.showing") }} {{ paginatedProducts.length }}
          {{ t("products.footer.of") }} {{ filteredProducts.length }}
          {{ t("products.footer.products") }}
        </span>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex justify-center items-center gap-2 py-4">
          <button
            class="px-3 py-2.5 flex rounded-md border border-gray-300 hover:text-blue-500 hover:border-blue-400 disabled:border-slate-600 disabled:text-slate-600 disabled:opacity-50 transition-all dark:border-gray-600 dark:text-gray-100 dark:hover:text-blue-400"
            :disabled="currentPage === 1"
            @click="prevPage">
            <Icon
              name="lucide:chevron-left"
              :class="['w-4 h-4', locale === 'ar' ? 'rotate-180' : '']" />
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            :class="[
              'w-9 h-9 flex items-center justify-center rounded-md border transition-all',
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600',
            ]"
            @click="goToPage(page)">
            {{ page }}
          </button>

          <span
            v-if="endPage < totalPages"
            class="text-gray-500 dark:text-gray-400"
            >...</span
          >

          <button
            class="px-3 py-2.5 flex rounded-md border border-gray-300 hover:text-blue-500 hover:border-blue-400 disabled:border-slate-600 disabled:text-slate-600 disabled:opacity-50 transition-all dark:border-gray-600 dark:text-gray-100 dark:hover:text-blue-400"
            :disabled="currentPage === totalPages"
            @click="nextPage">
            <Icon
              name="lucide:chevron-right"
              :class="['w-4 h-4', locale === 'ar' ? 'rotate-180' : '']" />
          </button>
        </div>

        <div class="flex gap-6 text-blue-600 dark:text-blue-300">
          <span>{{ t("products.footer.totalStock") }}: {{ totalStock }}</span>
          <span>
            {{ t("products.footer.totalValue") }}: SAR {{ totalValue }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useProductsStore } from "@/stores/products";
import ConfirmDelete from "~/components/ConfirmDelete.vue";
import ViewProduct from "~/components/ViewProduct.vue";

definePageMeta({ layout: "dashboard" });

const productsStore = useProductsStore();
const router = useRouter();
const { locale, t } = useI18n();
const toast = useToast();

//
const searchInput = ref("");
const selectedCategory = ref("All Categories");
const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const categories = [
  "All Categories",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

// Handle category selection
function selectCategory(cat: string) {
  selectedCategory.value = cat;
}

// Handle click outside of dropdown
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  if (productsStore.products.length === 0) productsStore.fetchProducts();
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// filtered products based on search and category
const filteredProducts = computed(() => {
  return productsStore.products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());
    const matchCategory =
      selectedCategory.value === "All Categories" ||
      product.category === selectedCategory.value;
    return matchSearch && matchCategory;
  });
});

//  Pagination
const pageSize = 5;
const currentPage = ref(1);
const windowSize = 3; // Number of pages to display

const startPage = computed(() => {
  // the first page in the current window
  return Math.floor((currentPage.value - 1) / windowSize) * windowSize + 1;
});

const endPage = computed(() => {
  // the last page in the current window
  return Math.min(startPage.value + windowSize - 1, totalPages.value);
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / pageSize)
);

const visiblePages = computed(() => {
  // Pages to display in pagination
  const pages = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i);
  }
  return pages;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredProducts.value.slice(start, end);
});

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

// Modals
const showDeleteModal = ref(false);
const showViewModal = ref(false);
type Product = {
  id: number;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
};

const viewedProduct = ref<Product | null>(null); // Replace 'Product' with the actual type
const selectedProduct = ref<Product | null>(null);

function deleteProduct(product: Product) {
  selectedProduct.value = product;
  showDeleteModal.value = true;
}
function cancelDelete() {
  showDeleteModal.value = false;
  toast.add({
    title: "تم إلغاء حذف المنتج 🗑️",
    description: `لم يتم حذف المنتج "${selectedProduct.value?.name}".`,
    color: "warning",
    icon: "i-heroicons-trash",
    duration: 3000,
  });
}
function confirmDelete() {
  if (selectedProduct.value) {
    productsStore.deleteProduct(selectedProduct.value.id);
    showDeleteModal.value = false;

    toast.add({
      title: "تم حذف المنتج 🗑️",
      description: `تم حذف المنتج "${selectedProduct.value.name}" بنجاح.`,
      color: "success",
      icon: "i-heroicons-trash",
      duration: 3000,
    });
  }
}
function editProduct(id: number) {
  router.push(`/edit-product/${id}`);
}
function viewProduct(id: number) {
  const product = productsStore.viewProduct(id);
  if (product) {
    viewedProduct.value = {
      ...product,
      price: Number(product.price),
    };
    showViewModal.value = true;
  }
}
function closeViewModal() {
  showViewModal.value = false;
}

// Totals
const totalStock = computed(() =>
  productsStore.products.reduce((acc, p) => acc + p.stock, 0)
);
const totalValue = computed(() =>
  productsStore.products
    .reduce((acc, p) => acc + Number(p.price) * p.stock, 0)
    .toFixed(2)
);
</script>
