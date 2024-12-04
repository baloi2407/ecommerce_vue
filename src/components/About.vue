<template>


        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">About Our
                    Company</h1>
                <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">Delivering quality products and exceptional
                    experiences since 2010.</p>
            </div>

            <!-- Mission Statement -->
            <div class="mt-16 bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                    <p class="text-lg text-gray-700">
                        At E-commerce Co., we strive to provide our customers with high-quality products, exceptional
                        service, and an unparalleled shopping experience. Our mission is to make online shopping
                        convenient, enjoyable, and accessible to everyone.
                    </p>
                </div>
            </div>

            <!-- Company Values -->
            <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="(value, index) in companyValues" :key="index"
                    class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="flex items-center">
                            <component :is="value.icon" class="h-8 w-8 text-indigo-600" />
                            <h3 class="ml-3 text-xl font-medium text-gray-900">{{ value.title }}</h3>
                        </div>
                        <p class="mt-4 text-base text-gray-500">{{ value.description }}</p>
                    </div>
                </div>
            </div>

            <!-- Team Section -->
            <div class="mt-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
                <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <div v-for="member in teamMembers" :key="member.name"
                        class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <img :src="member.image" :alt="member.name"
                                class="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                            <h3 class="text-lg font-medium text-gray-900 text-center">{{ member.name }}</h3>
                            <p class="text-sm text-gray-500 text-center">{{ member.position }}</p>
                            <p class="mt-4 text-base text-gray-700">{{ member.bio }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Information -->
            <div class="mt-16 bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex items-center">
                            <MapPinIcon class="h-6 w-6 text-indigo-600" />
                            <span class="ml-3 text-gray-700">123 E-commerce Street, City, Country</span>
                        </div>
                        <div class="flex items-center">
                            <PhoneIcon class="h-6 w-6 text-indigo-600" />
                            <span class="ml-3 text-gray-700">+1 (555) 123-4567</span>
                        </div>
                        <div class="flex items-center">
                            <MailIcon class="h-6 w-6 text-indigo-600" />
                            <span class="ml-3 text-gray-700">info@ecommerce.com</span>
                        </div>
                        <div class="flex items-center">
                            <GlobeIcon class="h-6 w-6 text-indigo-600" />
                            <span class="ml-3 text-gray-700">www.ecommerce.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script setup>
import { ref } from 'vue'
import { HeartIcon, ShieldCheckIcon, TruckIcon, MapPinIcon, PhoneIcon, MailIcon, GlobeIcon } from 'lucide-vue-next'

const companyValues = ref([
  {
    title: 'Customer First',
    description: 'We prioritize our customers\' needs and satisfaction in everything we do.',
    icon: HeartIcon
  },
  {
    title: 'Quality Assurance',
    description: 'We ensure that all our products meet the highest quality standards.',
    icon: ShieldCheckIcon
  },
  {
    title: 'Fast Delivery',
    description: 'We strive to deliver your orders as quickly and efficiently as possible.',
    icon: TruckIcon
  }
])

const teamMembers = ref([
  {
    name: 'Jane Doe',
    position: 'CEO & Founder',
    image: '/placeholder.svg?height=128&width=128',
    bio: 'Jane has over 15 years of experience in e-commerce and is passionate about creating exceptional online shopping experiences.'
  },
  {
    name: 'John Smith',
    position: 'CTO',
    image: '/placeholder.svg?height=128&width=128',
    bio: 'John leads our technology team, ensuring that our platform is always at the cutting edge of e-commerce innovation.'
  },
  {
    name: 'Emily Brown',
    position: 'Head of Customer Service',
    image: '/placeholder.svg?height=128&width=128',
    bio: 'Emily is dedicated to providing top-notch support to our customers and continuously improving our service standards.'
  }
])
</script>