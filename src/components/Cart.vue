<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Your Cart</h1>
        <div v-if="cart.length === 0" class="text-center text-gray-600">
            Your cart is empty.
        </div>
        <div v-else>
            <div v-for="item in cart" :key="item.id" class="flex items-center justify-between border-b py-4">
                <div class="flex items-center">
                    <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover mr-4">
                    <div>
                        <h3 class="text-lg font-semibold">{{ item.productName }}</h3>
                        <p class="text-gray-600">${{ item.unitPrice.toFixed(2) }}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <button @click="decreaseQuantity(item)" class="px-2 py-1 bg-gray-200 rounded-l">-</button>
                    <span class="px-4 py-1 bg-gray-100">{{ item.quantity }}</span>
                    <button @click="increaseQuantity(item)" class="px-2 py-1 bg-gray-200 rounded-r">+</button>
                    <button @click="removeItem(item)" class="ml-4 text-red-600 hover:text-red-800">
                        <TrashIcon class="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div class="mt-8 text-right">
                <p class="text-xl font-bold">Total: ${{ totalPrice.toFixed(2) }}</p>
                <button v-if="!isCheckout" @click="proceedToCheckout"
                    class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                    Proceed to Checkout
                </button>
                <div v-else>
                    <select v-model="selectedAddress"
                        class="w-full mt-4 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled>Select an address</option>
                        <option v-for="address in addresses" :key="address.id" :value="address.id">
                            {{ address.fullname }} - {{ address.phone }} - {{ address.bonusInfo }}
                        </option>
                    </select>
                    <button @click="checkoutOrder"
                        class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { TrashIcon } from 'lucide-vue-next';
import { useRouter } from 'vue-router'
const router = useRouter()

const cart = ref([]);
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const fetchCart = async () => {
    try {
        // Bước 1: Lấy danh sách giỏ hàng
        const cartResponse = await axios.get(`https://localhost:7105/api/Cart/get-cart?id_customer=${userInfo.userId}`);
        const cartItems = cartResponse.data.cart.$values[0].cartItems.$values;
        console.log('Cart Items:', cartItems);

        // Bước 2: Lấy danh sách sản phẩm
        const productResponse = await axios.get('https://localhost:7105/api/Product');
        const products = productResponse.data.products.$values;
        console.log('Products:', products);

        // Bước 3: So sánh và ghép thông tin sản phẩm
        const enrichedCartItems = cartItems.map(cartItem => {
            const product = products.find(p => p.id === cartItem.productId);
            if (product) {
                return {
                    ...cartItem,
                    productName: product.name,
                    productImage: product.image,
                    productPrice: product.price,
                };
            } else {
                console.warn(`Product with ID ${cartItem.productId} not found`);
                return cartItem; // Nếu không tìm thấy sản phẩm, trả về `cartItem` gốc.
            }
        });

        // Bước 4: Cập nhật giá trị giỏ hàng
        cart.value = enrichedCartItems;
        console.log('Enriched Cart Items:', cart.value);
        console.log(`Total products in cart: ${cartItems.length}`);

    } catch (error) {
        console.error('Error fetching cart and products:', error);
    }
};

const increaseQuantity = async (item) => {
    try {
        await axios.put(`https://localhost:7105/api/Cart/IncreaseProductQuantity?customerId=${userInfo.userId}&productId=${item.productId}`);
        item.quantity++;
    } catch (error) {
        console.error('Error increasing quantity:', error);
    }
};

const decreaseQuantity = async (item) => {
    if (item.quantity > 1) {
        try {
            await axios.put(`https://localhost:7105/api/Cart/DecreaseProductQuantity?customerId=${userInfo.userId}&productId=${item.productId}`);
            item.quantity--;
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    }
};

const removeItem = async (item) => {
    try {
        await axios.delete(`https://localhost:7105/api/Cart/remove-cart-item/${item.id}`);
        cart.value = cart.value.filter(cartItem => cartItem.id !== item.id);
    } catch (error) {
        console.error('Error removing item:', error);
    }
};

const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
});

const isCheckout = ref(false);
const proceedToCheckout = () => {
    isCheckout.value = true;
};

const addresses = ref([]);
const selectedAddress = ref('');
// Hàm gọi API lấy danh sách địa chỉ
const fetchAddresses = async () => {

    try {
        const response = await axios.get(`https://localhost:7105/api/Address/get-address?id=${userInfo.userId}`);

        addresses.value = response.data.address.$values.map((item) => ({
            id: item.id,
            fullname: item.fullname,
            phone: item.phone,
            bonusInfo: item.bonus_info,
        }));
        console.log('Addresses loaded:', addresses.value);
    } catch (error) {
        console.error('Error fetching addresses:', error);
    }
};
const checkoutOrder = async () => {
    if (!selectedAddress.value) {
        alert('Please select an address.');
        return;
    }

    try {

        const response = await axios.post('https://localhost:7105/api/Order/CreateOrderFromCart', {
            order_id: '', // Mặc định để rỗng
            ordertype: 'Online', // Mặc định là Online
            employeeID: 0, // Mặc định là 0
            addressId: selectedAddress.value, // ID của Address được chọn
            payment: 'Cash', // Mặc định là Cash
            customerId: userInfo.userId, // Lấy từ userInfo trong localStorage
            email_order: 'string@email', // Giá trị mặc định
            note_order: 'string', // Giá trị mặc định
        });

        console.log('Order created successfully:', response.data);
        alert('Order placed successfully!');
        router.push('/thanks')
    } catch (error) {
        console.error('Error creating order:', error);
        alert('Failed to create order. Please try again.');
    }
};

onMounted(() => {
    fetchCart();
    fetchAddresses();
});
</script>