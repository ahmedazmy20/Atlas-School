import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Array<{
      id: number;
      sku: string;
      name: string;
      category: string;
      price: string;
      stock: number;
      status: string;
      image: string;
    }>,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    fetchProducts: async function () {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        this.products = data.map((p: any, i: number) => ({
          id: p.id, // هنا استخدمنا id من API
          sku: `SKU${String(i + 1).padStart(3, "0")}`,
          name: p.title,
          category: p.category,
          price: Number(p.price).toFixed(2),
          stock: Math.floor(Math.random() * 100) + 10,
          status: Math.random() > 0.3 ? "Active" : "Inactive",
          image: p.image,
        }));
      } catch (err) {
        this.error = "Failed to load products.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    // Delete by ID
    deleteProduct(id: number) {
      this.products = this.products.filter((p) => p.id !== id);
    },

    // Add new product

    addProduct(newProduct: {
      name_en: string;
      name_ar: string;
      sku: string;
      category: string;
      price: number | string;
      quantity: number;
      status: string;
      description: string;
    }) {
      const id = this.products.length
        ? Math.max(...this.products.map((p) => p.id)) + 1
        : 1;

      this.products.push({
        id,
        sku: newProduct.sku,
        name: newProduct.name_en, // ممكن تختار تعرض الاسم الانجليزي
        category: newProduct.category,
        price: Number(newProduct.price).toFixed(2),
        stock: newProduct.quantity,
        status: newProduct.status,
        image: "", // ممكن تضيف رابط الصورة لو عندك
        description: newProduct.description,
      });
    },

    // Update by ID
    updateProduct(updatedProduct: {
      id: number;
      name?: string;
      category?: string;
      price?: string;
      stock?: number;
      status?: string;
      image?: string;
    }) {
      const index = this.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
      }
    },

    // View by ID
    viewProduct(id: number) {
      return this.products.find((p) => p.id === id) || null;
    },
  },
});
