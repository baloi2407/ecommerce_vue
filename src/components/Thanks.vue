<template>


        <!-- Main Content -->
        <main class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <!-- Thank you message with gradient animation -->
            <h1
                class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
                Thank you for your shopping!
            </h1>

            <!-- Back to Shop button -->
            <router-link :to="{ name: 'Home' }" class="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">Back to shop</router-link>
        </main>

        
</template>

<script setup>


</script>
<style>
    /* Gradient animation */
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
    }
</style>