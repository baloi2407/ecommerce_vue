<template>
    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>

        <!-- Search and Sort -->
        <div class="flex flex-col md:flex-row justify-between mb-8">
            <div class="w-full md:w-1/3 mb-4 md:mb-0">
                <input v-model="searchQuery" type="text" placeholder="Search products..."
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="flex space-x-4">
                <select v-model="sortBy"
                    class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="name">Sort by Name</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
                <button @click="toggleFilters"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                    {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
                </button>
            </div>
        </div>

        <!-- Filters -->
        <div v-if="showFilters" class="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 class="text-xl font-semibold mb-4">Filters</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 class="font-medium mb-2">Categories</h3>
                    <div v-for="category in categories" :key="category.id" class="flex items-center mb-2">
                        <input :id="category.id" v-model="selectedCategories" :value="category.id.toString()"
                            type="checkbox" class="mr-2" />
                        <label :for="category.id">{{ category.name }}</label>
                    </div>
                </div>
                <div>
                    <h3 class="font-medium mb-2">Price Range</h3>
                    <div class="flex items-center space-x-4">
                        <input v-model.number="priceRange.min" type="number" placeholder="Min"
                            class="w-24 px-2 py-1 border border-gray-300 rounded" />
                        <span>to</span>
                        <input v-model.number="priceRange.max" type="number" placeholder="Max"
                            class="w-24 px-2 py-1 border border-gray-300 rounded" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div v-for="product in filteredAndSortedProducts" :key="product.id"
                class="bg-white rounded-lg shadow-md overflow-hidden">
                <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover" />
                <div class="p-4">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        <router-link :to="'/product-details/' + product.id">{{ product.name }}</router-link>
                    </h3>
                    <p class="text-gray-600 mb-4">{{ product.description }}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-2xl font-bold text-gray-800">${{ product.price.toFixed(2) }}</span>
                        <button @click="addToCart(product)"
                            class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-center">
            <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="mx-1 px-3 py-1 rounded"
                :class="currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'">
                {{ page }}
            </button>
        </div>
    </main>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';

const route = useRoute();

const searchQuery = ref('');
const sortBy = ref('name');
const showFilters = ref(false);
const selectedCategories = ref([]);
const priceRange = ref({ min: null, max: null });
const currentPage = ref(1);
const itemsPerPage = 12;

const categories = ref([]);
const products = ref([]);

const fetchProducts = async (categoryId = null) => {
    try {
        let url = 'https://localhost:7105/api/Product';
        const response = await axios.get(url);

        // Dữ liệu trả về chứa các sản phẩm trong response.data.products.$values
        const allProducts = response.data.products.$values;

        // Lọc sản phẩm theo categoryId
        if (categoryId === null) {
            products.value = allProducts; // Load toàn bộ sản phẩm
        } else {
            products.value = allProducts.filter(product => product.iD_danhmuc == categoryId);
        }
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
};

const fetchCategories = async () => {
    try {
        const response = await axios.get('https://localhost:7105/api/Category');
        categories.value = response.data.$values;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
};

onMounted(async () => {
    await fetchCategories();
    await fetchProducts(route.params.categoryId);
    initCart();
});

watch(() => route.params.categoryId, (newCategoryId) => {
    fetchProducts(newCategoryId);
});

const filteredProducts = computed(() => {
    return products.value.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = selectedCategories.value.length === 0 || selectedCategories.value.includes(product.iD_danhmuc.toString());
        const matchesPrice = (!priceRange.value.min || product.price >= priceRange.value.min) &&
            (!priceRange.value.max || product.price <= priceRange.value.max);
        return matchesSearch && matchesCategory && matchesPrice;
    });
});

const sortedProducts = computed(() => {
    return [...filteredProducts.value].sort((a, b) => {
        if (sortBy.value === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy.value === 'price_asc') {
            return a.price - b.price;
        } else if (sortBy.value === 'price_desc') {
            return b.price - a.price;
        }
        return 0;
    });
});

const paginatedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(sortedProducts.value.length / itemsPerPage));

const filteredAndSortedProducts = computed(() => {
    return paginatedProducts.value;
});

const toggleFilters = () => {
    showFilters.value = !showFilters.value;
};

const addToCart = async (product) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.userId) {
        Swal.fire('Error', 'Please log in to add items to your cart', 'error');
        return;
    }

    try {
        const response = await axios.post('https://localhost:7105/api/Cart', {
            customerID: userInfo.userId,
            cartItems: [
                {
                    productId: product.id,
                    quantity: 1
                }
            ]
        });

        if (response.status === 200) {
            Swal.fire('Success', 'Product added to cart', 'success');
            // You might want to update the cart item count here
            // For example: updateCartItemCount();
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        Swal.fire('Error', 'Failed to add product to cart', 'error');
    }
};

</script>