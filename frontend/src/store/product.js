import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // Create Product with FormData
  createProduct: async (newProduct) => {
    if (
      !newProduct.get("name") ||
      !newProduct.get("price") ||
      !newProduct.get("image")
    ) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: newProduct, // FormData directly
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to create product",
        };
      }

      set((state) => ({ products: [...state.products, data.product] }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: "Something went wrong" };
    }
  },

  // Fetch all products
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    if (data.success) set({ products: data.data });
  },

  // Delete a product
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  // Update a product (without image upload for now)
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.product : product
      ),
    }));

    return { success: true, message: "Product updated successfully" };
  },
}));
