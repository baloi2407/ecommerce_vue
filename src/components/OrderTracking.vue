<template>


        <main class="container mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-8">Track Your Order</h1>

            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <form @submit.prevent="trackOrder" class="flex flex-col md:flex-row gap-4">
                    <div class="flex-grow">
                        <label for="orderNumber" class="block text-sm font-medium text-gray-700 mb-1">Order
                            Number</label>
                        <input id="orderNumber" v-model="orderNumber" type="text" required
                            placeholder="Enter your order number"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="flex-grow">
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input id="email" v-model="email" type="email" required placeholder="Enter your email address"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="flex items-end">
                        <button type="submit"
                            class="w-full md:w-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Track Order
                        </button>
                    </div>
                </form>
            </div>

            <div v-if="orderDetails" class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Order #{{ orderDetails.orderNumber }}</h2>

                <div class="mb-8">
                    <h3 class="text-lg font-medium text-gray-700 mb-2">Order Status</h3>
                    <div class="relative">
                        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                            <div :style="{ width: `${orderDetails.progress}%` }"
                                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                            </div>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Order Placed</span>
                            <span>Processing</span>
                            <span>Shipped</span>
                            <span>Delivered</span>
                        </div>
                    </div>
                    <p class="mt-2 text-sm text-gray-600">{{ orderDetails.statusMessage }}</p>
                </div>

                <div class="mb-8">
                    <h3 class="text-lg font-medium text-gray-700 mb-2">Shipping Information</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 class="font-medium text-gray-600">Shipping Address:</h4>
                            <p>{{ orderDetails.shippingAddress.name }}</p>
                            <p>{{ orderDetails.shippingAddress.street }}</p>
                            <p>{{ orderDetails.shippingAddress.city }}, {{ orderDetails.shippingAddress.state }} {{
                                orderDetails.shippingAddress.zip }}</p>
                            <p>{{ orderDetails.shippingAddress.country }}</p>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-600">Shipping Method:</h4>
                            <p>{{ orderDetails.shippingMethod }}</p>
                            <h4 class="font-medium text-gray-600 mt-4">Estimated Delivery:</h4>
                            <p>{{ orderDetails.estimatedDelivery }}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-lg font-medium text-gray-700 mb-2">Order Items</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantity</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="item in orderDetails.items" :key="item.id">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10">
                                                <img class="h-10 w-10 rounded-full" :src="item.image"
                                                    :alt="item.name" />
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ item.quantity }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">${{ item.price.toFixed(2) }}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="mt-8 text-right">
                    <p class="text-sm text-gray-600">Subtotal: ${{ orderDetails.subtotal.toFixed(2) }}</p>
                    <p class="text-sm text-gray-600">Shipping: ${{ orderDetails.shippingCost.toFixed(2) }}</p>
                    <p class="text-sm text-gray-600">Tax: ${{ orderDetails.tax.toFixed(2) }}</p>
                    <p class="text-xl font-semibold text-gray-800 mt-2">Total: ${{ orderDetails.total.toFixed(2) }}</p>
                </div>
            </div>

            <div v-if="showNoOrderFound" class="bg-white rounded-lg shadow-md p-6 text-center">
                <h2 class="text-2xl font-semibold text-gray-800 mb-2">No Order Found</h2>
                <p class="text-gray-600">We couldn't find an order matching the provided information. Please check your
                    order number and email address and try again.</p>
            </div>
        </main>

</template>

<script setup>
import { ref } from 'vue'


const orderNumber = ref('')
const email = ref('')
const orderDetails = ref(null)
const showNoOrderFound = ref(false)

const trackOrder = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (orderNumber.value === '12345' && email.value === 'user@example.com') {
        orderDetails.value = {
            orderNumber: '12345',
            progress: 75,
            statusMessage: 'Your order has been shipped and is on its way!',
            shippingAddress: {
                name: 'John Doe',
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zip: '12345',
                country: 'United States'
            },
            shippingMethod: 'Express Shipping',
            estimatedDelivery: 'May 15, 2023',
            items: [
                { id: 1, name: 'Premium Wireless Headphones', quantity: 1, price: 249.99, image: '/placeholder.svg?height=80&width=80' },
                { id: 2, name: 'Smartphone Case', quantity: 2, price: 29.99, image: '/placeholder.svg?height=80&width=80' }
            ],
            subtotal: 309.97,
            shippingCost: 15.00,
            tax: 24.80,
            total: 349.77
        }
        showNoOrderFound.value = false
    } else {
        orderDetails.value = null
        showNoOrderFound.value = true
    }
}
</script>