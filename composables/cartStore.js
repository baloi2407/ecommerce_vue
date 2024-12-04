import { ref, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const API_BASE_URL = 'https://localhost:7105/api'
const cart = ref([])

export function useCart() {
    const router = useRouter()

    const fetchCart = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if (!userInfo) {
                console.error('User not logged in')
                return
            }
            const response = await axios.get(`${API_BASE_URL}/Cart/get-cart`, {
                params: { id_customer: userInfo.userId }
            })
            if (response.data && response.data.cart && response.data.cart.$values) {
                if (response.data.cart.$values.length > 0) {
                    const cartData = response.data.cart.$values[0]
                    cart.value = cartData.cartItems && cartData.cartItems.$values ? cartData.cartItems.$values : []
                } else {
                    cart.value = []
                }
            } else {
                cart.value = []
            }
        } catch (error) {
            console.error('Error fetching cart:', error)
            cart.value = []
        }
    }

    const addToCart = async (product, quantity = 1) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if (!userInfo) {
                console.error('User not logged in')
                Swal.fire('Error', 'Please log in to add items to your cart', 'error')
                return
            }
            const payload = {
                customerID: userInfo.userId,
                cartItems: [
                    {
                        productId: product.id,
                        quantity: quantity
                    }
                ]
            }
            const response = await axios.post(`${API_BASE_URL}/Cart`, payload)
            if (response.status === 200) {
                await fetchCart() // Refresh the cart after adding
                Swal.fire({
                    title: 'Added to Cart!',
                    text: `${product.name} has been added to your cart.`,
                    icon: 'success',
                    confirmButtonText: 'Continue Shopping',
                    showCancelButton: true,
                    cancelButtonText: 'View Cart',
                    cancelButtonColor: '#3085d6',
                    confirmButtonColor: '#28a745'
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.cancel) {
                        router.push({ name: 'Cart' })
                    }
                })
            }
        } catch (error) {
            console.error('Error adding to cart:', error)
            Swal.fire('Error', 'Failed to add item to cart. Please try again.', 'error')
        }
    }

    const incrementQuantity = async (productId) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) {
                console.error('User not logged in');
                return;
            }
            const response = await axios.put(`${API_BASE_URL}/Cart/IncreaseProductQuantity`, null, {
                params: { customerId: userInfo.userId, productId: productId },
            });
            if (response.data === 'Product quantity increased successfully') {
                const item = cart.value.find(item => item.productId === productId);
                if (item) {
                    item.quantity++; // Cập nhật tạm thời
                }
            }
        } catch (error) {
            console.error('Error incrementing quantity:', error);
            Swal.fire('Error', 'Failed to update quantity', 'error');
        }
    };
    
    const decrementQuantity = async (productId) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) {
                console.error('User not logged in');
                return;
            }
            const response = await axios.put(`${API_BASE_URL}/Cart/DecreaseProductQuantity`, null, {
                params: { customerId: userInfo.userId, productId: productId },
            });
            if (response.data === 'Product quantity decreased successfully') {
             
                const item = cart.value.find(item => item.productId === productId);
                if (item) {
                    if (item.quantity > 1) {
                        item.quantity--; // Cập nhật tạm thời
                    } else {
                        const index = cart.value.findIndex(i => i.productId === productId);
                        if (index !== -1) {
                            cart.value.splice(index, 1); // Loại bỏ sản phẩm nếu số lượng là 0
                        }
                    }
                }
                
            }
        } catch (error) {
            console.error('Error decrementing quantity:', error);
            Swal.fire('Error', 'Failed to update quantity', 'error');
        }
    };
    

    const removeFromCart = async (productId) => {
        // Implementation for removing from cart
        // This will be implemented when the API is available
    }

    const cartItemCount = computed(() => {
        return cart.value.reduce((total, item) => total + item.quantity, 0)
    })

    const cartTotal = computed(() => {
        return cart.value.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
    })

    const initCart = () => {
        fetchCart()
    }

    return {
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        cartItemCount,
        cartTotal,
        initCart
    }
}

