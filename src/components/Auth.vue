<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {{ isLogin ? 'Sign in to your account' : 'Create a new account' }}
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                <a href="#" class="font-medium text-blue-600 hover:text-blue-500" @click.prevent="toggleAuthMode">
                    {{ isLogin ? 'create a new account' : 'sign in to your existing account' }}
                </a>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <!-- Login Form -->
                <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-6">
                    <div>
                        <label for="login-username" class="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div class="mt-1">
                            <input id="login-username" v-model="loginForm.username" name="username" type="text" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="login-password" class="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div class="mt-1">
                            <input id="login-password" v-model="loginForm.password" name="password" type="password"
                                autocomplete="current-password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div v-if="loginError" class="text-red-500 text-sm">{{ loginError }}</div>

                    <div>
                        <button type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Sign in
                        </button>
                    </div>
                </form>

                <!-- Sign-up Form -->
                <form v-else @submit.prevent="handleSignUp" class="space-y-6">
                    <div>
                        <label for="signup-fullname" class="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <div class="mt-1">
                            <input id="signup-fullname" v-model="signupForm.fullname" name="fullname" type="text"
                                autocomplete="name" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="signup-username" class="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div class="mt-1">
                            <input id="signup-username" v-model="signupForm.username" name="username" type="text"
                                required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="signup-password" class="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div class="mt-1">
                            <input id="signup-password" v-model="signupForm.password" name="password" type="password"
                                autocomplete="new-password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="signup-confirm-password" class="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div class="mt-1">
                            <input id="signup-confirm-password" v-model="signupForm.confirmPassword"
                                name="confirm-password" type="password" autocomplete="new-password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div v-if="signupError" class="text-red-500 text-sm">{{ signupError }}</div>
                    <div v-if="signupSuccess" class="text-green-500 text-sm">{{ signupSuccess }}</div>

                    <div>
                        <button type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const isLogin = ref(true);
const isForgotPassword = ref(false);
const router = useRouter();

const loginForm = ref({
    username: '',
    password: '',
});

const signupForm = ref({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
});

const loginError = ref('');
const signupError = ref('');
const signupSuccess = ref('');
// Gửi sự kiện lên component cha
const emit = defineEmits(['userLoggedIn']);

function updateTitle() {
    const route = router.currentRoute.value;
    if (isForgotPassword.value) {
        route.meta.title = 'Forgot Password';
    } else if (isLogin.value) {
        route.meta.title = 'Login';
    } else {
        route.meta.title = 'Sign Up';
    }
    document.title = route.meta.title;
}

watch([isLogin, isForgotPassword], updateTitle);

function toggleAuthMode() {
    isLogin.value = !isLogin.value;
    isForgotPassword.value = false;
    loginError.value = '';
    signupError.value = '';
    signupSuccess.value = '';
    updateTitle();
}

async function handleSignUp() {
    if (signupForm.value.password !== signupForm.value.confirmPassword) {
        signupError.value = 'Passwords do not match.';
        return;
    }

    if (signupForm.value.password.length < 8) {
        signupError.value = 'Password must be at least 8 characters long.';
        return;
    }

    try {
        const response = await axios.post('https://localhost:7105/api/Auth/register', {
            fullname: signupForm.value.fullname,
            username: signupForm.value.username,
            password: signupForm.value.password,
            confirmPassword: signupForm.value.confirmPassword,
            roleIds: [4] // Fixed role ID as per requirements
        });

        if (response.data.message === "Registration successful") {
            signupSuccess.value = 'Registration successful. You can now log in.';
            signupError.value = '';
            alert('Registration successful!');
            isLogin.value = true; // Switch to login view
        } else {
            signupError.value = response.data.message || 'Registration failed. Please try again.';
        }
    } catch (error) {
        console.error('Sign up error:', error);
        signupError.value = error.response?.data?.message || 'Sign up failed. Please try again.';
    }
}

async function handleLogin() {
    try {
        const response = await axios.post('https://localhost:7105/api/Auth/login', loginForm.value);
        const { token, userInfo } = response.data;
        if (token) {
            localStorage.setItem('authToken', token);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('loginTimestamp', Date.now().toString());
            loginError.value = '';
            emit('userLoggedIn', userInfo); // Emit event with user info
            router.push('/');
        } else {
            loginError.value = 'Login failed: Invalid response from server.';
        }
    } catch (error) {
        console.error('Login error:', error);
        loginError.value = 'Login failed: Invalid credentials or network issue.';
    }
}

// Add a new function to check if user is authenticated
function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (token) {
        router.push('/'); // Redirect to home if already authenticated
    }
}

// Call checkAuth on component mount
onMounted(() => {
    checkAuth();
});


</script>
