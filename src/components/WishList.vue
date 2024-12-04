<template>

        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-extrabold text-gray-900 mb-6">My Wishlist</h1>

            <div v-if="wishlistItems.length === 0" class="text-center py-12">
                <ShoppingBagIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
                <p class="mt-1 text-sm text-gray-500">Start adding some items to your wishlist!</p>
                <div class="mt-6">
                    <button type="button"
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        @click="goToShop">
                        <ShoppingCartIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Continue Shopping
                    </button>
                </div>
            </div>

            <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" class="divide-y divide-gray-200">
                    <li v-for="item in wishlistItems" :key="item.id" class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-20 w-20">
                                    <img class="h-20 w-20 rounded-md object-cover" :src="item.imageSrc"
                                        :alt="item.name" />
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ item.name }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ item.category }}
                                    </div>
                                    <div class="text-sm font-medium text-gray-900 mt-1">
                                        ${{ item.price.toFixed(2) }}
                                    </div>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button @click="addToCart(item)"
                                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <ShoppingCartIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                    Add to Cart
                                </button>
                                <button @click="removeFromWishlist(item)"
                                    class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <TrashIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                    Remove
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div v-if="wishlistItems.length > 0" class="mt-6 flex justify-between items-center">
                <button @click="clearWishlist"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Clear Wishlist
                </button>
                <button @click="addAllToCart"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add All to Cart
                </button>
            </div>
        </div>
        
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingBagIcon, ShoppingCartIcon, TrashIcon } from 'lucide-vue-next'


const wishlistItems = ref([
    {
        id: 1,
        name: 'Leather Backpack',
        category: 'Accessories',
        price: 89.99,
        imageSrc: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 2,
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 129.99,
        imageSrc: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 3,
        name: 'Smartwatch',
        category: 'Electronics',
        price: 199.99,
        imageSrc: '/placeholder.svg?height=80&width=80'
    }
])

const goToShop = () => {
    // Implement navigation to shop page
    console.log('Navigating to shop page')
}

const addToCart = (item) => {
    // Implement add to cart functionality
    console.log('Adding to cart:', item)
    // You might want to show a success message or update a cart count here
}

const removeFromWishlist = (item) => {
    wishlistItems.value = wishlistItems.value.filter(i => i.id !== item.id)
    // You might want to show a success message here
}

const clearWishlist = () => {
    wishlistItems.value = []
    // You might want to show a success message here
}

const addAllToCart = () => {
    wishlistItems.value.forEach(item => addToCart(item))
    // You might want to show a success message here
    clearWishlist()
}
</script>