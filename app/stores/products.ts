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
      description: string;
    }>,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProducts() {
      try {
        this.loading = true;
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        // save to state
        this.products = data.map((p) => ({
          id: p.id,
          sku: `PROD-${p.id}`,
          name: p.title,
          category: p.category,
          price: p.price,
          stock: Math.floor(Math.random() * 100) + 1,
          status: Math.random() > 0.5 ? "Active" : "Inactive",
          image: p.image,
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
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
