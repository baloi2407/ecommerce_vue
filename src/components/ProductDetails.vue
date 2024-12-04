<template>
    <main class="container mx-auto px-4 py-8">
        <div v-if="product" class="bg-white rounded-lg shadow-md p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Product Image -->
                <div>
                    <img :src="product.image" :alt="product.name" class="w-full h-96 object-cover rounded-lg" />
                </div>

                <!-- Product Details -->
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>
                    <p class="text-2xl font-bold text-gray-800 mb-4">${{ product.price.toFixed(2) }}</p>
                    <p class="text-gray-600 mb-6">{{ product.description || 'No description available.' }}</p>

                    <p class="text-gray-600 mb-4">Available Quantity: {{ product.quantity }}</p>

                    <!-- Quantity and Add to Cart -->
                    <div class="flex items-center mb-6">
                        <div class="flex items-center border rounded-md mr-4">
                            <button @click="decrementQuantity"
                                class="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                            <span class="px-3 py-1 text-gray-800">{{ quantity }}</span>
                            <button @click="incrementQuantity"
                                class="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                        </div>
                        <button @click="handleAddToCart"
                            class="flex-grow bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                            Add to Cart
                        </button>
                    </div>

                    <p class="text-sm text-gray-500">
                        Created: {{ product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A' }}
                    </p>
                    <p class="text-sm text-gray-500">
                        Last Updated: {{ new Date(product.updated_at).toLocaleDateString() }}
                    </p>
                </div>
            </div>

            <!-- Related Products Section -->
            <div v-if="relatedProducts.length" class="mt-12">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Related Products</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id"
                        class="bg-white rounded-lg shadow-md overflow-hidden">
                        <img :src="relatedProduct.image" :alt="relatedProduct.name" class="w-full h-48 object-cover" />
                        <div class="p-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">
                                <router-link :to="`/product-details/${relatedProduct.id}`">{{ relatedProduct.name
                                    }}</router-link>
                            </h3>
                            <p class="text-gray-600 mb-2">${{ relatedProduct.price.toFixed(2) }}</p>
                            <button @click="addToCart(relatedProduct)"
                                class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading/Error Messages -->
        <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
        <div v-else class="text-center text-gray-600">Loading...</div>
    </main>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useCart } from '../../composables/cartStore';

const route = useRoute();
const { addToCart } = useCart();

const product = ref(null);
const relatedProducts = ref([]);
const error = ref(null);
const quantity = ref(1);

const fetchProduct = async () => {
    try {
        const productId = route.params.id;
        const response = await axios.get(`https://localhost:7105/api/Product/${productId}`);
        product.value = response.data;
        fetchRelatedProducts(product.value.iD_danhmuc);
    } catch (err) {
        error.value = 'Failed to fetch product data';
        console.error(err);
    }
};

const fetchRelatedProducts = async (categoryId) => {
    try {
        const response = await axios.get(`https://localhost:7105/api/Product`);
        relatedProducts.value = response.data.products.$values.filter(p => p.id !== product.value.id && p.iD_danhmuc == product.value.iD_danhmuc).slice(0, 4);
    } catch (err) {
        console.error('Error fetching related products:', err);
    }
};

const incrementQuantity = () => {
    if (quantity.value < product.value.quantity) {
        quantity.value++;
    }
};

const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const handleAddToCart = () => {
    addToCart({
        id: product.value.id,
        name: product.value.name,
        price: product.value.price,
        quantity: quantity.value,
        image: product.value.image
    });
};

onMounted(fetchProduct);
watch(() => route.params.id, fetchProduct);
</script>
