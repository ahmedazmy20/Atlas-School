<template>
  <div class="container mx-auto py-5 px-32 space-y-6">
    <ConfirmDelete
      :show="showDeleteModal"
      :product="selectedProduct"
      @cancel="cancelDelete"
      @confirm="confirmDelete" />

    <!-- first part -->
    <div class="flex justify-between items-center">
      <div class="text-start">
        <h1 class="text-3xl font-bold text-[#1C398E]">Products Management</h1>
        <p class="text-md text-[#1447E6] mt-1">
          Manage school products, inventory, and pricing
        </p>
      </div>
      <UButton
        to="/dash-board"
        variant="outline"
        class="border border-gray-300 text-[#5881ff] px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors">
        Back to Dashboard
      </UButton>
    </div>

    <!-- second part -->
    <div
      class="flex items-center gap-4 border border-gray-200 rounded-md p-4 bg-white shadow-sm">
      <!-- Search -->
      <div class="relative flex-1">
        <UInput
          v-model="searchInput"
          placeholder="Search by product name, SKU..."
          icon="lucide:search"
          class="border border-gray-300 bg-white rounded-md w-full" />
      </div>

      <!-- Categories Dropdown -->
      <div class="flex justify-start items-center gap-3">
        <!-- Dropdown -->
        <div ref="dropdownRef" class="relative">
          <button
            class="border border-gray-300 text-gray-700 font-medium px-3 py-2 rounded-md bg-white hover:bg-gray-50 flex items-center gap-1"
            @click.stop="showDropdown = !showDropdown">
            {{ selectedCategory }}
            <Icon name="lucide:chevron-down" class="w-4 h-4" />
          </button>

          <transition name="fade">
            <div
              v-if="showDropdown"
              class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <button
                v-for="cat in categories"
                :key="cat"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                @click.stop="
                  selectCategory(cat);
                  showDropdown = false;
                ">
                {{ cat }}
              </button>
            </div>
          </transition>
        </div>

        <!-- Add Product -->
        <UButton
          to="/add-product"
          class="text-white bg-blue-500 px-5 py-2 rounded-md">
          + Add Product
        </UButton>
      </div>
    </div>

    <ViewProduct
      :show="showViewModal"
      :product="viewedProduct"
      @close="closeViewModal" />

    <!-- third part (table) -->
    <div
      class="border border-gray-200 rounded-md bg-white shadow-sm overflow-x-auto">
      <table class="min-w-full border-collapse text-sm">
        <!-- Table Header -->
        <thead class="bg-blue-50 text-gray-700 font-medium">
          <tr>
            <th class="px-4 py-3 text-left">SKU</th>
            <th class="px-4 py-3 text-left">Product Name</th>
            <th class="px-4 py-3 text-left">Category</th>
            <th class="px-4 py-3 text-left">Price (SAR)</th>
            <th class="px-4 py-3 text-left">Stock</th>
            <th class="px-4 py-3 text-left">Status</th>
            <th class="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody>
          <tr
            v-for="product in filteredProducts"
            :key="product.id"
            class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-4 py-3 text-blue-600">{{ product.sku }}</td>
            <td class="px-4 py-3 font-medium">
              {{ product.name.slice(0, 20) }} ...
            </td>
            <td class="px-4 py-3">{{ product.category }}</td>
            <td class="px-4 py-3">{{ product.price }}</td>
            <td class="px-4 py-3">{{ product.stock }}</td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-semibold',
                  product.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600',
                ]">
                {{ product.status }}
              </span>
            </td>

            <!-- Actions -->
            <td class="px-4 py-3">
              <div class="flex gap-2 justify-center">
                <UButton
                  variant="ghost"
                  size="sm"
                  class="p-2 hover:bg-red-50"
                  @click="deleteProduct(product)">
                  <Icon name="lucide:trash-2" class="w-4 h-4 text-red-600" />
                </UButton>

                <UButton
                  variant="ghost"
                  size="sm"
                  class="p-2 hover:bg-blue-50"
                  @click="editProduct(product.id)">
                  <Icon name="lucide:edit-3" class="w-4 h-4 text-blue-600" />
                </UButton>

                <UButton
                  variant="ghost"
                  size="sm"
                  class="p-2 hover:bg-blue-50"
                  @click="viewProduct(product.id)">
                  <Icon name="lucide:eye" class="w-4 h-4 text-blue-600" />
                </UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Table Footer -->
      <div
        class="flex justify-between items-center border-t bg-blue-50 px-4 py-3 text-sm">
        <span class="text-blue-600">
          Showing {{ filteredProducts.length }} of
          {{ productsStore.products.length }} products
        </span>
        <div class="flex gap-6 text-blue-600">
          <span>Total Stock: {{ totalStock }} units</span>
          <span>Total Value: SAR {{ totalValue }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/products";
import ConfirmDelete from "~/components/ConfirmDelete.vue";
import ViewProduct from "~/components/ViewProduct.vue";

definePageMeta({
  layout: "dashboard",
});

const productsStore = useProductsStore();

// State
const searchInput = ref("");
const selectedCategory = ref("All Categories");
const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const router = useRouter();

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

// ✅ يقفل لما تضغط برا الـ dropdown
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Delete & View modals
const showDeleteModal = ref(false);
const showViewModal = ref(false);
const viewedProduct = ref<null | (typeof productsStore.products)[0]>(null);
const selectedProduct = ref<null | { id: number; name: string }>(null);

// Fetch data
onMounted(() => {
  if (productsStore.products.length === 0) {
    productsStore.fetchProducts();
  }
});

// Delete
function deleteProduct(product: { id: number; name: string }) {
  selectedProduct.value = product;
  showDeleteModal.value = true;
}
function cancelDelete() {
  showDeleteModal.value = false;
  selectedProduct.value = null;
}
function confirmDelete() {
  if (selectedProduct.value) {
    productsStore.deleteProduct(selectedProduct.value.id);
    showDeleteModal.value = false;
    selectedProduct.value = null;
  }
}

// Edit / View
function editProduct(id: number) {
  const product = productsStore.viewProduct(id);
  if (product) console.log("Edit Product:", product);
  router.push(`/edit-product/${id}`);
}
function viewProduct(id: number) {
  const product = productsStore.viewProduct(id);
  if (product) {
    viewedProduct.value = product;
    showViewModal.value = true;
  }
}
function closeViewModal() {
  showViewModal.value = false;
  viewedProduct.value = null;
}

// ✅ Filter logic (Search + Category)
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
