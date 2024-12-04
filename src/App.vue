<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" class="text-2xl font-bold text-gray-800">ShopNow</a>
        <div class="flex items-center space-x-6">
          <router-link to="/" class="text-gray-600 hover:text-gray-800">Home</router-link>

          <!-- Products Dropdown -->
          <div class="relative">
            <button @click="toggleProductsDropdown" class="text-gray-600 hover:text-gray-800 flex items-center">
              Products
              <ChevronDownIcon class="h-4 w-4 ml-1" />
            </button>
            <div v-if="isProductsDropdownOpen"
              class="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5">
              <router-link to="/products" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All
                Products</router-link>
              <router-link v-for="category in categories" :key="category.id"
                :to="{ name: 'Products', params: { categoryId: category.id } }"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="isProductsDropdownOpen = false">
                {{ category.name }}
              </router-link>
            </div>
          </div>

          <router-link to="/about" class="text-gray-600 hover:text-gray-800">About</router-link>
          <router-link to="/contact" class="text-gray-600 hover:text-gray-800">Contact</router-link>

          <button class="relative">
            <router-link to="/cart">
              <ShoppingCartIcon class="h-6 w-6 text-gray-600 hover:text-gray-800" />
            </router-link>
            <span
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {{ cartItemCount }}
            </span>
          </button>

          <!-- User Dropdown Menu -->
          <div v-if="userInfo" class="relative">
            <button @click="toggleDropdown" class="text-gray-600">
              Welcome, {{ username }}
            </button>
            <div v-show="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5">
              <router-link to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</router-link>
              <button @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
            </div>
          </div>

          <!-- Sign in Button if Not Logged In -->
          <router-link v-else to="/auth"
            class="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Sign in
          </router-link>
        </div>
      </nav>
    </header>

    <router-view @userLoggedIn="updateUserInfo"></router-view>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-auto">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">About Us</h3>
            <p class="text-gray-400">ShopNow is your one-stop destination for all your shopping needs. We offer
              a wide
              range of high-quality products at competitive prices.</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><router-link to="/" class="text-gray-400 hover:text-white">Home</router-link></li>
              <li><router-link to="/products" class="text-gray-400 hover:text-white">Products</router-link></li>
              <li><router-link to="/about" class="text-gray-400 hover:text-white">About</router-link></li>
              <li><router-link to="/contact" class="text-gray-400 hover:text-white">Contact</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-4">Contact Us</h3>
            <ul class="space-y-2 text-gray-400">
              <li class="flex items-center">
                <MapPinIcon class="h-5 w-5 mr-2" />
                123 Binh Chanh, Ho Chi Minh City
              </li>
              <li class="flex items-center">
                <PhoneIcon class="h-5 w-5 mr-2" />
                +1 (123) 456-7890
              </li>
              <li class="flex items-center">
                <MailIcon class="h-5 w-5 mr-2" />
                info@shopnow.com
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 text-center text-gray-400">
          <p>&copy; 2024 ShopNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, provide,onUnmounted } from 'vue';
import { ShoppingCartIcon, MapPinIcon, PhoneIcon, MailIcon, ChevronDownIcon } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/cartStore';
import axios from 'axios';

const { cartItemCount } = 3;

const isDropdownOpen = ref(false);
const router = useRouter();
const categories = ref([]);
const isProductsDropdownOpen = ref(false);

const username = ref('');
const userInfo = ref(null);

// Function to check and perform auto-logout
function checkAutoLogout() {
  const loginTimestamp = localStorage.getItem('loginTimestamp');
  if (loginTimestamp) {
    const currentTime = Date.now();
    const loggedInTime = currentTime - parseInt(loginTimestamp);
    const tenHoursInMs = 10 * 60 * 60 * 1000;

    if (loggedInTime > tenHoursInMs) {
      handleLogout();
    }
  }
}

onMounted(async () => {
  checkAutoLogout(); // Check for auto-logout on mount
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      userInfo.value = JSON.parse(localStorage.getItem("userInfo"));
      username.value = userInfo.value.username;
    } catch (error) {
      console.error('Error fetching user info:', error);
      handleLogout(); // Logout if token is invalid
    }
  }

  try {
    const response = await axios.get('https://localhost:7105/api/Category');
    categories.value = response.data.$values;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
});

// Set up an interval to check for auto-logout every minute
const autoLogoutInterval = setInterval(checkAutoLogout, 60000);

// Clear the interval when the component is unmounted
onUnmounted(() => {
  clearInterval(autoLogoutInterval);
});

watch(userInfo, (newUserInfo) => {
  if (newUserInfo) {
    username.value = newUserInfo.username;
  } else {
    username.value = '';
  }
});

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function toggleProductsDropdown() {
  isProductsDropdownOpen.value = !isProductsDropdownOpen.value;
}

function handleLogout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userInfo');
  localStorage.removeItem('loginTimestamp');
  userInfo.value = null;
  router.push('/auth');
}

function handleCategoryClick(categoryId) {
  router.push({ name: 'Products', params: { categoryId: categoryId } });
  isProductsDropdownOpen.value = false;
}

// Function to update user info (to be called from Auth component)
function updateUserInfo(newUserInfo) {
  userInfo.value = newUserInfo;
  username.value = newUserInfo.username;
}

// Provide the updateUserInfo function to child components
provide('updateUserInfo', updateUserInfo);
</script>