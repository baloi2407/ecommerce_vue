<template>
    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Payment Form -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-6">Payment Details</h2>
                <form @submit.prevent="processPayment">
                    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-6">Shipping Information</h2>
                    <div class="space-y-4">
                        <div>
                            <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
                            <input id="fullName" v-model="shippingDetails.fullName" type="text"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                            <input id="address" v-model="shippingDetails.address" type="text"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="province" class="block text-sm font-medium text-gray-700">Province</label>
                                <select id="province" v-model="shippingDetails.province"
                                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2">
                                    <option value="">Select a province</option>
                                    <option value="HCM">Ho Chi Minh City</option>
                                    <option value="HN">Hanoi</option>
                                    <option value="CT">Can Tho</option>
                                    <option value="DN">Da Nang</option>
                                </select>
                            </div>
                            <div>
                                <label for="district" class="block text-sm font-medium text-gray-700">District</label>
                                <select id="district" v-model="shippingDetails.district"
                                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2">
                                    <option value="">Select a district</option>
                                    <option value="D1">District 1</option>
                                    <option value="D2">District 2</option>
                                    <option value="D3">District 3</option>
                                    <option value="D4">District 4</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button type="submit"
                        class="mt-8 w-full bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
                        :disabled="isProcessing">
                        {{ isProcessing ? 'Processing...' : 'Place Order' }}
                    </button>
                </form>
                <p class="mt-4 text-sm text-gray-600">
                    Note: In the future, this form will be pre-filled with the user's address based on their login
                    information if available.
                </p>
            </div>

            <!-- Order Summary -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                <div class="space-y-4">
                    <div v-for="item in cart" :key="item.id" class="flex justify-between">
                        <span>{{ item.title }} (x{{ item.quantity }})</span>
                        <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
                    </div>
                    <div class="border-t pt-4">
                        <div class="flex justify-between">
                            <span>Subtotal</span>
                            <span>${{ subtotal.toFixed(2) }}</span>
                        </div>
                    </div>
                    <div class="border-t pt-4">
                        <div class="flex justify-between text-xl font-semibold">
                            <span>Total</span>
                            <span>${{ total.toFixed(2) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCart } from '../../composables/cartStore'
import { useRouter } from 'vue-router'

const { cart, clearCart } = useCart()
const router = useRouter()


const subtotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
})

const total = computed(() => subtotal.value)

const shippingDetails = ref({
    fullName: 'John Doe',
    address: '123 Main St',
    province: 'HCM',
    district: 'D1'
})

const isProcessing = ref(false)

// Payment processing function
const processPayment = async () => {
    isProcessing.value = true

    try {
        // Sample code for payment processing
        /* 
        // User authentication (assuming user is already logged in)
        const user = await authenticateUser()
    
        // Add product to cart (assuming product is already in cart)
        const cartItems = cart.value.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
    
        // Process payment
        const paymentResult = await processPaymentAPI({
          userId: user.id,
          cartItems: cartItems,
          shippingDetails: shippingDetails.value,
          total: total.value
        })
    
        if (paymentResult.success) {
          // Clear the cart
          clearCart()
    
          // Show success message
          console.success("Payment successful! Your order is being processed.")
    
          // Redirect to thank you page
          router.push('/thanks')
        } else {
          throw new Error(paymentResult.error)
        }
        */

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Simulated successful payment
        clearCart()
        console.success("Payment successful! Your order is being processed.")
        router.push('/thanks')
    } catch (error) {
        console.error('Payment processing error:', error)
        console.error("Payment failed. Please try again.")
    } finally {
        isProcessing.value = false
    }
}

// Function to authenticate user (sample)
const authenticateUser = async () => {
    // In a real application, this would verify the user's session or token
    return { id: 'user123', name: 'John Doe' }
}

// Function to process payment (sample API call)
const processPaymentAPI = async (paymentDetails) => {
    // In a real application, this would make an API call to your payment processor
    console.log('Processing payment:', paymentDetails)
    return { success: true }
}
</script>