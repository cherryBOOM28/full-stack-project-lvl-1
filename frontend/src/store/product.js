import axios from 'axios'
import { create } from 'zustand'

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async(newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: 'Please fill in all fields.'}
        }

        try {
            const response = await axios.post('/api/products', newProduct)
            set((state) => ({products: [...state.products, response.data.data]}))
            return { success: true, message: "Product created successfully!" };
        } catch (error) {
            console.error("Error creating product:", error);
            return { success: false, message: "Failed to create product." };
        }
    },

    fetchProducts: async () => {
        try {
            const response = await axios.get('/api/products')

            const products = response.data.data || response.data;

            set({ products})
           
        } catch (error) {
            console.error("Error getting products:", error);
            return { success: false, message: "Failed to create product." };
        }
    },

    deleteProducts: async (pid) => {
        try {
            const response = await axios.delete(`/api/products/${pid}`)

            const data = response.data.data || response.data;

            if(!data.success) {
                return { success: false, message: data.message };
            }

            // update the UI immediatly, without a needing a refresh
            set(state => ({ products: state.products.filter(product => product._id !== pid) }))
            return { success: true, message: data.message };
           
        } catch (error) {
            console.error("Error getting products:", error);
            return { success: false, message: "Failed to create product." };
        }
    },

    updateProduct: async (pid, updatedProduct) => {
        try {
            const response = await axios.put(`/api/products/${pid}`, updatedProduct)

            const data = response.data 

            if(!data.success) {
                return { success: false, message: data.message };
            }

            // update the UI immediatly, without a needing a refresh
            set((state) => ({
                products: state.products.map((product) => (product._id === pid ? data.data : product)),
            }));

            return { success: true, message: data.message };

           
        } catch (error) {
            console.error("Error getting products:", error);
            return { success: false, message: "Failed to update product." };
        }
    },
}))


