<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="space-y-8">
          <!-- Header -->
          <div class="flex items-center justify-between">
            <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">My Profile</h1>
            <button 
              @click="showAddAddressModal = true"
              :disabled="addresses.length >= 4"
              class="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <PlusIcon class="h-5 w-5 mr-2" />
              Add New Address
            </button>
          </div>

  
          <!-- Addresses Grid -->
          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-gray-900">My Addresses</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                v-for="address in addresses" 
                :key="address.id" 
                class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md"
                :class="{ 'ring-2 ring-indigo-500': address.status }"
              >
                <div class="flex justify-between items-start mb-4">
                  <div class="flex items-center space-x-2">
                    <h3 class="text-lg font-semibold text-gray-900">{{ address.fullname }}</h3>
                    <span 
                      v-if="address.status" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      Default
                    </span>
                  </div>
                  <button 
                    @click="editAddress(address)"
                    class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <PencilIcon class="h-5 w-5" />
                  </button>
                </div>
                <div class="space-y-2 text-sm text-gray-600">
                  <div class="flex items-center">
                    <PhoneIcon class="h-4 w-4 mr-2" />
                    {{ address.phone }}
                  </div>
                  <div class="flex items-center">
                    <MailIcon class="h-4 w-4 mr-2" />
                    {{ address.email }}
                  </div>
                  <div class="flex items-center">
                    <MapPinIcon class="h-4 w-4 mr-2" />
                    {{ address.bonus_info }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Add/Edit Address Modal -->
      <TransitionRoot appear :show="showAddAddressModal || showEditModal" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>
  
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to="opacity-100 translate-y-0 sm:scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 translate-y-0 sm:scale-100"
                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel class="relative transform overflow-hidden rounded-2xl bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <DialogTitle as="h3" class="text-xl font-semibold leading-6 text-gray-900 mb-5">
                      {{ showEditModal ? 'Edit Address' : 'Add New Address' }}
                    </DialogTitle>
                    <form @submit.prevent="showEditModal ? updateAddress() : addNewAddress()">
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Full Name</label>
                          <input 
                            v-model="currentAddress.fullname"
                            type="text"
                            required
                            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                        
                        <!-- Add Province Selection -->
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Province</label>
                          <select
                            v-model="currentAddress.province_id"
                            required
                            @change="handleProvinceChange"
                            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="">Select Province</option>
                            <option 
                              v-for="province in provinces" 
                              :key="province.province_id"
                              :value="province.province_id"
                            >
                              {{ province.name }}
                            </option>
                          </select>
                        </div>
  
                        <!-- Add District Selection -->
                        <div>
                          <label class="block text-sm font-medium text-gray-700">District</label>
                          <select
                            v-model="currentAddress.district_id"
                            required
                            :disabled="!currentAddress.province_id"
                            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">Select District</option>
                            <option 
                              v-for="district in filteredDistricts" 
                              :key="district.district_id"
                              :value="district.district_id"
                            >
                              {{ district.name }}
                            </option>
                          </select>
                        </div>
  
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Phone</label>
                          <input 
                            v-model="currentAddress.phone"
                            type="tel"
                            required
                            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Email</label>
                          <input 
                            v-model="currentAddress.email"
                            type="email"
                            required
                            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Additional Information</label>
                          <textarea 
                            v-model="currentAddress.bonus_info"
                            rows="3"
                            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          ></textarea>
                        </div>
                      </div>
                      <div class="mt-6 flex justify-end space-x-3">
                        <button 
                          type="button"
                          @click="closeModal"
                          class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {{ showEditModal ? 'Update' : 'Add' }}
                        </button>
                      </div>
                    </form>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <!-- Toast Notification -->
      <TransitionRoot appear :show="!!toast" as="template">
        <div class="fixed bottom-4 right-4 z-50">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 translate-y-2"
            enter-to="opacity-100 translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-2"
          >
            <div 
              v-if="toast"
              class="bg-white rounded-lg shadow-lg p-4 max-w-md border-l-4"
              :class="toast.type === 'error' ? 'border-red-500' : 'border-green-500'"
            >
              <p class="text-sm text-gray-700">{{ toast.message }}</p>
            </div>
          </TransitionChild>
        </div>
      </TransitionRoot>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
  import { 
    PlusIcon, 
    UserIcon, 
    MailIcon, 
    PhoneIcon, 
    MapPinIcon,
    PencilIcon 
  } from 'lucide-vue-next'
  
  const addresses = ref([])
  const showAddAddressModal = ref(false)
  const showEditModal = ref(false)
  const userInfo = ref(null)
  const toast = ref(null)
  const provinces = ref([])
  const districts = ref([])
  
  const currentAddress = ref({
    fullname: '',
    phone: '',
    email: '',
    bonus_info: '',
    status: false,
    province_id: '',
    district_id: ''
  })
  
  const resetCurrentAddress = () => {
    currentAddress.value = {
      fullname: '',
      phone: '',
      email: '',
      bonus_info: '',
      status: false,
      province_id: '',
      district_id: ''
    }
  }
  
  const showToast = (message, type = 'success') => {
    toast.value = { message, type }
    setTimeout(() => {
      toast.value = null
    }, 3000)
  }
  
  const closeModal = () => {
    showAddAddressModal.value = false
    showEditModal.value = false
    resetCurrentAddress()
  }
  
  const filteredDistricts = computed(() => {
    if (!currentAddress.value.province_id) return []
    return districts.value.filter(
      district => district.province_id === currentAddress.value.province_id
    )
  })
  
  onMounted(async () => {
    const userInfoStr = localStorage.getItem('userInfo')
    if (userInfoStr) {
      userInfo.value = JSON.parse(userInfoStr)
      await Promise.all([
        fetchAddresses(),
        fetchProvinces(),
        fetchDistricts()
      ])
    }
  })
  
  async function fetchAddresses() {
    try {
      const response = await fetch(`https://localhost:7105/api/Address/get-address?id=${userInfo.value.userId}`)
      const data = await response.json()
      if (data.address?.$values) {
        addresses.value = data.address.$values
      }
    } catch (error) {
      showToast('Error fetching addresses', 'error')
    }
  }
  
  async function fetchProvinces() {
    try {
      const response = await fetch('https://localhost:7105/api/Province')
      const data = await response.json()
      if (data.$values) {
        provinces.value = data.$values
      }
    } catch (error) {
      showToast('Error fetching provinces', 'error')
    }
  }
  
  async function fetchDistricts() {
    try {
      const response = await fetch('https://localhost:7105/api/District')
      const data = await response.json()
      if (data.$values) {
        districts.value = data.$values
      }
    } catch (error) {
      showToast('Error fetching districts', 'error')
    }
  }
  
  async function editAddress(address) {
    currentAddress.value = { 
      ...address,
      province_id: address.province_id || '',
      district_id: address.district_id || ''
    }
    showEditModal.value = true
  }
  
  function handleProvinceChange() {
    currentAddress.value.district_id = '' 
  }
  
  async function updateAddress() {
    try {
      const response = await fetch('https://localhost:7105/api/Address/updated-address-default', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          iD_User: userInfo.value.userId,
          bonus_info: currentAddress.value.bonus_info,
          fullname: currentAddress.value.fullname,
          phone: currentAddress.value.phone,
          email: currentAddress.value.email,
          province_id: currentAddress.value.province_id,
          district_id: currentAddress.value.district_id
        })
      })
      
      if (response.ok) {
        await fetchAddresses()
        showToast('Address updated successfully')
        closeModal()
      } else {
        const data = await response.json()
        showToast(data.message || 'Error updating address', 'error')
      }
    } catch (error) {
      showToast('Error updating address', 'error')
    }
  }
  
  async function addNewAddress() {
    if (addresses.value.length >= 4) {
      showToast('Maximum number of addresses (4) reached', 'error')
      return
    }
  
    try {
      const response = await fetch('https://localhost:7105/api/Address/add-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...currentAddress.value,
          iD_User: userInfo.value.userId
        })
      })
      
      const data = await response.json()
      if (response.ok) {
        await fetchAddresses()
        showToast('Address added successfully')
        closeModal()
      } else {
        showToast(data.message || 'Error adding address', 'error')
      }
    } catch (error) {
      showToast('Error adding address', 'error')
    }
  }
  </script>