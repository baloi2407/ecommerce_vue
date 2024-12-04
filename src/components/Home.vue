<template>
    <!-- Hero Section -->
    <section class="bg-gray-100 py-20">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Welcome to ShopNow</h1>
            <p class="text-xl text-gray-600 mb-8">Discover amazing products at unbeatable prices</p>
            <router-link to="/products"
                class="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
                Shop Now
            </router-link>
        </div>
    </section>

    <div class="bg-gray-100 min-h-screen">
        <!-- Hero Section with Gradient -->
        <section class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
            <div class="container mx-auto px-4">
                <div class="flex flex-col md:flex-row items-center justify-between">
                    <div class="md:w-1/2 mb-8 md:mb-0">
                        <h1 class="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Store</h1>
                        <p class="text-xl mb-6">Discover amazing products at unbeatable prices!</p>
                        <button
                            class="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                            Shop Now
                        </button>
                    </div>
                    <div class="md:w-1/2">
                        <img src="https://t4.ftcdn.net/jpg/02/49/50/15/360_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg"
                            alt="Hero Image" class="rounded-lg shadow-xl" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Updated Featured Products Section -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-gray-800 mb-12 text-center">Featured Products</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div v-for="product in featuredProducts" :key="product.id"
                        class="bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 group">
                        <div class="relative aspect-square p-4 bg-gray-50 rounded-t-lg">
                            <img :src="product.image" :alt="product.title"
                                class="h-full w-full object-contain group-hover:brightness-110 transition-all duration-300" />
                        </div>
                        <div class="p-6 border-t">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">{{ product.title }}</h3>
                            <div class="flex items-center justify-between">
                                <span class="text-2xl font-bold text-gray-800">${{ product.price.toFixed(2) }}</span>
                                <button
                                    class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>      
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const featuredProducts = ref([])


onMounted(async () => {
    try {
        const [productsResponse, categoriesResponse] = await Promise.all([
            axios.get('https://fakestoreapi.com/products?limit=4'),
        ])

        featuredProducts.value = productsResponse.data
    } catch (error) {
        console.error('Error fetching data:', error)
    }
})
</script>