<template>

        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Contact
                    Us</h1>
                <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">We're here to help. Get in touch with us for
                    any inquiries or support.</p>
            </div>

            <div class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <!-- Contact Form -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                        <form @submit.prevent="submitForm">
                            <div class="grid grid-cols-1 gap-6">
                                <div>
                                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" name="name" id="name" v-model="form.name" required
                                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" name="email" id="email" v-model="form.email" required
                                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                                <div>
                                    <label for="subject"
                                        class="block text-sm font-medium text-gray-700">Subject</label>
                                    <input type="text" name="subject" id="subject" v-model="form.subject" required
                                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                                <div>
                                    <label for="message"
                                        class="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea id="message" name="message" rows="4" v-model="form.message" required
                                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                                </div>
                                <div>
                                    <button type="submit"
                                        class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Contact Information -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
                        <div class="space-y-6">
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
                                <span class="ml-3 text-gray-700">support@ecommerce.com</span>
                            </div>
                            <div class="flex items-center">
                                <ClockIcon class="h-6 w-6 text-indigo-600" />
                                <span class="ml-3 text-gray-700">Monday - Friday, 9am - 5pm</span>
                            </div>
                        </div>

                        <div class="mt-8">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Follow us</h3>
                            <div class="flex space-x-6">
                                <a href="#" class="text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Facebook</span>
                                    <FacebookIcon class="h-6 w-6" />
                                </a>
                                <a href="#" class="text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Instagram</span>
                                    <InstagramIcon class="h-6 w-6" />
                                </a>
                                <a href="#" class="text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Twitter</span>
                                    <TwitterIcon class="h-6 w-6" />
                                </a>
                                <a href="#" class="text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">LinkedIn</span>
                                    <LinkedinIcon class="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FAQ Section -->
            <div class="mt-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="space-y-6">
                            <div v-for="(faq, index) in faqs" :key="index">
                                <h3 class="text-lg font-medium text-gray-900">{{ faq.question }}</h3>
                                <p class="mt-2 text-gray-600">{{ faq.answer }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
import { ref } from 'vue'
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from 'lucide-vue-next'


const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const faqs = ref([
  {
    question: 'What are your shipping rates?',
    answer: 'Our shipping rates vary depending on the destination and the size of the order. You can view the exact shipping cost at checkout before completing your purchase.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Delivery times depend on your location. Typically, domestic orders are delivered within 3-5 business days, while international orders may take 7-14 business days.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for most items. If you\'re not satisfied with your purchase, you can return it for a full refund or exchange within 30 days of delivery.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to many countries worldwide. You can see if we ship to your country during the checkout process.'
  }
])

const submitForm = () => {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form.value)
  // Reset form after submission
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  // You might want to show a success message to the user here
  alert('Thank you for your message. We\'ll get back to you soon!')
}
</script>